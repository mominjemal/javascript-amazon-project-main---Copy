import {
  cart,
  removeFromCart,
  updateCartQuantity,
  updateQuatity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatPrice } from "./util/money.js";
let checkoutHtml = "";

cart.forEach((cartItem) => {
  const product = products.find((product) => product.id === cartItem.id);

  if (product) {
    checkoutHtml += `
        <div class="cart-item-container js-cart-item-container-${product.id}">
            <div class="delivery-date">
              Delivery date: Tuesday, June 21
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
                <div class="delivery-option">
                  <input type="radio" checked="" class="delivery-option-input" name="delivery-option-${
                    product.id
                  }">
                  <div>
                    <div class="delivery-option-date">
                      Tuesday, June 21
                    </div>
                    <div class="delivery-option-price">
                      FREE Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input" name="delivery-option-${
                    product.id
                  }">
                  <div>
                    <div class="delivery-option-date">
                      Wednesday, June 15
                    </div>
                    <div class="delivery-option-price">
                      $4.99 - Shipping
                    </div>
                  </div>
                </div>
                <div class="delivery-option">
                  <input type="radio" class="delivery-option-input" name="delivery-option-${
                    product.id
                  }">
                  <div>
                    <div class="delivery-option-date">
                      Monday, June 13
                    </div>
                    <div class="delivery-option-price">
                      $9.99 - Shipping
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>`;
  }
});
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

      const x = document.querySelector(`.js-cart-item-container-${productId}`);
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
