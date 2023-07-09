<template>
  <q-card v-if="product">
    <q-card class="my-card" flat bordered>
      <q-card-section class="q-pt-none">
        <div class="text-subtitle1">{{ product.name }}</div>
        <div class="text-caption text-grey">
          {{ product.description }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-actions>
        <q-btn flat round icon="event" />
        <q-btn flat color="primary" @click="onAddToCart"> Add to cart </q-btn>
      </q-card-actions>
    </q-card>
  </q-card>
</template>

<script setup lang="ts">
import axios from "axios";
import { CartService, Resources } from "src/api";
import { notifyCartContentChange } from "src/tools";
import { ref } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const stars = ref(4);
const product = ref();

async function onAddToCart() {
  const products = await CartService.add(props.id);
  notifyCartContentChange(products.length);
}

axios.get(`${Resources.PRODUCT}/${props.id}`).then(({ data }) => {
  product.value = data;
});
</script>
