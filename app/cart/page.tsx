'use client';

import CartTable from '@/components/CartList';
import Providers from '@/components/providers';

export default function Page() {
  return (
    <Providers>
      <CartTable />
    </Providers>
  );
}
