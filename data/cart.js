export let cart = JSON.parse(localStorage.getItem("cart")) || [
  {
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity: 1,
    deliveryOptionId: "1",
  },
  {
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity: 2,
    deliveryOptionId: "2",
  },
];
export function saveToLocalStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}

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
      deliveryOptionId: "1",
    });
  }
  saveToLocalStorage();
}

export function removeFromCart(productId) {
  const index = cart.findIndex((cartItem) => cartItem.id === productId);
  if (index !== -1) {
    cart.splice(index, 1);
  }
  saveToLocalStorage();
}
export function updateCartQuantity() {
  let cartQuantity = 0;
  cart.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  localStorage.setItem("cartQuantity", cartQuantity);
}
export function updateQuatity(productId, newQuantity) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.quantity = newQuantity;
    saveToLocalStorage();
  } else {
    console.error("Product not found in cart");
  }
}
export function updateDeliveryOption(productId, deliveryOptionId) {
  const cartItem = cart.find((item) => item.id === productId);
  if (cartItem) {
    cartItem.deliveryOptionId = deliveryOptionId;
    saveToLocalStorage();
  } else {
    console.error("Product not found in cart");
  }
}
export function loadCart(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    console.log(Response);
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/cart");
  xhr.send();
}
