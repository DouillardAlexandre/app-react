/** 
 * SWITCH
 */

interface OwnProps{
  text? : string
  isActive : boolean
  onChange : Function
}

type Props = OwnProps

function Switch(props: Props) {

  return (
    <div className="switch clickable"
      onClick={()=>props.onChange()}
    >

      <div className={"flex switch-circle" + (props.isActive ? " switch-active" : "")}>
        { props.isActive ?
          //☾ ☉
          <div>🌙</div>
        :
          <div>☀️</div>
        }
      </div>

    </div>
  )
}


export default Switch