import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import type { RootState } from './store';

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: any;
}

interface CartState {
  items: CartItem[];
}

const savedCart =
  typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('cart') || '[]')
    : [];

const initialState: CartState = {
  items: savedCart,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const itemExists = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (!itemExists) {
        state.items.push(action.payload);

        if (typeof window !== 'undefined') {
          localStorage.setItem('cart', JSON.stringify(state.items));
        }
      }
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);

      if (typeof window !== 'undefined') {
        localStorage.setItem('cart', JSON.stringify(state.items));
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart.items;

export default cartSlice.reducer;
