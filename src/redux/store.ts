import product from '@/redux/feature/product.slice'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { persistStore } from 'redux-persist'

const rootReducer = combineReducers({
  product: product
})

const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false })
})

const persistor = persistStore(store)

export { persistor, store }

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
