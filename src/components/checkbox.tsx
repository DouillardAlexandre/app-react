/** 
 * CHECKBOX
 */

import { FaCheck } from "react-icons/fa"

interface OwnProps{
  active? : boolean //Is checkbox active
  onClick : Function | null //Function to trigger onclick
  text? : string //Text to display
}

function Checkbox(props:OwnProps) {

  //Trigger click on checkbox
  function click(event:any){
    event.stopPropagation()

    if (props.onClick){
      props.onClick(!props.active)
    }
  }

  function getClassName(){
    let className = "checkbox-container flex"

    if (!props.onClick){
      className += " checkbox-inactive"
    }

    return className
  }

  return (
    <div className={getClassName()}>

      <div className="flex">

        <div onClick={click} 
          className={props.active ? "clickable checkbox checkbox-active flex" : "checkbox"}>
          { props.active &&
          <FaCheck/>
          }
        </div>
        
        { props.text &&
        <div className="checkbox-label">
          {props.text}
        </div>
        }

      </div>

    </div>

  )
}

export default Checkbox