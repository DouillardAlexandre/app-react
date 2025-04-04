import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { Pack, PackState } from '@/classes/pack.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: PackState = {
  active: new Pack(),
  list: [],
  status: "STATUS_LOADED"
}

export const packSlice: Slice = createSlice({
  name: "pack",
  initialState,
  reducers: {

    packActivate(state: RootState, action: PayloadAction<Partial<Pack>>) {
      state.active = action.payload
    },
    
    packAdd(state: RootState, action: PayloadAction<Partial<Pack>>){
      const newPack: Pack = new Pack(action.payload)
      state.active = newPack
      state.list.push(newPack)
    },

    packEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingPack: any = state.pack.list.find((x: Pack) => x.id === action.payload.id)

      if(matchingPack){
        matchingPack[action.payload.key] = action.payload.value
      }
    },
    
    packGet(state: RootState, action: PayloadAction<Partial<Pack>[]>){
      state.list = action.payload.map((x:any) => new Pack(x))
    },

    packStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = packSlice
export const { packActivate, packAdd, packEdit, packGet, packStatus } = actions
export default reducer
