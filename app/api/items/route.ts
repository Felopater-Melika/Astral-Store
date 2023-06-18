import fs from "fs"
import path from "path"
import { NextResponse } from "next/server"
import { request } from "graphql-request"

const getProducts = async (): Promise<any> => {
  const query = fs.readFileSync(
    path.join(process.cwd(), "products.graphql"),
    "utf8"
  )

  const url = `https://${process.env.STORE_NAME}.myshopify.com/api/2023-04/graphql.json`
  const headers = {
    "X-Shopify-Storefront-Access-Token": process.env
      .X_SHOPIFY_ACCESS_TOKEN as string,
  }

  return await request(url, query, undefined, headers)
}

export async function GET() {
  try {
    const { collections } = await getProducts()

    const solars = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === "solars")
      .node.products.edges.map(({ node }: any) => node)

    const galaxies = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === "galaxies")
      .node.products.edges.map(({ node }: any) => node)

    const planets = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === "planets")
      .node.products.edges.map(({ node }: any) => node)

    return NextResponse.json({
      products: {
        solars,
        galaxies,
        planets,
      },
    })
  } catch (error) {
    console.error(error)
    NextResponse.json({ error: "Failed to fetch products" })
  }
}
