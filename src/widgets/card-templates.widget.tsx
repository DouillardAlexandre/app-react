import { useEffect } from 'react';
import { Session } from '@/classes/_session.class';
import { cardTemplateFetch, cardTemplateFetchPublic, cardTemplateFetchSelf } from '@/api/card-template.api';
import { cardTemplateActivate, cardTemplateGet, cardTemplateStatus } from '@/redux/card-template.slice';
import { CardTemplate, CardTemplateState } from '@/classes/card-template.class';
import { useAppDispatch, useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';
import { Dispatch } from '@reduxjs/toolkit';

interface OwnProps {
  accountId? : string
  collectionId? : string
  packTemplateId? : string
  selectedList? : string[]
  onClick? : Function 
}

type Props = OwnProps

function CardTemplatesWidget(props: Props){
  
  const dispatch: Dispatch = useAppDispatch()
  const _storeSession: Session = useAppSelector((state: RootState) => state._session)
  const storeCardTemplate: CardTemplateState = useAppSelector((state: RootState) => state.cardTemplate)

  useEffect(() => {

    async function loadCardTemplates(){
      dispatch(cardTemplateStatus("STATUS_LOADING"))
      const accountId: string | null = props.accountId ? props.accountId : null
      const collectionId: string | null = props.collectionId ? props.collectionId : null
      const packTemplateId: string | null = props.packTemplateId ? props.packTemplateId : null
      const response: any = await _storeSession.Account.id.length > 0 ? 
        (_storeSession.Account.id === accountId ?
          cardTemplateFetchSelf(collectionId, packTemplateId)
        : 
          cardTemplateFetch(accountId, collectionId, packTemplateId)
        )
      :
      cardTemplateFetchPublic(collectionId, packTemplateId)
      
      if(response.error){
        dispatch(cardTemplateStatus("STATUS_LOAD_ERROR"))
        dispatch(cardTemplateGet([]))
      }
      else{
        dispatch(cardTemplateGet(response.cardTemplates.map((x: any)=>{
          return{
            ...x,
            CollectionId : x.PackTemplate.CollectionId,
            AccountId: x.PackTemplate.AccountId,
            nbTotalDrafted: x.Cards.nbTotalDrafted,
            nbTotalAcquired: x.Cards.nbTotalAcquired!,
            nbUserDrafted: x.Cards.nbUserDrafted!
          }
        })))
        dispatch(cardTemplateStatus("STATUS_LOADED"))
      }
    }

    loadCardTemplates()

  }, [
    props.collectionId,
    props.packTemplateId,
  ])

  function click(cardTemplate: CardTemplate){
    dispatch(cardTemplateActivate(cardTemplate))

    if(props.onClick){
      props.onClick(cardTemplate)
    }
  }

  function isSelected(id: string){
    if(props.selectedList){
      return props.selectedList.indexOf(id) > -1
    }
    else{
      return false
    }
  }

  return(
    <div>
      { storeCardTemplate.status === "STATUS_LOADED" ?
      <div>
        { storeCardTemplate.list.length > 0 ?
        <div className="flex flex-wrap">
          { storeCardTemplate.list.map((x: CardTemplate) =>
          <div key={x.id} onClick={() => click(x)} className={ "margin10 card-display-mini" + (isSelected(x.id) ? " element-selected" : "") + (x.isSecret ? " element-inactive" : "") + (props.onClick ? " clickable" : "") }>
            <div>
            {//<img src="url" +
            //x.thumbnail
            }
            picture
            </div>

            <div>{"#" + x.collectionNumber}</div>

            <div>{(x.quantityTotal - x.nbTotalDrafted) + " / " + x.quantityTotal}</div>

            {x.nbUserDrafted &&
            <div>{"(you drafted : " + x.nbUserDrafted + ")"}</div>
            }

          </div>
          )}
        </div>
        :
        <div>
          {"no_cards"}
        </div>
        }
      </div>
      :
      <div>
        {"loading_please_wait"}
      </div>
      }
    </div>
  )

}

export default CardTemplatesWidget