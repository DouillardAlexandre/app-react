/** 
 * PLATE like a CARD, but name was already taken :)
 * 
 */

interface OwnProps{
  children? : any
  withMargin? : number
  withPadding? : boolean
}

function Plate(props:OwnProps) {
  return (
    <div className={ "plate" + (props.withMargin ? " margin10" : "") + (props.withPadding ? " padding20" : "") }>
      {props.children}
    </div>
  )
}

export default Plate