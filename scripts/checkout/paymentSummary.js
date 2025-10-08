import { cart } from "../../data/cart-class.js";
import { formatPrice } from "../util/money.js";
import { getProductById } from "../../data/products.js";
import { getDeliveryOptionById } from "../../data/deliveryOptions.js";

export function renderPaymentSummary() {
  let productsTotalCent = 0;
  let shippingCents = 0;
  cart.cartItem.forEach((cartItem) => {
    const matchingProduct = getProductById(cartItem.id);
    if (matchingProduct) {
      productsTotalCent += matchingProduct.priceCents * cartItem.quantity;
    }
  });

  cart.cartItem.forEach((cartItem) => {
    const deliveryOption = getDeliveryOptionById(cartItem.deliveryOptionId);
    if (deliveryOption) {
      shippingCents += deliveryOption.priceCents;
    }
  });

  let paymentSummaryHTML = `
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (${localStorage.getItem("cartQuantity")}):</div>
            <div class="payment-summary-money">$${formatPrice(
              productsTotalCent
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatPrice(
              shippingCents
            )}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatPrice(
              productsTotalCent + shippingCents
            )}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatPrice(
              0.1 * (productsTotalCent + shippingCents)
            )}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatPrice(
              productsTotalCent +
                shippingCents +
                0.1 * (productsTotalCent + shippingCents)
            )}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>`;
  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
}
