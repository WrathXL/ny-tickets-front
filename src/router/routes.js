const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/IndexPage.vue") },

      {
        path: "catalogs",
        component: () => import("pages/CatalogPage.vue"),
      },
    ],
  },
  {
    path: "/cart/:id",
    alias: "/cart",
    component: () => import("components/CartDetail.vue"),
    props: true,
  },
  {
    path: "/product/:slug",
    component: () => import("components/ProductDetail.vue"),
    props: true,
  },
  {
    path: "/checkout",
    component: () => import("pages/CheckoutPage.vue"),
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
