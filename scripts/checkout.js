import { renderCheckout } from "./checkout/orderySummry.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import "../data/cart-OOP.js";
renderCheckoutHeader();
renderPaymentSummary();
renderCheckout();
