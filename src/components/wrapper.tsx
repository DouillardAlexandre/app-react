/** 
 * WRAPPER
 * contains header, nav-bar and footer
 * used for route pages
 * 
 */

import { useEffect, useState } from "react"
import Cookies from 'universal-cookie';
import Footer from "./footer"
import NavBar from "./nav-bar"
import Scroller from "./scroller"
import Switch from "./switch"
import { themeColor } from "@/classes/_session.class";

 
interface OwnProps{
  children: any
  maxWidth?: number
  pageTitle?: string
}

type Props = OwnProps

const cookies: Cookies = new Cookies()

const NAVBAR_HEIGHT: number = 50

function Wrapper(props: Props) {

  const maxWidth: number = props.maxWidth ? props.maxWidth : 1000

  const [preferredTheme, setPreferredTheme] = useState<themeColor>(cookies.get('preferredTheme') === "dark" ? "dark" : "light")
  const [height, setHeight] = useState<number>(window.innerHeight)

  useEffect(() => {
    cookies.set('preferredTheme', preferredTheme, { path: '/' });
  }, [preferredTheme])

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
      <NavBar/>

      <div style={{top:-(NAVBAR_HEIGHT + 26)}} >
        <div className="flex">
          <Switch
            isActive={preferredTheme === "dark"}
            onChange={()=>setPreferredTheme(preferredTheme === "dark" ? "light" : "dark")} 
          />
          <div>
            dark theme
          </div>
        </div>
      </div>

      <Scroller maxHeight={height > (NAVBAR_HEIGHT + 26) ? height - (NAVBAR_HEIGHT + 26) : height}>

        <div className="flex margin10">
          <div className="flex1" />

          <div style={{ width: maxWidth }}>
            { props.pageTitle &&
            <h1>{props.pageTitle}</h1>
            }

            {props.children}
          </div>

          <div className="flex1" />
        </div>

        <div className="height20" />

        <Footer maxWidth={maxWidth} />

      </Scroller>
    </div>
  )
}

export default Wrapper