<template>
  <router-view />
</template>

<script setup>
import { useCounterStore } from "./stores";

useCounterStore().loadState();
</script>
