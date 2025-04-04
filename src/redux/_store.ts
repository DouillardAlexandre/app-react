import { EnhancedStore, Reducer, combineReducers, configureStore } from '@reduxjs/toolkit';

import _sessionReducer, { _sessionSlice } from './_session.slice';
import accountReducer, { accountSlice } from './account.slice';
import cardReducer, { cardSlice } from './card.slice';
import cardTemplateReducer, { cardTemplateSlice } from './card-template.slice';
import collectionReducer, { collectionSlice } from './collection.slice';
import discountReducer, { discountSlice } from './discount.slice';
import packReducer, { packSlice } from './pack.slice';
import packTemplateReducer, { packTemplateSlice } from './pack-template.slice';

import storage from 'redux-persist/lib/storage';
//import storageSession from 'redux-persist/lib/storage/session'
import { Persistor, persistReducer, persistStore } from 'redux-persist';
import apiMiddleware from '../utils/api-middleware.utils';

const persistConfig: any = {
  key: 'root',
  storage,
}

const rootReducer: Reducer = combineReducers({
  //[api.reducerPath]: api.reducer,
  _session: _sessionReducer,
  account: accountReducer,
  card: cardReducer,
  cardTemplate: cardTemplateReducer,
  collection: collectionReducer,
  discount: discountReducer,
  pack: packReducer,
  packTemplate: packTemplateReducer
})

const persistedReducer: Reducer = persistReducer(persistConfig, rootReducer)

const preloadedState: any = {
  _session: _sessionSlice.getInitialState(),
  account: accountSlice.getInitialState(),
  card: cardSlice.getInitialState(),
  cardTemplate: cardTemplateSlice.getInitialState(),
  collection: collectionSlice.getInitialState(),
  discount: discountSlice.getInitialState(),
  pack: packSlice.getInitialState(),
  packTemplate: packTemplateSlice.getInitialState(),
}

export const store: EnhancedStore = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware: any) =>
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