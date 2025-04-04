/** 
 * WRAPPER
 * contains header, nav-bar and footer
 * used for route pages
 * 
 */

import { useEffect, useState } from "react"
import Footer from "./footer"
import Scroller from "./scroller"
import Switch from "./switch"

interface OwnProps{
  children: any
  maxWidth?: number
  pageTitle?: string
}

type Props = OwnProps


function Wrapper(props: Props) {

  const maxWidth: number = props.maxWidth ? props.maxWidth : 1000

  const [preferredTheme, setPreferredTheme] = useState<"dark" | "light">("dark")
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {

    function handleResize(){
      setHeight(window.innerHeight);
    }
  
    window.addEventListener("resize", handleResize);
  }, [window.innerHeight])

  useEffect(() => {
    document.title = props.pageTitle ? props.pageTitle : "Cards"
  }, [props.pageTitle])

  return (
    <div className="_wrapper" data-theme={preferredTheme}>

      <Switch
        isActive={preferredTheme === "dark"}
        onChange={()=>setPreferredTheme(preferredTheme === "dark" ? "light" : "dark")} 
      />
      <Scroller maxHeight={height > 26 ? height - 26 : height}>

        <div style={{ width: maxWidth }}>
          { props.pageTitle &&
          <h1>{props.pageTitle}</h1>
          }

          {props.children}
        </div>

      </Scroller>

      <Footer maxWidth={maxWidth} />
    </div>
  )
}

export default Wrapper