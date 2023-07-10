<template>
  <q-card flat v-if="cartItems">
    <q-card-section v-if="!cartItems.length">
      <div class="text-h6">Your cart is empty</div>
      <div class="text-subtitle">
        Continue exploring our catalog and add some items
      </div>
    </q-card-section>
    <q-card-section
      v-if="cartItems.length"
      class="q-pa-none row justify-between"
    >
      <div class="text-h6">
        Your total is: <strong>{{ `$ ${total}` }}</strong>
      </div>
      <q-btn
        color="primary"
        label="Go to Checkout"
        icon="mdi-cart"
        @click="$router.push('/checkout')"
      />
    </q-card-section>
    <q-card-section v-if="cartItems.length">
      <div class="text-h6">Review:</div>
      <q-list v-if="cartItems" class="q-mt-md">
        <div v-for="(item, idx) in cartItems" :key="idx">
          <q-item>
            <q-item-section avatar>
              {{ `$ ${item.price}` }}
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ item.name }}</q-item-label>
              <q-item-label caption lines="2"
                >{{ item.description }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-btn no-caps color="negative" @click="onDeleteItem(item.id)">
                Delete
              </q-btn>
            </q-item-section>
          </q-item>

          <q-separator v-if="idx != cartItems.length - 1" spaced inset />
        </div>
      </q-list>
    </q-card-section>
    <q-card-actions> </q-card-actions>
  </q-card>
</template>

<script setup>
import { onMounted, ref, computed } from "vue";
import { CartService, Resources } from "../api";
import axios from "axios";
import { notifyCartContentChange } from "src/tools";
import { useCounterStore } from "src/stores";

const props = defineProps({
  id: {
    type: Number,
  },
});

const cartItems = ref();
const total = computed(() => {
  if (!cartItems.value) return 0;
  return cartItems.value.reduce((acc, item) => acc + item.price, 0);
});

async function getCardId() {
  let cartId = props.id;
  if (!cartId) {
    cartId = await CartService.getCart();
  }
  return cartId;
}

function setCart(data) {
  cartItems.value = data;
  notifyCartContentChange(data.length);
  useCounterStore().counter = data.length;
}

async function load() {
  const cartId = await getCardId();
  try {
    const { data } = await axios.get(`${Resources.CART}/${cartId}`);
    setCart(data);
  } catch (error) {
    if (error.response.status === 404) {
      const newCart = await CartService.getNewCart();
      const { data } = await axios.get(`${Resources.CART}/${newCart}`);
      setCart(data);
    }
  }
}

async function onDeleteItem(productId) {
  const cartId = await getCardId();
  CartService.remove(cartId, productId).then(() => {
    load();
  });
}

onMounted(() => {
  load();
});
</script>
