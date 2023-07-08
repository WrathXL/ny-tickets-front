const BASE_API = "http://127.0.0.1:5000";

export const Resources = {
  CART: `${BASE_API}/cart`,
  PRODUCT: `${BASE_API}/products`,
  ADD_TO_CART: (cartId, productId) =>
    `${BASE_API}/cart/${cartId}/add/${productId}`,
  REMOVE_FROM_CART: (cartId, productId) =>
    `${BASE_API}/cart/${cartId}/remove/${productId}`,
};
