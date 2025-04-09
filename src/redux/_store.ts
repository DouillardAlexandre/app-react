import { EnhancedStore, Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import accountReducer, { accountSlice } from './account.slice';

import storage from 'redux-persist/lib/storage';
//import storageSession from 'redux-persist/lib/storage/session'
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import apiMiddleware from '../utils/api-middleware.utils';

const persistConfig: any = {
  key: 'root',
  storage,
}

const rootReducer: Reducer = combineReducers({
  account: accountReducer,
})

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer)

const preloadedState: any = {
  account: accountSlice.getInitialState(),
}

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: Function) =>
    getDefaultMiddleware({
      /*thunk: {
        extraArgument: apiMiddleware,
      },*/
      immutableCheck: false,
      serializableCheck: false,
    }).concat(apiMiddleware),
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState
})

export const persistor: Persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch