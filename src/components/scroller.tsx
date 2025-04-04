/***
 * SCROLLER
 * display shadows if child element is scrollable
 */

import { SyntheticEvent, useEffect, useRef, useState } from "react"


type OwnProps = {
  children: any
  maxHeight?: number
}

type Props = OwnProps

function Scroller(props: Props){

  const [y, setY] = useState<number>(0)               //scroll position onLoad scroll on top -> 0
  const [height, setHeight] = useState<number>(0)     //scrollable component size ; if size < props.maxHeight, scroll doesn't appear
  const elementRef = useRef<any>(null)                //ref on scrollable div

  useEffect(() => {
    setHeight(elementRef.current.clientHeight)
  }, [elementRef.current ? elementRef.current.clientHeight : undefined])


  function scrollEvent(e: SyntheticEvent) {
    const target = e.target as HTMLTextAreaElement;
    setY(target.scrollTop)
  }

  return(

    <div onScroll={scrollEvent} className="scroller" style={{height: props.maxHeight}}>
      <div ref={elementRef}>
        <div className={ y > 10 ? "scroller-shadow scroller-shadow-top" : "_none" } />
        
        <div>
          {props.children}
        </div>

        <div className={( props.maxHeight && y + props.maxHeight + 10 < height ) ? "scroller-shadow scroller-shadow-bottom" : "_none" }/>
      </div>
    </div>
  )
}

export default Scroller