import React from "react"
import Image from "next/image"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {Product} from "@/types/product";
import formatPrice from "@/lib/formatPrice";
import AddToCart from "./AddToCart";

function Product({ product }: { product: Product }) {
  return (
    <Card key={product.id} className="w-80">
      <CardHeader>
        <CardTitle>{product.title}</CardTitle>
        <CardDescription>{product.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Image
          width={400}
          height={200}
          src={product.image}
          alt={product.title}
        />
      </CardContent>
      <CardFooter className='flex justify-between'>
        <span>${formatPrice(product.price)}</span>
      <AddToCart product={product} />
      </CardFooter>
    </Card>
  )
}

export default Product
