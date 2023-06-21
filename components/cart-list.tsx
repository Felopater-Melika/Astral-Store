import { useEffect, useState } from 'react';
import Image from 'next/image';
import { removeFromCart } from '@/store/cartSlice';
import { RootState } from '@/store/store';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';

import { CartItem as Item } from '@/types/cart';
import formatPrice from '@/lib/formatPrice';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

const query = `
  mutation createCheckout($lineItems: [CheckoutLineItemInput!]!) {
    checkoutCreate(input: { lineItems: $lineItems }) {
      checkout {
        id
        webUrl
      }
      checkoutUserErrors {
        code
        field
        message
      }
    }
  }
`;

function CartList() {
  const cartItems = useSelector((state: RootState) => state.cart.items) || [];
  const dispatch = useDispatch();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + Number(item.price), 0);
  };
  const createCheckout = async () => {
    console.log(process.env.STORE_NAME);
    const lineItems = cartItems.map((item) => ({
      variantId: item.id,
      quantity: 1,
    }));
    const apiUrl = `https://${process.env.NEXT_PUBLIC_STORE_NAME}.myshopify.com/api/2023-04/graphql.json`;

    console.log(process.env.STORE_NAME);
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env
          .NEXT_PUBLIC_X_SHOPIFY_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({
        query,
        variables: {
          lineItems: lineItems,
        },
      }),
    });

    const data = await response.json();
    if (data.errors) {
      console.error(data.errors);
      return;
    }

    const checkoutUrl = data.data.checkoutCreate.checkout.webUrl;

    // Redirect the user to the checkout page
    window.location.href = checkoutUrl;
  };
  return (
    <section className="container mt-4">
      <Table className="w-[60px]">
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Image</TableHead>
            <TableHead>Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cartItems.map((item: Item) => (
            <TableRow key={item.id}>
              <TableCell className="w-[40px]">
                <Image
                  width={40}
                  height={20}
                  src={item.image}
                  alt={item.title}
                />
              </TableCell>
              <TableCell className="w-[20px]">{item.title}</TableCell>
              <TableCell>${formatPrice(item.price)}</TableCell>
              <TableCell>
                <Trash2
                  onClick={() => dispatch(removeFromCart(item.id))}
                  className="hover:cursor-pointer"
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="mt-4 flex w-80 items-center justify-between">
        <Button onClick={createCheckout} variant="ghost" className="uppercase">
          Checkout
        </Button>
        <div>${formatPrice(calculateTotal())}</div>
      </div>
    </section>
  );
}

export default CartList;
