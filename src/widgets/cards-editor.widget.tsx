/**
 * CARDS-EDITOR.WIDGET
 * 
 */

import { useState } from 'react';
import { CardTemplate, CardTemplateState } from '@/classes/card-template.class';
import { cardTemplateAdd } from '@/redux/card-template.slice';
import CardTemplateWidget from '@/components/card-template-displayer';
import CardTemplateEditorWidget from './card-template-editor.widget';
import { CollectionState } from '@/classes/collection.class';
import Modal from '@/components/modal';
import { useAppDispatch, useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';
import { Dispatch } from '@reduxjs/toolkit';


const MODAL_EDIT_CARD_TEMPLATE: string = "MODAL_EDIT_CARD_TEMPLATE"

function CardsEditorWidget(){
  
  const dispatch: Dispatch = useAppDispatch()
  const storeCardTemplate: CardTemplateState = useAppSelector((state: RootState) => state.cardTemplate)
  const storeCollection: CollectionState = useAppSelector((state: RootState) => state.collection)

  const [ currentModal, setCurrentModal ] = useState<string | null>(null)

  //987/610

  function clickCardTemplate(cardTemplate: CardTemplate){
    //in the widget activate the card template ?
    //store.dispatch(cardTemplateActivate(cardTemplate))
    console.log(cardTemplate.id)
    setCurrentModal(MODAL_EDIT_CARD_TEMPLATE)
  }


  return (
    <div>
      { currentModal === MODAL_EDIT_CARD_TEMPLATE &&
      <Modal>
        <CardTemplateEditorWidget 
          onNext={()=>setCurrentModal(null)}
        />
      </Modal> 
      }

      {storeCardTemplate.list.length > 0 ?
      <div>
        {storeCardTemplate.list.map((cardTemplate: CardTemplate)=>
        <div key={cardTemplate.id}>
          <CardTemplateWidget 
            cardTemplate={cardTemplate}
            onClick={clickCardTemplate}
            isActive={cardTemplate.id === storeCardTemplate.active.id}
          />
        </div>
        )}

        <button onClick={() => dispatch(cardTemplateAdd(new CardTemplate({CollectionId : (storeCollection.active.id.length > 0 ? storeCollection.active.id : null) })))} >create a card</button>
      </div>
      :
      <div>
        no cards
        <button  onClick={() => dispatch(cardTemplateAdd(new CardTemplate({CollectionId : (storeCollection.active.id.length > 0 ? storeCollection.active.id : null) })))} >add card</button>
      </div>
      }

    </div>

  )
}

export default CardsEditorWidget