import { onMounted } from "vue";
import { createDynamicScript } from "./create-dynamic-script";

export function useCatalogScript(id, publicationUrl) {
  const publitasScriptAttr = {
    "data-publication": publicationUrl,
    "data-publication-aspect-ratio": 1.294452347083926,
    "data-responsive": true,
    "data-width": undefined,
    "data-wrapper-id": id,
    "publitas-embed": "true",
    src: "https://view.publitas.com/embed.js",
    type: "text/javascript",
  };

  onMounted(() => {
    const publitasScript = createDynamicScript(publitasScriptAttr);
    document.head.appendChild(publitasScript);
  });
}
