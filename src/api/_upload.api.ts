/** UPLOAD.ACTIONS
 * Upload file to space
 */


export const uploadCancel: any = (uploadId: string, path: string, fileName: string) => ({
  type : "METAUPLOAD",
  payload : {
    method : "POST",
    url : "/upload/achieve",
    data : {
      uploadId,
      path,
      fileName
    }
  }
})

//file : file to upload
//path:  where to save media ex. User/projects
export const upload: any = (path: string, fileName: string, file: File) => ({
  type : "UPLOAD",
  payload : {
    //method : "POST",
    //url : "/upload/part",
    data : {
      path,
      fileName,
      file,
    }
  }
})
