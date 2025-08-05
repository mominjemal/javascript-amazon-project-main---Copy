export const cart = [];
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
