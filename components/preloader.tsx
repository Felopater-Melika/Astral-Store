'use client';

import { useRef } from 'react';
import {
  setAll,
  setGalaxies,
  setPlanets,
  setSolars,
} from '@/store/productsSlice';
import { store } from '@/store/store';

function Preloader({ products, planets, solars, galaxies }: any) {
  const loaded = useRef(false);
  if (!loaded.current) {
    store.dispatch(setAll(products));
    store.dispatch(setPlanets(planets));
    store.dispatch(setSolars(solars));
    store.dispatch(setGalaxies(galaxies));
    loaded.current = true;
  }

  return null;
}

export default Preloader;
