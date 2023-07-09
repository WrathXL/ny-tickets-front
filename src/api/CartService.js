import axios from "axios";
import { Resources } from "./resources";
const CART_STORAGE_KEY = "cartId";

export const CartService = {
  async getNewCart() {
    localStorage.removeItem(CART_STORAGE_KEY);
    return await this.getCart();
  },
  async getCart() {
    let cartId = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartId) {
      cartId = (await axios.post(Resources.CART)).data.id;
      localStorage.setItem(CART_STORAGE_KEY, cartId);
    }
    return cartId;
  },

  async add(productId) {
    const cartId = await this.getCart();
    localStorage.setItem(CART_STORAGE_KEY, cartId);
    const { data } = await axios.post(Resources.ADD_TO_CART(cartId, productId));
    return data;
  },
  async remove(cartId, productId) {
    await axios.delete(Resources.REMOVE_FROM_CART(cartId, productId));
  },
};
