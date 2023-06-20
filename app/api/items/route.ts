import { NextResponse } from 'next/server';
import { gql, request } from 'graphql-request';

const getProducts = async (): Promise<any> => {
  const url = `https://${process.env.STORE_NAME}.myshopify.com/api/2023-04/graphql.json`;
  const headers = {
    'X-Shopify-Storefront-Access-Token': process.env
      .X_SHOPIFY_ACCESS_TOKEN as string,
  };

  const query = gql`
    query ProductsQuery {
      collections(
        first: 3
        query: "title:solars OR title:galaxies OR title:planets"
      ) {
        edges {
          node {
            title
            products(first: 10) {
              edges {
                node {
                  id
                  title
                  description
                  variants(first: 1) {
                    edges {
                      node {
                        price {
                          amount
                        }
                      }
                    }
                  }
                  images(first: 1) {
                    edges {
                      node {
                        url
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  return await request(url, query, undefined, headers);
};

export async function GET() {
  try {
    const { collections } = await getProducts();

    const solars = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === 'solars')
      .node.products.edges.map(({ node }: any) => node);

    const galaxies = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === 'galaxies')
      .node.products.edges.map(({ node }: any) => node);

    const planets = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === 'planets')
      .node.products.edges.map(({ node }: any) => node);
    return NextResponse.json({
      products: {
        solars,
        galaxies,
        planets,
      },
    });
  } catch (error) {
    console.error(error);
    NextResponse.json({ error: 'Failed to fetch products.tsx' });
  }
}
