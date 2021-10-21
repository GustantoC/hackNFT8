function formatDate(date){
  return new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'medium' }).format(date)
}

module.exports = formatDate