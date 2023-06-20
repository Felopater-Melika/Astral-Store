'use client';

import { cartSlice } from '@/store/cartSlice';
import { AppDispatch, store } from '@/store/store';
import { useDispatch } from 'react-redux';

import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import Providers from '@/components/providers';

export const useAppDispatch: () => AppDispatch = useDispatch;

function AddToCart({ product }: { product: Product }) {
  const dispatch = useAppDispatch();

  return (
    <Button
      variant="ghost"
      onClick={() => {
        dispatch(cartSlice.actions.addToCart(product));
        console.log(store.getState().cart.items);
      }}
    >
      Add to Cart
    </Button>
  );
}

export default AddToCart;
