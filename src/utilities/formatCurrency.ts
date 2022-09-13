const CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
  style: "currency",
  currency: "INR",
});

export const formatCurrency = (number: number) => {
  return CURRENCY_FORMATTER.format(number);
};
