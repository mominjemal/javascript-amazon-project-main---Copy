export const deliveryOptions = [
  {
    id: "1",
    deliveryDays: 7,
    priceCents: 0,
  },
  {
    id: "2",
    deliveryDays: 3,
    priceCents: 499,
  },
  {
    id: "3",
    deliveryDays: 1,
    priceCents: 999,
  },
];
export function getDeliveryOptionById(optionId) {
  return (
    deliveryOptions.find((option) => option.id === optionId) ||
    deliveryOptions[0]
  );
}
