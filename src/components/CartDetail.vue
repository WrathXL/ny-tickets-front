<template>
  <div class="q-pa-md" style="max-width: 350px">
    <q-list v-if="cartItems">
      <div v-for="(item, idx) in cartItems" :key="idx">
        <q-item>
          <q-item-section>
            <q-item-label>{{ item.name }}</q-item-label>
            <q-item-label caption lines="2"
              >{{ item.description }}
            </q-item-label>
          </q-item-section>

          <q-item-section side top>
            <q-item-label caption>{{ item.price }}</q-item-label>
          </q-item-section>
        </q-item>

        <q-separator v-if="idx != cartItems.length - 1" spaced inset />
      </div>
    </q-list>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Resources } from "../api";
import axios from "axios";

const props = defineProps({
  id: {
    type: Number,
    required: true,
  },
});

const cartItems = ref();

axios.get(`${Resources.CART}/${props.id}`).then(({ data }) => {
  cartItems.value = data;
});
</script>
