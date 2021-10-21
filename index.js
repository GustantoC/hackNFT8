const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 3000

app.set('view engine','ejs')
app.use(express.urlencoded({extended:true}))

app.use(express.static('public'));

app.use(router)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})