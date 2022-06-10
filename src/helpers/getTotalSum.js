export const getTotal = (items) => {
  if (items.length > 1) {
    return items
      .map((item) => {
        return item.price * item.quantity
      })
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
      .toLocaleString("en-US")
  } else {
    return (items[0].quantity * items[0].price)
      .toFixed(2)
      .toLocaleString("en-US")
  }
}
