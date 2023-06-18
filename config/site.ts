export type SiteConfig = typeof siteConfig

export const siteConfig = {
  name: "Astral Store",
  description:
    "Astral Store is the one and only place to buy planets, solar systems, and even galaxies.",
  mainNav: [
    {
      title: "Home",
      href: "/",
    },
  ],
  links: {
    cart: "/cart",
    store: process.env.SHOPIFY_URL,
  },
  token: process.env.X_SHOPIFY_ACCESS_TOKEN,
}
