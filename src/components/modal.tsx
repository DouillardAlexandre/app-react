/** 
 * MODAL
 * Dialog
 */

import React, { useEffect } from "react"
import Button from "./button"

interface OwnProps{
  children? : any
  disableKeyEvents? : boolean
  disableClickOutside? : boolean
  isCloseButtonVisible? : boolean
  isLarge? : boolean
  onClose? : Function
  onDelete? : Function
  onConfirm? : Function
  status? : string
  title? : string
}

type Props = OwnProps

function Modal(props: Props) {

  useEffect(() => {
    if(!props.disableKeyEvents){
      const onKeyDown = (e: any) => {
        if (e.key === 'Enter'){
          confirm()
        }
        else if (e.key === 'Escape'){
          close()
        }
      }

      window.addEventListener('keydown', onKeyDown);
      return () => {
        window.removeEventListener('keydown', onKeyDown);
      }
    }

  }, [])

  //Close dialog
  function close(){
    if (props.onClose){
      props.onClose()
    }
  }

  //Clic outside trigger close
  function clickOutside(){
    if (!props.disableClickOutside){
      close()
    }
  }

  //Click on delete
  function deleteItem(){
    if (props.onDelete){
      props.onDelete()
    }
  }
  
  //Function confirm
  function confirm(){
    if (props.onConfirm){
      props.onConfirm()
    }
  }

  return (
    <div className="modal-container flex" 
      onClick={() => clickOutside()}>

      <div className="modal round-border flex1"
        onClick={e => { e.stopPropagation() }}
        style={{
          maxWidth : props.isLarge ? '748px' : ''
        }}>

        { props.title &&
        <h1>{ props.title }</h1>
        }

        { props.children }

        { props.isCloseButtonVisible &&
        <div className="height-20"/>
        }

        <div className="flex">

          { props.onDelete &&
          <Button 
            onClick={deleteItem}
            title={"utils_delete"}
          />
          }

          <div className="flex1" />

          { props.isCloseButtonVisible &&
          <Button
            onClick={close}
            title={"utils_close"} />
          }

          { props.onConfirm &&
          <Button
            //isLoading={props.status === STATUS_SAVING}
            onClick={confirm}
            title={"utils_confirm"}/>
          }

        </div>

      </div>

    </div>
  )
}

export default Modal