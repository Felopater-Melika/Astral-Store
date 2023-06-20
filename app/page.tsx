'use client';

import { setGalaxies, setPlanets, setSolars } from '@/store/productsSlice';
import { store } from '@/store/store';

import Preloader from '@/components/preloader';
import Products from '@/components/products';
import Providers from '@/components/providers';

const processDataAndDispatch = (
  data: any,
  category: any,
  dispatchAction: any
) => {
  const processedData = data.products[category].map((item: any) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      price: item.variants.edges[0].node.price.amount,
      image: item.images.edges[0].node.url,
    };
  });

  store.dispatch(dispatchAction(processedData));
};

export default async function Page() {
  const response = await fetch(
    `${
      process.env.VERCEL_URL ? process.env.VERCEL_URL : 'http://localhost:3000'
    }/api/items`
  );
  const data = await response.json();

  processDataAndDispatch(data, 'planets', setPlanets);
  processDataAndDispatch(data, 'solars', setSolars);
  processDataAndDispatch(data, 'galaxies', setGalaxies);

  const products: any = store.getState().products;
  const planets: any = store.getState().products.planets;
  const solars: any = store.getState().products.solars;
  const galaxies: any = store.getState().products.galaxies;

  const allProducts: any = Object.values(products).flatMap(
    (category: any) => category
  );

  return (
    <Providers>
      <Preloader
        products={allProducts}
        planets={planets}
        solars={solars}
        galaxies={galaxies}
      />
      <Products products={allProducts} />
    </Providers>
  );
}
