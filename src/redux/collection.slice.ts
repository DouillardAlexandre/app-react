import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { Collection, CollectionState } from '@/classes/collection.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: CollectionState = {
  active: new Collection(),
  list: [],
  status: "STATUS_LOADED"
}

export const collectionSlice: Slice = createSlice({
  name: "collection",
  initialState,
  reducers: {

    collectionActivate(state: RootState, action: PayloadAction<Partial<Collection>>) {
      state.active = action.payload
    },
    
    collectionAdd(state: RootState, action: PayloadAction<Partial<Collection>>){
      const newCollection: Collection = new Collection(action.payload)
      state.active = newCollection
      state.list.push(newCollection)
    },

    collectionEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingCollection: any = state.collection.list.find((x: Collection) => x.id === action.payload.id)

      if(matchingCollection){
        matchingCollection[action.payload.key] = action.payload.value
      }
    },
    
    collectionGet(state: RootState, action: PayloadAction<Partial<Collection>[]>){
      state.list = action.payload.map((x:any) => new Collection(x))
    },

    collectionStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = collectionSlice
export const { collectionActivate, collectionAdd, collectionEdit, collectionGet, collectionStatus } = actions
export default reducer
