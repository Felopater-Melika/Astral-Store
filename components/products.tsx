'use client';

import { useEffect, useState } from 'react';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Product from '@/components/product';

const Products = ({ products }: any) => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const planets = useSelector((state: RootState) => state.products.planets);
  const solars = useSelector((state: RootState) => state.products.solars);
  const galaxies = useSelector((state: RootState) => state.products.galaxies);

  const [displayedProducts, setDisplayedProducts] = useState<any[]>([]);

  useEffect(() => {
    switch (selectedCategory) {
      case 'planets':
        setDisplayedProducts(planets);
        break;
      case 'solars':
        setDisplayedProducts(solars);
        break;
      case 'galaxies':
        setDisplayedProducts(galaxies);
        break;
      default: // 'all'
        setDisplayedProducts([]);
    }
  }, [selectedCategory, planets, solars, galaxies]);

  const handleSelect = (value: string) => {
    setSelectedCategory(value);
  };

  const productsToDisplay =
    displayedProducts.length > 0 ? displayedProducts : products;
  return (
    <main className="container sm:items-center">
      <Select onValueChange={handleSelect}>
        <SelectTrigger className="mt-10 w-[180px]">
          <SelectValue placeholder="Select Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          <SelectItem value="planets">Planets</SelectItem>
          <SelectItem value="solars">Star Systems</SelectItem>
          <SelectItem value="galaxies">Galaxies</SelectItem>
        </SelectContent>
      </Select>
      <section className="grid grid-cols-1 items-center gap-6 pb-8 pt-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {productsToDisplay.map((product: Product) => (
          <Product key={product.id} product={product} />
        ))}
      </section>
    </main>
  );
};

export default Products;
