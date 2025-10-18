import { renderCheckout } from "./checkout/orderySummry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { loadProducts } from "../data/products.js";
import { loadCart } from "../data/cart.js";

Promise.all([
  new Promise((resolve) => loadProducts(() => resolve("products loaded "))),
  new Promise((resolve) => loadCart(() => resolve("products loaded "))),
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderPaymentSummary();
  renderCheckout();
});

/*loadProducts(() => {
  renderCheckoutHeader();
  renderPaymentSummary();
  renderCheckout();
});
*/
