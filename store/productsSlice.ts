import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import { Product, ProductState } from '@/types/product';

import type { RootState } from './store';

const initialState: ProductState = {
  all: [],
  planets: [],
  solars: [],
  galaxies: [],
};

export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setAll: (state, action: PayloadAction<Product[]>) => {
      state.all = action.payload;
    },
    setPlanets: (state, action: PayloadAction<Product[]>) => {
      state.planets = action.payload;
    },
    setSolars: (state, action: PayloadAction<Product[]>) => {
      state.solars = action.payload;
    },
    setGalaxies: (state, action: PayloadAction<Product[]>) => {
      state.galaxies = action.payload;
    },
  },
});

export const { setAll, setPlanets, setSolars, setGalaxies } =
  productsSlice.actions;

export const selectAllProducts = (state: RootState) => state.products.all;
export const selectPlanets = (state: RootState) => state.products.planets;
export const selectSolars = (state: RootState) => state.products.solars;
export const selectGalaxies = (state: RootState) => state.products.galaxies;

export default productsSlice.reducer;
