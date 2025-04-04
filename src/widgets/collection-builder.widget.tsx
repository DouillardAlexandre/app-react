/**
 * COLLECTION-BUILDER.WIDGET
 * 
 */

import React, { useEffect, useState } from 'react';
import { _authRegister, _authSignin } from "@/api/_auth.api";
import { collectionCreate } from "@/api/collection.api";
import Button from '@/components/button';
import { Collection, CollectionState } from '@/classes/collection.class';
import { connect } from 'react-redux';
import { collectionActivate, collectionEdit } from '@/redux/collection.slice';
import { v4 as uuid } from 'uuid';
import { Session } from '@/classes/_session.class';
import { useAppDispatch, useAppSelector } from '@/redux/_hooks';
import { RootState } from '@/redux/_store';
import { Dispatch } from '@reduxjs/toolkit';
import CardPlaygroundWidget from './card-playground.widget';

interface OwnProps {
  onNext? : Function
} 

type Props = OwnProps

function CollectionBuilderWidget(props: Props){

  const dispatch: Dispatch = useAppDispatch()
  const _storeSession: Session = useAppSelector((state: RootState) => state._session)
  const storeCollection: CollectionState = useAppSelector((state: RootState) => state.account)

  useEffect(() => {
    dispatch(collectionActivate(new Collection()))
  }, [])


  async function save(){

    const collectionId: string = uuid()
    //uuid
    dispatch(collectionEdit({id: storeCollection.active.id, key: "id", value: collectionId}))

    //const response: any = await store.dispatch(collectionUpdate(props.collection.active))
    const response: any = await collectionCreate(storeCollection.active)
    
    if(!response.error){
      console.log("ok")
      if(props.onNext){
        props.onNext()
      }
    }


  }

  return (
    <div>

      <div>

        <h2>header</h2>

        <div>
          {storeCollection.active.picture}
          picture
        </div>

        <input
          type="text"
          value={storeCollection.active.name}
          onChange={(event:any) => dispatch(collectionEdit({id: storeCollection.active.id, key: "name", value: event.target.value}))}
        />

        <input
          type="text"
          value={storeCollection.active.description}
          onChange={(event:any) => dispatch(collectionEdit({id: storeCollection.active.id, key: "description", value: event.target.value}))}
        /> 

        <Button
          onClick={save}
          title={"Save"}
        />
      
      </div>

      <CardPlaygroundWidget />

    </div>

  )
}

const mapStateToProps = (state:any) => ({
  _session : state._session,
  collection : state.collection
})

export default connect(mapStateToProps)(CollectionBuilderWidget)
