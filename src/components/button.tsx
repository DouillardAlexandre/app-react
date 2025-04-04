/** 
 * BUTTON
 * 
 */

interface OwnProps{
  icon?: string
  title?: string
  onClick: Function
  isLoading?: boolean
  color?: string
  inactive? : boolean
  backgroundColor?: string
}

type Props = OwnProps

function Button(props: Props) {

  function click(){
    if(!props.inactive && props.onClick){
      props.onClick()
    }
  }

  function getStyle(){
    const style: any = {}
    if(props.color){
      style.color = props.color
      style.border = "2px solid " + props.color
    }
    if(props.backgroundColor){
      style.backgroundColor = props.backgroundColor
    }

    return style
  }



  return (
    <div
      className={"button round-border margin5 padding5 flex flex1 " + (props.inactive ? "inactive" : "clickable")}
      style={getStyle()}
      onClick={click}
    >
      <div className="flex-auto">
        {props.icon &&
        <div>{props.icon}</div>
        }

        {props.title &&
        <div>{props.title}</div>
        }

        {props.isLoading &&
        <div>{props.isLoading}</div>
        }
      </div>
    </div>
  )
}

export default Button