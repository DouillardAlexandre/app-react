import { PayloadAction, Slice, createSlice } from '@reduxjs/toolkit'
import { Session } from '@/classes/_session.class'
import { RootState } from './_store'


const initialState: Session = new Session()

export const _sessionSlice: Slice = createSlice({
  name: "_session",
  initialState,
  reducers: {

    _sessionEdit: (state: RootState, action: PayloadAction<{key: string, value: any}>) => {
      state[action.payload.key] = action.payload.value
    },
    
    _sessionUpdate: (state: RootState, action: PayloadAction<Partial<Session>>) => {
      state = action.payload
    }
  }
})

const { actions, reducer } = _sessionSlice
export const { _sessionEdit, _sessionUpdate } = actions
export default reducer