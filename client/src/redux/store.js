/* Slice'ı kullanabilmek ve global bir state tutabilmek için store işlemleri gerçekleştirilir.
*/

/*
configureStore() : Reducerların tanımlanmasını sağlayan yapıdır.
  import {combineReducers, configureStore} from "@reduxjs/toolkit"

  const setupStore = () => {
    return configureStore({
        reducer: rootReducer
    })
  };
*/

import {configureStore, combineReducers} from "@reduxjs/toolkit";
import userReducer from "../redux/userSlice.js";
import videoReducer from "../redux/videoSlice.js";

/* React Redux Persist */
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {PersistGate} from 'redux-persist/integration/react'

/* React Redux Persist Config */

const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
   user: userReducer, video: videoReducer
})

/* Persist Reducer */
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

/* Persistor export */
export const persistor = persistStore(store)

