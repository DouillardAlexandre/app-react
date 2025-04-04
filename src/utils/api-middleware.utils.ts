/**
 * API-MIDDLEWARE.UTILS
 * Behavior to apply for every API call
 * Format { error } message by triggering a response 
 */

//import { toast } from 'react-toastify';
//import i18n from '../translate/i18n';
import { instanceBackend, instanceUpload } from "@/App";

const CHUNK_SIZE: number = 5 * 1024 * 1024 //5MB chunks

function processError(errorResponse: any){
  let code: any = ""

  switch(errorResponse.status){
    case 401:
      code = 'user unauthorized'
    break
    case 403:
      code = 'auth expired'
    break
    case 404:
      code = 'page not found'
    break
    case 500:
      code = 'server error'
    break
    default:
      code = errorResponse.data.error
    break

  }

  return code
}

const apiMiddleware = () => (next: Function) => (action: any) => {

  return new Promise(function(resolve) {
    next(action)

    if (action.type !== "API" && action.type !== "UPLOAD") return;

    const { method, data, url } = action.payload
  
    const dataOrParams: string = ["GET", "DELETE"].includes(method) ? "params" : "data";

    switch(action.type){
      case "API":
        instanceBackend.request({
          method,
          url,
          [dataOrParams]: data
        }).then(({ data }) => {
          if (data.error){
            //toast(i18n.t("Api middleware error " + data.error ), { type : 'error' });
          }
          resolve(data); 
        }).catch(error => { 
          if (error.response){


            const code: string = processError(error.response)

            //toast(i18n.t("Api middleware error " + code, error.response.data.details), { type : 'error' });
            resolve({ error : code })

          }
          else{
            //toast(i18n.t("Api middleware error network"), { type : 'error' });
            resolve({ error : 'network', details : error });
          }
        })

      break

      case "UPLOAD": {

        const { path, fileName, file } = data
        const nbChunks: number = Math.ceil(file.size / CHUNK_SIZE);
        const uploadedParts: any[] = []
        let uploadId: string = ""

        instanceUpload.request({
          method: "POST",
          url: "/upload/init",
          data : {
            path,
            fileName
          }
        }).then((initResponse: any) => {

          uploadId = initResponse.data.uploadId
          const chunkUploadPromises: Promise<any>[] = []

          for (let chunkIndex: number = 0; chunkIndex < nbChunks; chunkIndex++) {
            const start: number = chunkIndex * CHUNK_SIZE;
            const end: number = Math.min(start + CHUNK_SIZE, file.size);
            const chunk: Blob = file.slice(start, end);
            const partNumber: number = chunkIndex + 1;
      
            const formData: FormData = new FormData();

            formData.append("uploadId", uploadId)
            formData.append("path", path)
            formData.append("fileName", fileName)
            formData.append("partNumber", partNumber.toString())
            formData.append("file", chunk)
    
            const partPromise: any = instanceUpload.request({
              method: "POST",
              url: "/upload/part",
              headers: {
                "Content-Type" : "multipart/form-data"
              },
              data: formData
            }).then((partResponse: any) => {
              uploadedParts.push({ PartNumber: partNumber, ETag: partResponse.data.etag })
            })

            chunkUploadPromises.push(partPromise);
      
          }

          return Promise.all(chunkUploadPromises).then(() => uploadId);
        }).then((uploadId: any) => {
          return instanceUpload.request({
            method: "POST",
            url: "/upload/achieve",
            data : {
              uploadId,
              path,
              fileName,
              parts: uploadedParts
            }
          })
        }).then((achieveResponse: any) => {
          if(achieveResponse.data.key === fileName.slice(-8)){
            resolve(achieveResponse.data)
          }
          else{
            return instanceUpload.request({
              method: "POST",
              url: "/upload/abort",
              data : {
                uploadId,
                path,
                fileName
              }
            })
            .then(() => resolve({ error: "unknown_error" }))
          }
        })
        .catch((error: any) => resolve({ error }))


      }
      break
      default :
        resolve({ error: "wrong_action_type" }); 
        //toast(i18n.t("error_uncorrect_action_type"), { type : 'error' });
      break
    }

  });

};

export default apiMiddleware;