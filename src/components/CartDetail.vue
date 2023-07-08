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
    required: true,
  },
});

const cartItems = ref();

function load() {
  axios.get(`${Resources.CART}/${props.id}`).then(({ data }) => {
    cartItems.value = data;
  });
}

function onDeleteItem(productId) {
  CartService.remove(props.id, productId).then(() => {
    load();
  });
}

onMounted(() => {
  load();
});
</script>
