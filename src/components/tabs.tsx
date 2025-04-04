/**
 * Tabs
 * 
 */

import { useState } from 'react';

interface OwnProps{
  tabs: string[]
  onClick? : Function
  currentTab? : string
}

function Tabs(props:OwnProps){

  const [currentTab, setCurrentTab] = useState<string>(props.currentTab?props.currentTab:props.tabs[0])

  function click(tab:string){
    setCurrentTab(tab)
    if(props.onClick){
      props.onClick(tab)
    }
  }

  return (
    <div className="flex flex-wrap tabs">
      {props.tabs.map((x:string, i:number)=>
      <div
        key={i}
        className={"flex1 tab " + (currentTab === x ? "tab-active" : "_hover") }
        onClick={()=>click(x)}
      >
        {x}
      </div>
      )}

    </div>
  )
}


export default Tabs