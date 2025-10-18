import { renderCheckout } from "./checkout/orderySummry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";

loadProducts(() => {
  renderCheckoutHeader();
  renderPaymentSummary();
  renderCheckout();
});
