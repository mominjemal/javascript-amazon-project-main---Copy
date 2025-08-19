import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuatity,
  updateDeliveryOption,
  saveToLocalStorage,
} from "../data/cart.js";
import { deliveryOptions } from "../data/deliveryOptions.js";
import { products } from "../data/products.js";
import { formatPrice } from "./util/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
function renderCheckout() {
  let checkoutHtml = "";

  cart.forEach((cartItem) => {
    const product = products.find((product) => product.id === cartItem.id);
    let x =
      cartItem.deliveryOptionId === "1"
        ? 7
        : cartItem.deliveryOptionId === "2"
        ? 3
        : 1;
    if (product) {
      const today = dayjs();
      const deliveryDate = today.add(x, "day");
      const deliveryDateString = deliveryDate.format("dddd,MMMM D");
      checkoutHtml += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date js-delivery-date">
              Delivery date: ${deliveryDateString}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image" src="${product.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${product.name}
                </div>
                <div class="product-price">
                  ${formatPrice(product.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label">${
                      cartItem.quantity
                    }</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link" data-product-id="${
                    product.id
                  }" >
                    Update
                  </span>
                  <input type="number" class="quantity-input ">
                  <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id="${
                    product.id
                  }" >
                  save
                  </span>    
                  <span class="delete-quantity-link link-primary js-delete-link
                  " data-product-id="${product.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
               
                ${deliveryOptionsHtml(product.id, cartItem)}
               
              </div>
            </div>
          </div>`;
    }
  });
  function deliveryOptionsHtml(productId, cartItem) {
    let html = "";

    deliveryOptions.forEach((deliveryOptions) => {
      const today = dayjs();
      const deliveryDate = today.add(deliveryOptions.deliveryDays, "day");
      const deliveryDateString = deliveryDate.format("dddd,MMMM D");
      const priceString =
        deliveryOptions.priceCents === 0
          ? "FREE"
          : formatPrice(deliveryOptions.priceCents);
      const isChecked = deliveryOptions.id === cartItem.deliveryOptionId;
      html += `<div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${
        deliveryOptions.id
      }">
                  <input type="radio" 
                   ${isChecked ? "checked" : ""}
                  class="delivery-option-input" 
                  name="delivery-option-${productId}">
                  <div>
                    <div class="delivery-option-date">
                     ${deliveryDateString}
                    </div>
                    <div class="delivery-option-price">
                      ${priceString} -Shipping
                    </div>
                  </div>
                </div>`;
    });

    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = checkoutHtml;

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.getAttribute("data-product-id");
      removeFromCart(productId);
      document.querySelector(`.js-cart-item-container-${productId}`).remove();
      updateCartQuantity();
      document.querySelector(
        ".js-cart-quantity-checkout"
      ).innerHTML = `${localStorage.getItem("cartQuantity")} items`;
    });
  });

  updateCartQuantity();
  document.querySelector(
    ".js-cart-quantity-checkout"
  ).innerHTML = `${localStorage.getItem("cartQuantity")} items`;

  document.querySelectorAll(".js-update-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.getAttribute("data-product-id");
      const x = document.querySelector(`.js-cart-item-container-${productId}`);
      x.classList.add("is-editing-quantity");
    });
  });
  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      const productId = link.getAttribute("data-product-id");
      // Select the input field for the quantity
      const input = document.querySelector(
        `.js-cart-item-container-${productId} .quantity-input`
      );
      const y = Number(input.value);
      if (y == 0) {
        removeFromCart(productId);
        document.querySelector(`.js-cart-item-container-${productId}`).remove();
        updateCartQuantity();
        document.querySelector(
          ".js-cart-quantity-checkout"
        ).innerHTML = `${localStorage.getItem("cartQuantity")} items`;
      } else if (y < 0) {
        alert("Quantity cannot be less than 0");
        return;
      } else {
        updateQuatity(productId, y);

        const quantityLabel = document.querySelector(
          `.js-cart-item-container-${productId} .quantity-label`
        );
        if (quantityLabel) {
          quantityLabel.textContent = y;
        }

        const x = document.querySelector(
          `.js-cart-item-container-${productId}`
        );
        x.classList.remove("is-editing-quantity");

        updateCartQuantity();
        document.querySelector(
          ".js-cart-quantity-checkout"
        ).innerHTML = `${localStorage.getItem("cartQuantity")} items`;
      }
    });
    const productId = link.getAttribute("data-product-id");
    const input = document.querySelector(
      `.js-cart-item-container-${productId} .quantity-input`
    );
    if (input) {
      input.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
          link.click();
        }
      });
    }
  });
  document.querySelectorAll(".js-delivery-option").forEach((option) => {
    option.addEventListener("click", () => {
      const { productId, deliveryOptionId } = option.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCheckout();
    });
  });
}
renderCheckout();
