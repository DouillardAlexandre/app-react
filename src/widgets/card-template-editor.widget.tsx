/**
 * CARD-TEMPLATE-EDITOR.WIDGET
 * 
 */

import { CardTemplateState } from '@/classes/card-template.class';
import { cardTemplateUpdate } from '@/api/card-template.api';
import { cardTemplateEdit } from '@/redux/card-template.slice';
import { useAppDispatch, useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';
import { Dispatch } from '@reduxjs/toolkit';

interface OwnProps{
  onNext: Function
}

type Props = OwnProps

function CardTemplateEditorWidget(props: Props){

  const dispatch: Dispatch = useAppDispatch()
  const storeCardTemplate: CardTemplateState = useAppSelector((state: RootState) => state.cardTemplate)

  //const [ cardTemplateBackup ] = useState<CardTemplate>(storeCardTemplate.active)

  function cancel(){
    //dispatch(cardTemplateReplace(cardTemplateBackup))
    props.onNext()
  }

  function confirm(){
    dispatch(cardTemplateUpdate(storeCardTemplate.active))
    props.onNext()
  }

  return (
    <div>

      <div>
        {storeCardTemplate.active.thumbnail}
        picture
      </div>

      <input
        type="text"
        value={storeCardTemplate.active.name}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "name", value: event.target.value}))}
      />

      <input
        type="text"
        value={storeCardTemplate.active.description}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "description", value: event.target.value}))}
      />

      <input
        type="number"
        value={storeCardTemplate.active.quantityTotal}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "quantityTotal", value: event.target.value}))}
      />

      <input
        type="checkbox"
        checked={storeCardTemplate.active.isSecret}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "isSecret", value: event.target.value}))}
      />

      {/*** advanced settings ***/}

      <input
        type="checkbox"
        checked={storeCardTemplate.active.isSellable}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "isSellable", value: event.target.value}))}
      />

      <input
        type="checkbox"
        checked={storeCardTemplate.active.isExchangeable}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "isExchangeable", value: event.target.value}))}
      />

      <input
        type="number"
        value={storeCardTemplate.active.feePercentage}
        onBlur={(event: any) => dispatch(cardTemplateEdit({id: storeCardTemplate.active.id, key: "feePercentage", value: event.target.value}))}
      />

      <button onClick={cancel}>Cancel</button>
      <button onClick={confirm}>Confirm</button>

    </div>

  )
}

export default CardTemplateEditorWidget