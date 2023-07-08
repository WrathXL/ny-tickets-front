<template>
  <q-card>
    <q-card-section>
      <q-list v-if="cartItems">
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
  </q-card>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { CartService, Resources } from "../api";
import axios from "axios";

const props = defineProps({
  id: {
    type: Number,
  },
});

const cartItems = ref();

async function getCardId() {
  let cartId = props.id;
  if (!cartId) {
    cartId = await CartService.getCart();
  }
  return cartId;
}

async function load() {
  const cartId = await getCardId();
  axios.get(`${Resources.CART}/${cartId}`).then(({ data }) => {
    cartItems.value = data;
  });
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
