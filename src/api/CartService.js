import axios from "axios";
import { Resources } from "./resources";
const CART_STORAGE_KEY = "cartId";

export const CartService = {
  async add(productId) {
    let cartId = localStorage.getItem(CART_STORAGE_KEY);

    if (!cartId) {
      cartId = (await axios.post(Resources.CART)).data.id;
    }

    localStorage.setItem(CART_STORAGE_KEY, cartId);
    await axios.post(Resources.ADD_TO_CART(cartId, productId));
  },
  async remove(cartId, productId) {
    await axios.delete(Resources.REMOVE_FROM_CART(cartId, productId));
  },
};
