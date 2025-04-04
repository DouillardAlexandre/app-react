/**
 * PACK-TEMPLATE-DISPLAYER
 *
 */

import { CardTemplate } from "@/classes/card-template.class"
import { cardGetMediaLink } from "@/api/card.api"
import { Dispatch } from "@reduxjs/toolkit"
import { useAppDispatch } from "@/redux/_hooks"

interface OwnProps {
  cardTemplate: CardTemplate
  isActive?: boolean
  isMini?: boolean
  onClick?: Function
  futureIndex?: number
}

type Props = OwnProps

function CardTemplateDisplayer(props: Props) {
  const dispatch: Dispatch = useAppDispatch()

  /*function click() {
    dispatch(cardTemplateActivate(props.cardTemplate))

    if (props.onClick) {
      props.onClick(props.cardTemplate)
    }
  }*/

  async function clickMedia() {
    const response: any = await dispatch(
      cardGetMediaLink(props.cardTemplate.id)
    )
    console.log(response)
  }

  return (
    <div
      //onClick={click}
      className={
        (props.isMini ? "card-display-mini small-font" : "card-display") + (props.isActive ? " element-selected" : "")
      }
      //style={{fontSize: 12}}
    >
      {props.cardTemplate.isError && <div>error</div>}

      {props.cardTemplate.isWarning && <div>warning</div>}

      {/*** required settings ***/}

      <div onClick={clickMedia}>
        {
          //<img src="url" +
          //props.cardTemplate.thumbnail
        }
        picture
      </div>

      {( props.futureIndex /*&& props.futureIndex !== props.cardTemplate.collectionNumber*/) ?
        <div style={{color: "blue"}}>{`#${props.cardTemplate.collectionNumber} -> #${props.futureIndex}`}</div>
      :
        <div>{"#" + props.cardTemplate.collectionNumber}</div>
      }

      <div>
        {props.cardTemplate.quantityTotal -
          props.cardTemplate.nbTotalDrafted +
          " / " +
          props.cardTemplate.quantityTotal}
      </div>

      {/*** recommended customization settings ***/}

      <div>{props.cardTemplate.name}</div>

      <div>{/*props.cardTemplate.description*/}</div>

      {/*** advanced settings ***/}

      <div>{props.cardTemplate.isSecret}</div>

      <div>{props.cardTemplate.isSellable}</div>

      <div>{props.cardTemplate.isExchangeable}</div>

      <div>{props.cardTemplate.feePercentage}</div>
    </div>
  )
}

export default CardTemplateDisplayer
