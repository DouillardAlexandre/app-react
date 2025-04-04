import { useEffect } from 'react';
import { connect } from 'react-redux';
import { Session } from '@/classes/_session.class';
import { PackTemplate, PackTemplateState } from '@/classes/pack-template.class';
import { packTemplateFetch, packTemplateFetchPublic, packTemplateFetchSelf } from '@/api/pack-template.api';
import { packTemplateActivate, packTemplateGet, packTemplateStatus } from '@/redux/pack-template.slice';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';
import { Dispatch } from '@reduxjs/toolkit';


interface OwnProps {
  accountId? : string
  collectionId? : string
  onClick? : Function 
}

type Props = OwnProps

function PackTemplatesWidget(props: Props){

  const dispatch: Dispatch = useAppDispatch()
  const _storeSession: Session = useAppSelector((state: RootState) => state._session)
  const storePackTemplate: PackTemplateState = useAppSelector((state: RootState) => state.packTemplate)

  const navigate: NavigateFunction = useNavigate()

  useEffect(()=>{

    async function loadPackTemplates(){
      dispatch(packTemplateStatus("STATUS_LOADING"))
      const accountId: string | null = props.accountId ? props.accountId : null
      const collectionId: string | null = props.collectionId ? props.collectionId : null
      const response: any = await _storeSession.Account.id.length > 0 ?
        (_storeSession.Account.id === accountId ?
          dispatch(packTemplateFetchSelf(collectionId))
        :
          dispatch(packTemplateFetch(accountId, collectionId))
        )
      :
      dispatch(packTemplateFetchPublic(collectionId))
      
      if(response.error){
        dispatch(packTemplateStatus("STATUS_LOAD_ERROR"))
        dispatch(packTemplateGet([]))
      }
      else{
        dispatch(packTemplateGet(response.packTemplates.map((x: any)=>{
          return {
            ...x,
            nbTotalDrafted: x.Packs.nbTotalDrafted,
            nbTotalAcquired: x.Packs.nbTotalAcquired!,
            nbUserDrafted: x.Packs.nbUserDrafted!,
            nbUserAcquired: x.Packs.nbUserAcquired!
          }
        })))
        dispatch(packTemplateStatus("STATUS_LOADED"))
      }
    }

    loadPackTemplates()

  }, [
    props.accountId,
    props.collectionId
  ])

  function click(packTemplate: PackTemplate){
    dispatch(packTemplateActivate(packTemplate))

    if(props.onClick){
      props.onClick(packTemplate)
    }
  }

  function isInactive(packTemplate: PackTemplate){
    const dateNow: number = Date.now()
    if(dateNow < packTemplate.dateRelease || (packTemplate.dateEnd && dateNow > packTemplate.dateEnd)){
      return true
    }
    else{
      return false
    }
  }

  return(
    <div>

      { storePackTemplate.status === "STATUS_LOADED" ?
      <div>
        { storePackTemplate.list.length > 0 ?
        <div className="flex flex-wrap">
          { storePackTemplate.list.map((x: PackTemplate)=>
          <div key={x.id} onClick={() => click(x)} className={ "margin10 pack-display-mini" + (isInactive(x) ? " element-inactive" : "") + (props.onClick ? " clickable" : "") }>
            <div>
            {//<img src="url" +
            //x.thumbnail
            }
            picture
            </div>

            <div>{x.name}</div>
            <div>{"Des : " + x.description}</div>
            <div>{"Price : " + x.basePrice}</div>
            
            <div>{"Nb" + x.nbToDraft}</div>

            {x.nbUserAcquired &&
            <div>{"buyed : " + x.nbUserAcquired + (x.nbUserDrafted && x.nbUserDrafted < x.nbUserAcquired ) ? " (not opened : " + (x.nbUserAcquired - x.nbUserDrafted) + ")" : ""}</div>
            }

            {_storeSession.Account.adminLevel > 0 &&
            <u onClick={(e: any) => {e.stopPropagation(); navigate(`/s/${x.id}`)}}>
              {"secret_stats"}
            </u>
            }

          </div>
          )}
        </div>
        :
        <div>
          {"no_packs"}
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

const mapStateToProps = (state:any) => ({
  _session : state._session,
  packTemplate : state.packTemplate
})

export default connect(mapStateToProps)(PackTemplatesWidget)