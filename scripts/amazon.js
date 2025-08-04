import { cart } from "../data/cart.js";
import { products } from "../data/products.js";
let productHtML = "";
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
              src="images/ratings/rating-${product.rating.stars * 10}.png">
            <div class="product-rating-count link-primary">
                ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
        $${(product.priceCents / 100).toFixed(2)}
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

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" 
          data-product-name="${product.name}" data-product-price="${(
    product.priceCents / 100
  ).toFixed(2)}" data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>
    `;
});
document.querySelector(".js-products-grid").innerHTML = productHtML;

document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  let isTimerRunning = false;
  let setTimeoutId;
  let setTimeoutId2;
  button.addEventListener("click", () => {
    const productId = button.dataset.productId;
    // Get the select element for this product
    const selectElement = document.querySelector(
      `.js-quantity-selecter-${productId}`
    );
    const selectedQuantity = selectElement ? Number(selectElement.value) : 1;

    let matchingProduct;
    cart.forEach((item) => {
      if (item.id === productId) {
        matchingProduct = item;
      }
    });
    if (matchingProduct) {
      matchingProduct.quantity += selectedQuantity;
    } else {
      cart.push({
        id: productId,
        quantity: selectedQuantity,
      });
    }
    let cartQuantity = 0;
    cart.forEach((item) => {
      cartQuantity += item.quantity;
    });
    document.querySelector(".js-cart-quantity").innerHTML = cartQuantity;
    const addedToCartElement = document.querySelector(
      `.js-added-to-cart-${productId}`
    );

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
  });
});
