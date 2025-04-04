import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { Account, AccountState } from '@/classes/account.class'
import { RootState } from './_store'
import { StatusType } from '@/classes/_status.types'


const initialState: AccountState = {
  active: new Account(),
  list: [],
  status: "STATUS_LOADED"
}

export const accountSlice: Slice = createSlice({
  name: "account",
  initialState,
  reducers: {

    accountActivate(state: RootState, action: PayloadAction<Partial<Account>>) {
      state.active = new Account(action.payload)
    },
    
    accountAdd(state: RootState, action: PayloadAction<Partial<Account>>){
      const newAccount: Account = new Account(action.payload)
      state.list.push(newAccount)
      state.active = newAccount
    },

    accountEdit(state: RootState, action: PayloadAction<{id: string, key: string, value: any}>){
      const matchingAccount: any = state.account.list.find((x: Account) => x.id === action.payload.id)

      if(matchingAccount){
        matchingAccount[action.payload.key] = action.payload.value
      }
    },
    
    accountGet(state: RootState, action: PayloadAction<Partial<Account>[]>){
      state.list = action.payload.map((x: Partial<Account>) => new Account(x))
    },
    
    accountStatus(state: RootState, action: PayloadAction<StatusType>){
      state.status = action.payload
    }
  }
})

const { actions, reducer } = accountSlice
export const { accountActivate, accountAdd, accountEdit, accountGet, accountStatus } = actions
export default reducer
