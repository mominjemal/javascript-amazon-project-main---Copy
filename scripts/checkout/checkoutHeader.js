//import { renderCheckout } from "./orderySummry";

export function renderCheckoutHeader() {
  document.querySelector(
    ".js-cart-quantity-checkout"
  ).innerHTML = `${localStorage.getItem("cartQuantity")} items`;
}
