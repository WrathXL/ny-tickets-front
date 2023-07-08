const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/cart/:id",
    alias: "/cart",
    component: () => import("components/CartDetail.vue"),
    props: true,
  },
  {
    path: "/product/:id",
    component: () => import("components/ProductDetail.vue"),
    props: true,
  },

  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
