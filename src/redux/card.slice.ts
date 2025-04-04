import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { Card, CardState } from '@/classes/card.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: CardState = {
  active: new Card(),
  list: [],
  status: "STATUS_LOADED"
}

export const cardSlice: Slice = createSlice({
  name: "card",
  initialState,
  reducers: {

    cardActivate(state: RootState, action: PayloadAction<Partial<Card>>) {
      state.active = action.payload
    },
    
    cardAdd(state: RootState, action: PayloadAction<Partial<Card>>){
      const newCard: Card = new Card(action.payload)
      state.active = newCard
      state.list.push(newCard)
    },

    cardEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingCard: any = state.card.list.find((x: Card) => x.id === action.payload.id)

      if(matchingCard){
        matchingCard[action.payload.key] = action.payload.value
      }
    },
    
    cardGet(state: RootState, action: PayloadAction<Partial<Card>[]>){
      state.list = action.payload.map((x:any) => new Card(x))
    },

    cardStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = cardSlice
export const { cardActivate, cardAdd, cardEdit, cardGet, cardStatus } = actions
export default reducer
