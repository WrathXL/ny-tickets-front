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
        v-if="!isInCart"
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
import { computed, onMounted, ref } from "vue";

const props = defineProps({
  slug: {
    type: String,
    required: true,
  },
});
const stars = ref(4);
const cart = ref([]);
const product = ref();
const products = ref();

const isInCart = computed(() => cart.value.find((p) => p.slug === props.slug));

async function onAddToCart() {
  const productId = products.value.find((p) => p.slug === props.slug).id;
  cart.value = await CartService.add(productId);
  notifyCartContentChange(cart.value.length);
}

async function loadCart() {
  cart.value = await CartService.getCartItems();
}

function loadProduct() {
  axios.get(`${Resources.PRODUCT}/${props.slug}`).then(({ data }) => {
    product.value = data;
  });
}

function loadProducts() {
  axios.get(Resources.PRODUCT).then(({ data }) => {
    products.value = data;
  });
}

onMounted(() => {
  loadProduct();
  loadProducts();
  loadCart();
});
</script>
