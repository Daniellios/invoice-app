export const getTotal = (items) => {
  if (items.length > 1) {
    return items
      .map((item) => {
        return item.price * item.quantity
      })
      .reduce((prev, curr) => prev + curr)
      .toFixed(2)
      .toLocaleString("en-US")
  }
  if (items) {
    return (
      items[0]?.quantity *
        items[0]?.price?.toFixed(2).toLocaleString("en-US") || 0
    )
  } else {
    return (0).toFixed(2).toLocaleString("en-US")
  }
}
