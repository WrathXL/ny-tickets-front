<template>
  <q-page class="flex flex-center">
    <div class="fit">
      <div id="publitas-embed-uk2qc1o9w8"></div>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from "vue";
import { createDynamicScript } from "../tools";
const publitasScriptAttr = {
  "data-publication": "https://view.publitas.com/publitas-jblo7zgo6geb/ny/",
  "data-publication-aspect-ratio": 1.294452347083926,
  "data-responsive": true,
  "data-width": undefined,
  "data-wrapper-id": "publitas-embed-uk2qc1o9w8",
  "publitas-embed": "true",
  src: "https://view.publitas.com/embed.js",
  type: "text/javascript",
};

onMounted(() => {
  const publitasScript = createDynamicScript(publitasScriptAttr);
  document.head.appendChild(publitasScript);
});
</script>
