/**
  * TEST WIDGET
  * 
**/

import { useEffect } from "react";
import { RootState } from "@/redux/_store"
import { Account, AccountState } from "@/classes/account.class"
import { accountFetch } from "@/api/account.api";
import { useAppDispatch, useAppSelector } from "../redux/_hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { accountGet } from "@/redux/account.slice";
import Button from "@/components/button";

interface StateProps{
  mode: "JAVA" | "NODE"
}

type Props = StateProps

function TestWidget(props: Props){

  const dispatch: Dispatch = useAppDispatch()
  const storeAccount: AccountState = useAppSelector((state: RootState) => state.account)

  useEffect(() => {
    //const queryParams = new URLSearchParams(window.location.search)
    //const collectionId:string = queryParams.get('c')!
    //setCollection(collectionId)
    dispatch(accountGet([]))
  }, [])

  async function getAccount(){
    const response: any = await dispatch(accountFetch(props.mode))
    if(response.accounts.length > 0){
      dispatch(accountGet(response.accounts))
    }
  }
  
  return(
    <>

      <div>{props.mode}</div>

      <Button backgroundColor={"#74fda2"} onClick={getAccount} title={"load accounts"} />

      {storeAccount.list.length > 0 ?
      <>
        {storeAccount.list.map((account: Account)=>
          <div key={account.id}>{account.name}</div>
        )}
      </>
      :
      <>{"no accounts"}</>
      }

    </>  
  )
  
}

export default TestWidget