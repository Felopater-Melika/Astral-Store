import { setGalaxies, setPlanets, setSolars } from '@/store/productsSlice';
import { store } from '@/store/store';

import Products from '@/components/Products';
import Providers from '@/components/Providers';
import Preloader from '@/components/preloader';

const apiUrl = `https://${process.env.STORE_NAME}.myshopify.com/api/2023-04/graphql.json`;

const query = `
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
                      id
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

const fetchProducts = async () => {
  try {
    const response = await fetch(apiUrl, {
      next: { revalidate: 10 },
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': process.env
          .X_SHOPIFY_ACCESS_TOKEN as string,
      },
      body: JSON.stringify({ query }),
    });

    const {
      data: { collections },
    } = await response.json();

    const solars = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === 'solars')
      .node.products.edges.map(({ node }: any) => node);
    const galaxies = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === 'galaxies')
      .node.products.edges.map(({ node }: any) => node);
    const planets = collections.edges
      .find(({ node }: any) => node.title.toLowerCase() === 'planets')
      .node.products.edges.map(({ node }: any) => node);

    return { products: { solars, galaxies, planets } };
  } catch (error) {
    console.error(error);
    return { error: 'Failed to fetch products' };
  }
};

const processDataAndDispatch = (
  data: any,
  category: any,
  dispatchAction: any
) => {
  const processedData = data.products[category].map((item: any) => {
    return {
      id: item.variants.edges[0].node.id,
      title: item.title,
      description: item.description,
      price: item.variants.edges[0].node.price.amount,
      image: item.images.edges[0].node.url,
    };
  });

  store.dispatch(dispatchAction(processedData));
};

export default async function Page() {
  const data = await fetchProducts();

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
    <>
      <Preloader
        products={allProducts}
        planets={planets}
        solars={solars}
        galaxies={galaxies}
      />
      <Products products={allProducts} />
    </>
  );
}
