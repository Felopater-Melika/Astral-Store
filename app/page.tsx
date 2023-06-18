import Image from "next/image"
import { setGalaxies, setPlanets, setSolars } from "@/store/productsSlice"
import { store } from "@/store/store"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

// Generic function to map data and dispatch to store
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
    }
  })

  // Dispatch action to set data in the store
  store.dispatch(dispatchAction(processedData))
}

const formatPrice = (price: number) => {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  })

  return formatter.format(price).replace(/^(\D+)/, "")
}

export default async function IndexPage() {
  const response = await fetch("http://localhost:3000/api/items")
  const data = await response.json()

  // Process and dispatch data for planets, solars, and galaxies
  processDataAndDispatch(data, "planets", setPlanets)
  processDataAndDispatch(data, "solars", setSolars)
  processDataAndDispatch(data, "galaxies", setGalaxies)

  const products: any = store.getState().products
  const allProducts: any = Object.values(products).flatMap(
    (category: any) => category
  )

  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      {allProducts.map((product: any) => (
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
          <CardFooter>
            <span>${formatPrice(product.price)}</span>
          </CardFooter>
        </Card>
      ))}
    </section>
  )
}
