function formatPrice(price){
  let coin = new Intl.NumberFormat('en-US').format(price)
  return `© ${coin}`
}

module.exports = formatPrice