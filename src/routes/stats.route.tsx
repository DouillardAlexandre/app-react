/**
  * STATS PAGE
  * 
**/

import { useEffect, useState } from "react";
import { connect } from "react-redux";
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Session } from "../classes/_session.class";
import { accountStatus } from "../redux/account.slice";
import Wrapper from "../components/wrapper";
import Plate from "../components/plate";
import { cardTemplateFetchSuper } from "../api/card-template.api";
import { cardTemplateGet } from "../redux/card-template.slice";
import { CardTemplate, CardTemplateState } from "../classes/card-template.class";
import { orderBy } from "lodash";
import { getProbability } from "../utils/probability.utils";
import { packTemplateFetchSuper } from "../api/pack-template.api";
import { packTemplateActivate } from "../redux/pack-template.slice";
import { PackTemplateState } from "../classes/pack-template.class";
import { useAppDispatch, useAppSelector } from "../redux/_hooks";
import { RootState } from "../redux/_store";
import { Dispatch } from "@reduxjs/toolkit";


function StatsRoute(){

  const dispatch: Dispatch = useAppDispatch()
  const _storeSession: Session = useAppSelector((state: RootState) => state._session)
  const storeCardTemplate: CardTemplateState = useAppSelector((state: RootState) => state.cardTemplate)
  const storePackTemplate: PackTemplateState = useAppSelector((state: RootState) => state.packTemplate)

  const navigate: NavigateFunction = useNavigate()

  const { packTemplateId } = useParams()

  const [isLoading, setLoading] = useState<boolean>(true)

  useEffect(()=>{
    loadAccount()
  }, [packTemplateId])

  async function loadAccount(){
    dispatch(accountStatus("STATUS_LOADING"))
    if(!packTemplateId || _storeSession.Account.adminLevel < 1){
      navigate("/error?code=401")
    }
    else{
      const packTemplate: any = await packTemplateFetchSuper(packTemplateId)
      const cardTemplates: any = await cardTemplateFetchSuper(packTemplateId)
      if(packTemplate.error || cardTemplates.error){
        navigate("/error?code=404")
      }
      else{
        dispatch(cardTemplateGet(orderBy(cardTemplates, "collectionNumber").map((cardTemplate: any) => { return { ...cardTemplate, nbTotalDrafted: cardTemplate.Cards.nbTotalDrafted, nbTotalAcquired: cardTemplate.Cards.nbTotalAcquired } })))
        dispatch(packTemplateActivate(packTemplate))
        setLoading(false)
      }
    }
  }



  return(

    <Wrapper pageTitle="Stats page">

      <Plate>

      {isLoading ?
      <div>
        {"loading_please_wait"}
      </div>
      :
      <div className="padding10">

        <div>
          <div>{storePackTemplate.active.name}</div>
          <div>{storePackTemplate.active.name}</div>
        </div>



        { storeCardTemplate.list.length > 0 ?
        <div>
          <div>{storeCardTemplate.list.length + " cards"}</div>

          <div className="flex">
            <div style={{width: 100}}>{"id"}</div>
            <div style={{width: 50}}>{"collectionNumber"}</div>
            <div style={{width: 50}}>{"isSecret"}</div>
            <div style={{width: 50}}>{"quantityTotal"}</div>
            <div style={{width: 50}}>{"nbTotalDrafted"}</div>
            <div style={{width: 50}}>{"nbTotalAcquired"}</div>

            <div style={{width: 50}}>{"Base"}</div>
            <div style={{width: 50}}>{"Drafted"}</div>
            <div style={{width: 50}}>{"Real"}</div>
          </div>

          { storeCardTemplate.list.map((cardTemplate: CardTemplate)=>
          <div key={cardTemplate.id} className="flex">
            <div style={{width: 100}}>{cardTemplate.id.slice(0, 7)}</div>
            <div style={{width: 50}}>{cardTemplate.collectionNumber}</div>
            <div style={{width: 50}}>{cardTemplate.isSecret + ""}</div>
            <div style={{width: 50}}>{cardTemplate.quantityTotal}</div>
            <div style={{width: 50}}>{cardTemplate.nbTotalDrafted}</div>
            <div style={{width: 50}}>{cardTemplate.nbTotalAcquired}</div>

            <div style={{width: 50}}>{(1/getProbability(storeCardTemplate.list.map((x: CardTemplate)=>{return{ id : x.id, qtty : x.quantityTotal}}), 3, [{ id : cardTemplate.id, qtty : cardTemplate.quantityTotal }] )).toFixed(2)}</div>
            <div style={{width: 50}}>{(1/getProbability(storeCardTemplate.list.map((x: CardTemplate)=>{return{ id : x.id, qtty : x.quantityTotal - x.nbTotalDrafted}}), 3, [{ id : cardTemplate.id, qtty : cardTemplate.quantityTotal - cardTemplate.nbTotalDrafted }] )).toFixed(2)}</div>
            <div style={{width: 50}}>{(1/getProbability(storeCardTemplate.list.map((x: CardTemplate)=>{return{ id : x.id, qtty : x.quantityTotal - x.nbTotalAcquired}}), 3, [{ id : cardTemplate.id, qtty : cardTemplate.quantityTotal - cardTemplate.nbTotalAcquired }] )).toFixed(2)}</div>
          </div>
          )}

        </div>
        :
        <div>
          empty
        </div>
        }
      </div>
      }


      </Plate>

    </Wrapper>
  )
  
}

const mapStateToProps = (state:any) => ({
  _session: state._session,
  cardTemplate: state.cardTemplate,
  packTemplate: state.packTemplate
})

export default connect(mapStateToProps)(StatsRoute)