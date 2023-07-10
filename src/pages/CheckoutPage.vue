<template>
  <div>
    <div
      class="row justify-center q-mt-xl fit text-h2 text-primary text-center"
    >
      Oh no! We run out of tickets.
    </div>
    <div class="text-black row justify-center q-mt-md">
      Please check back later.
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useCatalogScript } from "../tools";
</script>
