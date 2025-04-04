/**
 * File Drop
 * 
 */

import React, { useState } from 'react';
import { FileDrop } from 'react-file-drop';
import { v4 as uuid } from 'uuid';
import { upload } from '@/api/_upload.api';
import { Dispatch } from '@reduxjs/toolkit';
import { useAppDispatch } from '@/redux/_hooks';

const FILE_NUMBER_LIMIT: number = 100
const FILE_MAX_SIZE: number = 10000000000 //block files >10000Mo
//const FILE_UPLOAD_PATH: string = "medias"

interface OwnProps{
  onDrop? : Function
  onUpload? : Function
  path: string    //`${path}/${accountId}/${fileName}/chunk-${chunk}`
}

function FileDropper(props:OwnProps){
  const dispatch: Dispatch = useAppDispatch()

  const [files, setFiles] = useState<File[]>([])

  function dropFiles(droppedFiles:FileList | null){

    const newFiles: File[] = []

    if(!droppedFiles){
      console.log("error no files")
    }
    else if(droppedFiles.length > FILE_NUMBER_LIMIT - files.length){
      console.log("size limit blablabla")
    }
    else{

      for (const [key, droppedFile] of Object.entries(droppedFiles)) {
        if(droppedFile.size > FILE_MAX_SIZE){
          console.log(`error ! file ${key+1} excess max size ${FILE_MAX_SIZE} bytes`)
        }
        else if(files.map((file:any)=>file.name).indexOf(droppedFile.name)>-1){
          console.log("file already uploading")
        }
        else{
          newFiles.push(droppedFile)
          uploadFile(droppedFile)
          //uploadFile(FILE_UPLOAD_PATH, droppedFile.type, droppedFile)
          
        }
      }

      if(newFiles.length>0){
        setFiles(files.concat(newFiles))
        //uploadFiles(newFiles)
        console.log(newFiles.length + " new files dropped")
      }
    }
  }


  async function uploadFile(file: File){

    const fileName: string = uuid() + file.name.substring(file.name.lastIndexOf("."))

    const path: string = props.path  //`${path}/${accountId}/${fileName}/chunk-${chunk}`

    //const uploadId: string = await store.dispatch(uploadInit(path, fileName))

    const response: any = await dispatch(upload(path, fileName, file))

    if(response.key){
      console.log("ok" + response.key)
    }
    else{
      console.log(response)
    }
    
  }


  

  return (
    <div>
      <h1>React File Drop demo</h1>
      <div className="drop-zone round-border padding20">



        <FileDrop
          //onFrameDragEnter={(event) => console.log('onFrameDragEnter', event)}
          //onFrameDragLeave={(event) => console.log('onFrameDragLeave', event)}
          //onFrameDrop={(event) => console.log('onFrameDrop', event)}
          //onDragOver={(event) => console.log('onDragOver', event)}
          //onDragLeave={(event) => console.log('onDragLeave', event)}
          onDrop={(files/*, event*/) => dropFiles(files)}
        >
          Drop some files here!
        </FileDrop>
      </div>

      <form className="drop-zone round-border padding20">
        <input id="fileInput" name="file" type="file" accept={"*"} multiple onChange={(e: any) => dropFiles(e.target.files)} />
      </form>

      <div>
        {files.length>0?
        <div>
          {files.map((x: any, i: number)=>
            <div key={i}>
              <img src={x.name} alt={x.name} height="300" />
              {x.name.length > 50 ?
                x.name.slice(0, 40) + '[...]' + x.name.substring(x.name.lastIndexOf("."))
              :
                x.name
              }
            </div>
          )}
        </div>
        :
        <div>
          no file
        </div>

        }

      </div>
    </div>

  )
}

export default FileDropper