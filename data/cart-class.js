class Cart {
  #localStorageKey;
  constructor(localStorageKey) {
    this.#localStorageKey = localStorageKey;

    this.cartItem = JSON.parse(localStorage.getItem(this.#localStorageKey)) || [
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
  }
  saveToLocalStorage() {
    localStorage.setItem(this.#localStorageKey, JSON.stringify(this.cartItem));
  }

  addToCart(selectedQuantity, productId) {
    let matchingProduct;
    this.cartItem.forEach((cartItem) => {
      if (cartItem.id === productId) {
        matchingProduct = cartItem;
      }
    });
    const qty = Number(selectedQuantity) || 1;
    if (matchingProduct) {
      matchingProduct.quantity += qty;
    } else {
      this.cartItem.push({
        id: productId,
        quantity: qty,
        deliveryOptionId: "1",
      });
    }
    this.saveToLocalStorage();
  }

  removeFromCart(productId) {
    const index = this.cartItem.findIndex(
      (cartItem) => cartItem.id === productId
    );
    if (index !== -1) {
      this.cartItem.splice(index, 1);
    }
    this.saveToLocalStorage();
  }
  updateCartQuantity() {
    let cartQuantity = 0;
    this.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });
    localStorage.setItem("cartQuantity", cartQuantity);
  }

  updateQuantity(productId, newQuantity) {
    const cartItem = this.cartItem.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.quantity = Number(newQuantity) || 0;
      this.saveToLocalStorage();
    } else {
      console.error("Product not found in cart");
    }
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = this.cartItem.find((item) => item.id === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = deliveryOptionId;
      this.saveToLocalStorage();
    } else {
      console.error("Product not found in cart");
    }
  }
}

export const cart = new Cart("cart-oop");
export const businessCart = new Cart("cart-business");
