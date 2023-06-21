'use client';

import CartTable from '@/components/cart-list';
import Providers from '@/components/providers';

export default function Page() {
  return (
    <Providers>
      <CartTable />
    </Providers>
  );
}
