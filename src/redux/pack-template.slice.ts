import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { PackTemplate, PackTemplateState } from '@/classes/pack-template.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: PackTemplateState = {
  active: new PackTemplate(),
  list: [],
  status: "STATUS_LOADED"
}

export const packTemplateSlice: Slice = createSlice({
  name: "pack-template",
  initialState,
  reducers: {

    packTemplateActivate(state: RootState, action: PayloadAction<Partial<PackTemplate>>) {
      state.active = action.payload
    },
    
    packTemplateAdd(state: RootState, action: PayloadAction<Partial<PackTemplate>>){
      const packTemplate: PackTemplate = new PackTemplate(action.payload)
      state.active = packTemplate
      state.list.push(packTemplate)
    },

    packTemplateEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingPackTemplate: any = state.list.find((x: PackTemplate) => x.id === action.payload.id)

      if(matchingPackTemplate){
        matchingPackTemplate[action.payload.key] = action.payload.value
      }
    },
    
    packTemplateGet(state: RootState, action: PayloadAction<Partial<PackTemplate>[]>){
      state.list = action.payload.map((x:any) => new PackTemplate(x))
    },

    packTemplateReplace: (state: RootState, action: PayloadAction<Partial<PackTemplate>>) => {
      const active: PackTemplate = new PackTemplate(action.payload)
      state.active = active
      state.list = state.list.map((x: PackTemplate) => x.id === active.id ? active : x)
    },

    packTemplateStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = packTemplateSlice
export const { packTemplateActivate, packTemplateAdd, packTemplateEdit, packTemplateGet, packTemplateReplace, packTemplateStatus } = actions
export default reducer
