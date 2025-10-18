import { formatPrice } from "../scripts/util/money.JS";

class Product {
  id;
  image;
  name;
  rating;
  priceCents;
  keywords;
  constructor(productDetails) {
    this.id = productDetails.id;
    this.image = productDetails.image;
    this.name = productDetails.name;
    this.rating = productDetails.rating;
    this.priceCents = productDetails.priceCents;
    this.keywords = productDetails.keywords;
  }
  getStarsUrl() {
    return `images/ratings/rating-${this.rating.stars * 10}.png`;
  }
  getPriceDollars() {
    return formatPrice(this.priceCents);
  }
  extraInfo() {
    return ``;
  }
}

class Clothing extends Product {
  sizeChartLink;
  constructor(productDetails) {
    super(productDetails);
    this.sizeChartLink = productDetails.sizeChartLink;
  }
  extraInfo() {
    return `<a href="${this.sizeChartLink}" type="_blanck">Size chart</a>`;
  }
}
const cloth = new Clothing({
  id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
  image: "images/products/adults-plain-cotton-tshirt-2-pack-teal.jpg",
  name: "Adults Plain Cotton T-Shirt - 2 Pack",
  rating: {
    stars: 4.5,
    count: 56,
  },
  priceCents: 799,
  keywords: ["tshirts", "apparel", "mens"],
  type: "clothing",
  sizeChartLink: "images/clothing-size-chart.png",
});

export let products = [];
export function loadProducts(fun) {
  const xhr = new XMLHttpRequest();
  xhr.addEventListener("load", () => {
    products = JSON.parse(xhr.response);

    products = products.map((productDetails) => {
      if (productDetails.type === "clothing") {
        return new Clothing(productDetails);
      }
      return new Product(productDetails);
    });
    fun();
  });
  xhr.open("GET", "https://supersimplebackend.dev/products");
  xhr.send();
}

export function getProductById(productId) {
  return products.find((product) => product.id === productId);
}
