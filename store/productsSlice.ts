import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

interface Product {
  id: string
  title: string
  price: number
  description: string
  image: any
}

interface ProductState {
  planets: Product[]
  solars: Product[]
  galaxies: Product[]
}

const initialState: ProductState = {
  planets: [],
  solars: [],
  galaxies: []
}


export const productsSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setPlanets: (state, action: PayloadAction<Product[]>) => {
      state.planets = action.payload

    },
    setSolars: (state, action: PayloadAction<Product[]>) => {
      state.solars = action.payload

    },
    setGalaxies: (state, action: PayloadAction<Product[]>) => {
      state.galaxies = action.payload
    },
  },
})

export const { setPlanets, setSolars, setGalaxies } = productsSlice.actions

export const selectPlanets = (state: RootState) => state.products.planets
export const selectSolars = (state: RootState) => state.products.solars
export const selectGalaxies = (state: RootState) => state.products.galaxies
export const selectAllProducts = (state: RootState) => [...state.products.planets, ...state.products.solars, ...state.products.galaxies]

export default productsSlice.reducer
