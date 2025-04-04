import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { Discount, DiscountState } from '@/classes/discount.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: DiscountState = {
  active: new Discount(),
  list: [],
  status: "STATUS_LOADED"
}

export const discountSlice: Slice = createSlice({
  name: "discount",
  initialState,
  reducers: {

    discountActivate(state: RootState, action: PayloadAction<Partial<Discount>>) {
      state.active = action.payload
    },
    
    discountAdd(state: RootState, action: PayloadAction<Partial<Discount>>){
      const newDiscount: Discount = new Discount(action.payload)
      state.active = newDiscount
      state.list.push(newDiscount)
    },

    discountEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingDiscount: any = state.discount.list.find((x: Discount) => x.id === action.payload.id)

      if(matchingDiscount){
        matchingDiscount[action.payload.key] = action.payload.value
      }
    },
    
    discountGet(state: RootState, action: PayloadAction<Partial<Discount>[]>){
      state.list = action.payload.map((x:any) => new Discount(x))
    },

    discountStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = discountSlice
export const { discountActivate, discountAdd, discountEdit, discountGet, discountStatus } = actions
export default reducer
