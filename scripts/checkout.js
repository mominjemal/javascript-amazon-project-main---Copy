import { renderCheckout } from "./checkout/orderySummry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import "../data/cart-OOP.js";
import "../data/cart-class.js";

renderCheckoutHeader();
renderPaymentSummary();
renderCheckout();
