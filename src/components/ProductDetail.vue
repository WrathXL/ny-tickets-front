<template>
  <q-card flat v-if="product && products" class="fit">
    <q-card-section class="row justify-center">
      <q-img :src="product.url" width="500px" height="400px" />
    </q-card-section>
    <q-card-section class="q-pt-none">
      <div class="text-h5 q-mt-md">{{ product.name }}</div>
      <div class="text-caption text-grey q-mt-md">
        {{ product.description }}
      </div>
    </q-card-section>

    <q-card-actions class="row justify-center q-mt-lg">
      <q-btn
        v-if="!isInCart(product.id)"
        color="primary"
        icon="mdi-cart"
        icons-size="sm"
        no-caps
        class="text-weight-bold text-h6"
        @click="onAddToCart"
      >
        Add to cart
      </q-btn>
      <q-btn
        v-else
        color="positive"
        icon="mdi-cart-check"
        icons-size="sm"
        no-caps
        class="text-weight-bold text-h6"
      >
        You added this product to your cart
      </q-btn>
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import axios from "axios";
import { CartService, Resources } from "src/api";
import { notifyCartContentChange } from "src/tools";
import { onMounted, ref } from "vue";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});
const stars = ref(4);
const products = ref([]);
const product = ref();

async function onAddToCart() {
  const products = await CartService.add(props.id);
  notifyCartContentChange(products.length);
}

function loadProducts() {
  axios.get(Resources.PRODUCT).then(({ data }) => {
    products.value = data;
  });
}

function loadProduct() {
  axios.get(`${Resources.PRODUCT}/${props.id}`).then(({ data }) => {
    product.value = data;
  });
}

function isInCart(productId) {
  console.log("productId", productId);
  console.log("products", products.value);
  return products.value.some((product) => product.id === productId);
}

onMounted(() => {
  loadProducts();
  loadProduct();
});
</script>
