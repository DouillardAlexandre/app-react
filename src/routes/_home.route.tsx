/**
 * HOME PAGE
 * 
**/

import { useEffect } from "react";
import { RootState } from "../redux/_store"
import { Account, AccountState } from "../classes/account.class"
import { NavigateFunction, useNavigate } from "react-router-dom";
import { accountFetch } from "../api/account.api";
import Button from "../components/button";
import Wrapper from "../components/wrapper";
import Plate from "../components/plate";
import { useAppDispatch, useAppSelector } from "../redux/_hooks";
import { Dispatch } from "@reduxjs/toolkit";
import { accountGet } from "../redux/account.slice";
//import CardPlaygroundWidget from "../widgets/card-playground.widget"
import CardPlayground2Widget from "../widgets/card-playground2.widget"

/*const options = {
  timeZone: "Europe/Paris",
  hour12: false,
}*/

function _HomeRoute(){

  const dispatch: Dispatch = useAppDispatch()
  const storeAccount: AccountState = useAppSelector((state: RootState) => state.account)

  //const { NODE_ENV, REACT_APP_BUILD_VERSION, REACT_APP_BUILD_DATE, REACT_APP_LAST_BUILD } = process.env;

  //const [collection, setCollection] = useState<string | null>(null)
  //const [draft, setDraft] = useState<any[]>([])


  const navigate: NavigateFunction = useNavigate()


  useEffect(() => {
    //const queryParams = new URLSearchParams(window.location.search)
    //const collectionId:string = queryParams.get('c')!
    //setCollection(collectionId)
    dispatch(accountGet([]))
  }, [])

  async function getAccount(){
    const response : any = await accountFetch("", 50, 0)
    if(response.accounts.length > 0){
      dispatch(accountGet(response.accounts))
    }
  }

  function clickToProfile(){
    navigate("/u/me")
  }


  return(

    <Wrapper pageTitle="Home page">

      <Plate withPadding>
        <a href={`${process.env.REACT_APP_URL}:${process.env.REACT_APP_PORT}`}>{ `url : ${process.env.REACT_APP_URL} ,\n\n port : ${process.env.REACT_APP_PORT }`}</a>

        {/** *
        <CardPlaygroundWidget />
        /** */}

        {/** */
        <CardPlayground2Widget />
        /** */}
        
        {/**CARDS DRAFT */}
        <div className="flex flex-wrap" >

          <Button color={"#74529f"} backgroundColor={"#74fda2"} onClick={clickToProfile} title={"Click to profile"} />

          <Button backgroundColor={"#74fda2"} onClick={getAccount} title={"load accounts"} />

          {storeAccount.list.length>0 &&
          <div>
            {storeAccount.list.map((account:Account)=>
              <div key={account.id}>{account.alias}</div>
            )}
          </div>
          }

        </div>
      </Plate>

    </Wrapper>
  )
  
}

export default _HomeRoute


