<template>
  <q-page class="flex flex-center">
    <div class="fit">
      <div id="publitas-embed-xzowgn6fwfi"></div>
    </div>
    <q-dialog v-model="showDetails">
      <product-detail :slug="selectedProduct" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { useCatalogScript } from "../tools";
import ProductDetail from "../components/ProductDetail.vue";

const selectedProduct = ref();
const showDetails = ref(false);

useCatalogScript(
  "publitas-embed-xzowgn6fwfi",
  "https://view.publitas.com/publitas-jblo7zgo6geb/ny-events/"
);

onMounted(() => {
  window.addEventListener("message", (event) => {
    const data = JSON.parse(event.data);
    if (data.action && data.action == "show") {
      selectedProduct.value = data.product;
      showDetails.value = true;
      console.log(data.product);
    }
  });
});
</script>
