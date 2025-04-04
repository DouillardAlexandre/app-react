/** 
 * FOOTER
 * 
 */

type Props = {
  maxWidth: number
}

function Footer(props: Props) {

  return (
    <>
      <p style={{width: props.maxWidth}}>{`2025 - ${new Date().getFullYear()} Cards`}</p>
    </>
  )
}

export default Footer