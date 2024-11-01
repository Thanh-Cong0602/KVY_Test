// product.slice.ts
import { CartItem } from '@/types/product.type'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

type ProductState = {
  isFilter: boolean
  category?: string
  rating?: number
  minPrice?: number
  maxPrice?: number
  clearFilter: boolean
  cartCount: number
  items: CartItem[]
}

const initialState: ProductState = {
  isFilter: false,
  category: undefined,
  rating: undefined,
  minPrice: undefined,
  maxPrice: undefined,
  clearFilter: false,
  cartCount: 0,
  items: []
}

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    resetProduct: () => initialState,
    setIsFilter(state, action: PayloadAction<boolean>) {
      state.isFilter = action.payload
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload
    },
    setRating(state, action: PayloadAction<number | undefined>) {
      state.rating = action.payload
    },
    setMinPrice(state, action: PayloadAction<number | undefined>) {
      state.minPrice = action.payload
    },
    setMaxPrice(state, action: PayloadAction<number | undefined>) {
      state.maxPrice = action.payload
    },
    setClearFilter(state, action: PayloadAction<boolean>) {
      state.clearFilter = action.payload
    },
    addToCart(state, action: PayloadAction<number>) {
      const productId = action.payload
      const existingItem = state.items.find(item => item.id === productId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        state.items.push({ id: productId, quantity: 1 })
      }
    },
    updateCartItemQuantity(state, action: PayloadAction<{ id: number; quantity: number }>) {
      const { id, quantity } = action.payload
      const existingItem = state.items.find(item => item.id === id)
      if (existingItem) {
        existingItem.quantity = quantity
      }
    },
    removeCartItem: (state, action: PayloadAction<number>) => {
      const id = action.payload
      state.items = state.items.filter(item => item.id !== id)
    },
    clearCart(state) {
      state.cartCount = 0
    }
  }
})

export const {
  resetProduct,
  setClearFilter,
  setCategory,
  setRating,
  setIsFilter,
  setMinPrice,
  setMaxPrice,
  addToCart,
  clearCart,
  updateCartItemQuantity,
  removeCartItem
} = productSlice.actions

const persistConfig = {
  key: 'product',
  storage,
  whitelist: ['items']
}

const persistedReducer = persistReducer(persistConfig, productSlice.reducer)

export default persistedReducer
