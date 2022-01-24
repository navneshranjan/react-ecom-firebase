const currencyFormat = (amount) => {
  return Intl.NumberFormat("en-IN", {
    currency: "INR",
    style: "currency",
  }).format(amount);
};
export default currencyFormat;
