export const formatMoney = (price) => {
  return Number(price?.toFixed(2).toLocaleString("en-US"))
}
