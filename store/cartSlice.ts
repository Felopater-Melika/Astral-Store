import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface CartItem {
  id: string
  title: string
  price: number
  image: any
}

interface CartState {
  items: CartItem[]
}

const initialState: CartState = {
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      state.items.push(action.payload)
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.id !== action.payload)
    },
  },
})

export const { addToCart, removeFromCart } = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items

export default cartSlice.reducer
