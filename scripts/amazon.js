import { cart } from "../data/cart-class.js";
import { loadProductsFetch } from "../data/products.js";

const products = await loadProductsFetch();

let productHtML = "";
cart.updateCartQuantity();
products.forEach((product) => {
  productHtML += `
     <div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="${product.getStarsUrl()}">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
        $${product.getPriceDollars()}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selecter-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          ${product.extraInfo()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-name="${
            product.name
          }" data-product-price="${product.getPriceDollars()}" data-product-id="${
    product.id
  }">
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector(".js-products-grid").innerHTML = productHtML;

const cartQuantity = Number(localStorage.getItem("cartQuantity"));
document.querySelector(".js-cart-quantity").innerHTML =
  cartQuantity > 0 ? cartQuantity : "";

function addAddedMessage(addedToCartElement) {
  let isTimerRunning = false;
  let setTimeoutId;
  let setTimeoutId2;
  if (!isTimerRunning) {
    clearTimeout(setTimeoutId2);

    addedToCartElement.style.opacity = "1";
    setTimeoutId = setTimeout(() => {
      addedToCartElement.style.opacity = "0";
      isTimerRunning = false;
    }, 2000);
    isTimerRunning = true;
  } else {
    isTimerRunning = false;
    clearTimeout(setTimeoutId);
    setTimeoutId2 = setTimeout(() => {
      addedToCartElement.style.opacity = "0";
    }, 2000);
  }
}

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener("click", () => {
    // formatPrice();
    const productId = button.dataset.productId;
    const selectElement = document.querySelector(
      `.js-quantity-selecter-${productId}`
    );
    const addedToCartElement = document.querySelector(
      `.js-added-to-cart-${productId}`
    );
    const selectedQuantity = selectElement ? Number(selectElement.value) : 1;
    cart.addToCart(selectedQuantity, productId);
    cart.updateCartQuantity();
    const cartQuantity = Number(localStorage.getItem("cartQuantity"));
    document.querySelector(".js-cart-quantity").innerHTML =
      cartQuantity > 0 ? cartQuantity : "";
    addAddedMessage(addedToCartElement);
  });
});

//loadProducts(renderProducts);
