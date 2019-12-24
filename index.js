const express = require("express")
const app = express()
app.use(express.static('public'));  
const server = app.listen(3001, function(){
  console.log('server is running on port %d', 3001)
})