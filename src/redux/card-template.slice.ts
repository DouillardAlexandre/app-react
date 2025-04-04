import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { CardTemplate, CardTemplateState } from '@/classes/card-template.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: CardTemplateState = {
  active: new CardTemplate(),
  list: [],
  status: "STATUS_LOADED"
}

export const cardTemplateSlice: Slice = createSlice({
  name: "card-template",
  initialState,
  reducers: {

    cardTemplateActivate(state: RootState, action: PayloadAction<Partial<CardTemplate>>) {
      state.active = action.payload
    },
    
    cardTemplateAdd(state: RootState, action: PayloadAction<Partial<CardTemplate>>){
      const newCardTemplate: CardTemplate = new CardTemplate(action.payload)
      state.active = newCardTemplate
      state.list.push(newCardTemplate)
    },

    cardTemplateEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingCardTemplate: any = state.cardTemplate.list.find((x: CardTemplate) => x.id === action.payload.id)

      if(matchingCardTemplate){
        matchingCardTemplate[action.payload.key] = action.payload.value
      }
    },
    
    cardTemplateGet(state: RootState, action: PayloadAction<Partial<CardTemplate>[]>){
      state.list = action.payload.map((x:any) => new CardTemplate(x))
    },
    
    cardTemplateReplace: (state: RootState, action: PayloadAction<Partial<CardTemplate>>) => {
      const active: CardTemplate = new CardTemplate(action.payload)
      state.active = active
      state.list = state.list.map((x: CardTemplate) => x.id === active.id ? active : x)
    },

    cardTemplateStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = cardTemplateSlice
export const { cardTemplateActivate, cardTemplateAdd, cardTemplateEdit, cardTemplateGet, cardTemplateReplace, cardTemplateStatus } = actions
export default reducer
