export const cart = [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
  },
];
export function addToCart(selectedQuantity, productId) {
  let matchingProduct;
  cart.forEach((cartItem) => {
    if (cartItem.id === productId) {
      matchingProduct = cartItem;
    }
  });
  if (matchingProduct) {
    matchingProduct.quantity += selectedQuantity;
  } else {
    cart.push({
      id: productId,
      quantity: selectedQuantity,
    });
  }
}
