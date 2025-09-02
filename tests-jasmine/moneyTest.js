import { formatPrice } from "../scripts/util/money.js";

describe("test suite: formatPrice", () => {
  it("converts positive amounts with cents correctly", () => {
    expect(formatPrice(1234.5)).toEqual("12.35");
    expect(formatPrice(1000000)).toEqual("10000.00");
    expect(formatPrice(0.99)).toEqual("0.01");
  });

  it("handles zero correctly", () => {
    expect(formatPrice(0)).toEqual("0.00");
  });

  it("handles edge cases", () => {
    expect(formatPrice(999.999)).toEqual("10.00"); // or whatever rounding behavior you expect
    expect(formatPrice(0.001)).toEqual("0.00"); // or "$0.01" depending on rounding
  });
});
