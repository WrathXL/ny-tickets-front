export function notifyCartContentChange(amount) {
  window.parent.postMessage(
    JSON.stringify([
      "cartContentChanged",
      {
        numItems: amount,
      },
    ]),
    "*"
  );
}
