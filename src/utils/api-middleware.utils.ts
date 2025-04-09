/**
 * API-MIDDLEWARE.UTILS
 * Behavior to apply for every API call
 * Format { error } message by triggering a response 
 */

//import { toast } from 'react-toastify';
import axios, { AxiosInstance } from 'axios'

const instanceJava: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL + ":" + process.env.REACT_APP_PORT_JAVA,
  timeout: 6000,
  headers: {
    "Accept": "application/json",
    "Content-Type" : "application/json"
  }
})

const instanceNode: AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_URL + ":" + process.env.REACT_APP_PORT_NODE,
  timeout: 6000,
  headers: {
    "Accept": "application/json",
    "Content-Type" : "application/json"
  }
})

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

const apiMiddleware: Function = () => (next: Function) => (action: any) => {

  return new Promise(function(resolve) {
    next(action)

    if (action.type !== "JAVA" && action.type !== "NODE") return;

    const { method, data, url } = action.payload
  
    const dataOrParams: string = ["GET", "DELETE"].includes(method) ? "params" : "data";

    const instance: AxiosInstance = action.type === "JAVA" ? instanceJava : instanceNode

    instance.request({
      method,
      url,
      [dataOrParams]: data
    }).then(({ data }) => {
      if (data.error){
        //toast("Api middleware error " + data.error, { type : 'error' });
      }
      resolve(data); 
    }).catch((error: any) => { 
      if (error.response){

        const code: string = processError(error.response)

        //toast("Api middleware error " + code, error.response.data.details, { type : 'error' });
        resolve({ error: code })

      }
      else{
        //toast("Api middleware error network", { type : 'error' });
        resolve({ error: 'network', details: error });
      }
    })

  });

};

export default apiMiddleware;