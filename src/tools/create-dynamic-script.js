export function createDynamicScript(attrs) {
  const script = document.createElement("script");
  Object.entries(attrs).forEach(([key, value]) => {
    script.setAttribute(key, value);
  });
  return script;
}
