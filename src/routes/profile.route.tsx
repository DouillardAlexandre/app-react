/**
  * PROFIL PAGE
  * 
**/

import { useCallback, useEffect, useState } from "react";
import { AccountState } from "../classes/account.class"
import { NavigateFunction, useNavigate, useParams } from "react-router-dom";
import { Session } from "../classes/_session.class";
import { accountFetchOne } from "../api/account.api";
import { accountActivate, accountStatus } from "../redux/account.slice";
import Wrapper from "../components/wrapper";
import Plate from "../components/plate";
import { formatDate } from "../utils/format-date.utils";
import Tabs from "../components/tabs";
import PackTemplatesWidget from '../widgets/pack-templates.widget';
import PackPurchaseModal from "../modals/pack-purchase.modal";
import { useAppDispatch, useAppSelector } from '../redux/_hooks';
import { RootState } from '../redux/_store';
import { Dispatch } from "@reduxjs/toolkit";

/*const options = {
  timeZone: "Europe/Paris",
  hour12: false,
}*/

const MODAL_PACK_DETAILS: string = "MODAL_PACK_DETAILS"

function ProfileRoute(){

  const dispatch: Dispatch = useAppDispatch()
  const _storeSession: Session = useAppSelector((state: RootState) => state._session)
  const storeAccount: AccountState = useAppSelector((state: RootState) => state.account)

  const navigate: NavigateFunction = useNavigate()


  const { alias } = useParams()

  const [currentModal, setCurrentModal] = useState<string | null>(null)
  const [currentTab, setCurrentTab] = useState<string>("BIO")

  const loadAccount = useCallback(async() => {

    dispatch(accountStatus("STATUS_LOADING"))
    if(!alias){
      navigate("/error?code=400")
    }
    else{
      if(alias === "me" || alias === _storeSession.Account.id || alias === _storeSession.Account.alias ){
        if(_storeSession.Account.id.length > 0){
          dispatch(accountActivate(_storeSession.Account))
          dispatch(accountStatus("STATUS_LOADED"))
        }
        else{
          navigate("/error?code=404")
        }
      }
      else{
        const response: any = await dispatch(accountFetchOne(alias))
        if(response.account){
          dispatch(accountActivate(response.account))
          dispatch(accountStatus("STATUS_LOADED"))
        }
        else{
          dispatch(accountActivate({}))
          navigate("/error?code=404")
        }
      }
    }
  }, [])

  useEffect(() => {
    loadAccount()
  }, [loadAccount])

  function getTab(){
    switch(currentTab){
      case "BIO":
        return <div>{"BIO"}</div>

      case "COLLECTIONS":
        return <div>{"COLLECTIONS"}</div>

      case "SHOP":
        return (
          <div>
            { currentModal === MODAL_PACK_DETAILS &&
              <PackPurchaseModal
                accountId={storeAccount.active.id}
                onClose={()=>setCurrentModal(null)}
              />
            }
            <PackTemplatesWidget accountId={storeAccount.active.id} onClick={() => setCurrentModal(MODAL_PACK_DETAILS)} />
          </div>
        )

      case "SHOWCASE":
        return <div>{"SHOWCASE"}</div>

      default:
        return <div>{"not_found"}</div>
    }
  }


  return(

    <Wrapper pageTitle="Profile page">

      <Plate>

        <div className="flex padding20 profile-header">
          <div>
            <div className="flex flex-dcol profile-picture">
              <div className="flex1"/>
              picture here
              <div className="flex1"/>
            </div>
          </div>

          <div className="width20" />

          <div className="flex1 flex flex-dcol">
            <div className="flex1" />
            <div>
              <div>@<u>{storeAccount.active.alias+""}</u></div>
              <div>{"inscrit le " + formatDate(storeAccount.active.dateCreate)}</div>
            </div>
            <div className="flex1" />
          </div>

          <div className="flex">
            <div style={{
              borderRadius: 10,
              border: "1px solid black",
              height: 20,
              width: 20
            }}/>
          </div>
        </div>

        <div className="padding20">
          <Tabs
            tabs={[ "BIO", "COLLECTIONS", "SHOP", "SHOWCASE" ]}
            currentTab={currentTab}
            onClick={(tab:string)=>{setCurrentTab(tab)}}
          />

          {getTab()}
          
          <div style={{height:400}} />
        </div>


      </Plate>

    </Wrapper>
  )
  
}

export default ProfileRoute


