/**
  * PROFIL PAGE
  * 
**/

import React, { useState } from "react";
import { useEffect } from "react"
import { connect } from "react-redux";
import { Collection, CollectionState } from "@/classes/collection.class";
import { collectionFetch } from "@/api/collection.api";
import { collectionGet } from "@/redux/collection.slice";
import { useAppDispatch, useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';
import { Dispatch } from "@reduxjs/toolkit";

interface OwnProps {
  accountId : string | null
}

type Props = OwnProps

const options = {
  timeZone:"Europe/Paris",
  hour12 : false,
}

const QTTY_DISPLAY: number = 10



function CollectionsWidget(props:Props){

  const dispatch: Dispatch = useAppDispatch()
  const storeCollection: CollectionState = useAppSelector((state: RootState) => state.collection)

  const [ currentOffset, setCurrentOffset ] = useState<number>(0)
  const [ currentSearch, setCurrentSearch ] = useState<string>("")
  const [ isLoading, setLoading ] = useState<boolean>(true)

  useEffect(()=>{
    loadCollection(false)
  }, [currentOffset])

  async function loadCollection(override: boolean){
    const response : any = await collectionFetch(props.accountId!, currentSearch, QTTY_DISPLAY, currentOffset)

    if(!response.error){
      if(override){
        dispatch(collectionGet(response))
      }
      else{
        dispatch(collectionGet([...storeCollection.list, response]))
      }
    }
    setLoading(false)
  }

  return(
    <div>
      { storeCollection.list.map((x:Collection)=>
        <div>{x.name}</div>
      )}
    </div>
  )

}

const mapStateToProps = (state:any) => ({
  collection : state.collection
})

export default connect(mapStateToProps)(CollectionsWidget)