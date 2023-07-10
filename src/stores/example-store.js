import { defineStore } from "pinia";
import { CartService } from "../api";

export const useCounterStore = defineStore("counter", {
  state: () => {
    return {
      counter: 0,
    };
  },
  getters: {
    items: (state) => state.counter,
  },
  actions: {
    increment() {
      this.counter++;
    },
    loadState() {
      CartService.getCartItems().then((data) => {
        this.counter = data.length;
      });
    },
  },
});
