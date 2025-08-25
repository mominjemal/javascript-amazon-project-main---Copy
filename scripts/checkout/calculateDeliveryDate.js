import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

export function calculateDeliveryDate(deliveryOptions) {
  const today = dayjs();
  let deliveryDate = today.add(deliveryOptions.deliveryDays, "day");
  if (deliveryDate.format("dddd") === "Saturday") {
    deliveryDate = deliveryDate.add(2, "day");
  } else if (deliveryDate.format("dddd") === "Sunday") {
    deliveryDate = deliveryDate.add(1, "day");
  }

  return deliveryDate.format("dddd,MMMM D");
}
