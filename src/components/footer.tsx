/** 
 * FOOTER
 * 
 */

import React from "react"

type Props = {
  maxWidth: number
}

function Footer(props: Props) {

  return (
    <div className="flex footer">
      <div className="flex1" />
      <div className= "flex margin10" style={{width: props.maxWidth}}>
        <div className="flex-dcol">
          <div className="flex1" />
          <p>{`2022 - ${new Date().getFullYear()} Cards`}</p>
          <div className="flex1" />
        </div>
      </div>
      <div className="flex1" />
    </div>
  )
}

export default Footer