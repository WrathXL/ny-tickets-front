<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="bg-white text-black">
        <q-btn
          flat
          round
          dense
          icon="img:/icons/icon.png"
          size="30px"
          @click="$router.push('/')"
        />
        <q-toolbar-title
          style="font-size: 30px"
          class="text-black font-weight-bold"
        >
          Summer Events NYC
        </q-toolbar-title>
        <q-btn flat @click="$router.push('/catalogs')"> Catalogs </q-btn>
        <q-btn flat round icon="mdi-cart">
          <q-badge color="orange" floating>{{ cart.items }}</q-badge>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container class="bg-orange-1">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useCounterStore } from "../stores";
const cart = useCounterStore();
</script>
