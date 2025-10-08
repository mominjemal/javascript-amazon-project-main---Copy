function Cart(localStorageKey) {
  const cart = {
    cartItem: JSON.parse(localStorage.getItem(localStorageKey)) || [
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
    ],
    saveToLocalStorage() {
      localStorage.setItem(localStorageKey, JSON.stringify(this.cartItem));
    },

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
    },

    removeFromCart(productId) {
      const index = this.cartItem.findIndex(
        (cartItem) => cartItem.id === productId
      );
      if (index !== -1) {
        this.cartItem.splice(index, 1);
      }
      this.saveToLocalStorage();
    },
    updateCartQuantity() {
      let cartQuantity = 0;
      this.cartItem.forEach((cartItem) => {
        cartQuantity += cartItem.quantity;
      });
      localStorage.setItem("cartQuantity", cartQuantity);
    },

    updateQuatity(productId, newQuantity) {
      const cartItem = this.cartItem.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.quantity = Number(newQuantity) || 0;
        this.saveToLocalStorage();
      } else {
        console.error("Product not found in cart");
      }
    },

    // Correctly-spelled alias for backward compatibility
    updateQuantity(productId, newQuantity) {
      return this.updateQuatity(productId, newQuantity);
    },

    updateDeliveryOption(productId, deliveryOptionId) {
      const cartItem = this.cartItem.find((item) => item.id === productId);
      if (cartItem) {
        cartItem.deliveryOptionId = deliveryOptionId;
        this.saveToLocalStorage();
      } else {
        console.error("Product not found in cart");
      }
    },
  };
  return cart;
}
const cart = Cart("cart-oop");
const businessCart = Cart("cart-business");
cart.addToCart(2, "e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
//console.log(cart);
//console.log(businessCart);
