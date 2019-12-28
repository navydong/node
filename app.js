const express = require("express")
const path = require('path')
const sqlService = require('./store')
const task = require('./task')
const { storyRouter } = require('./route')

const app = express()
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, 'pages', 'dist')));
//设置允许跨域访问该服务.
app.all('*', function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});


app.get('/', function (req, res) {
  // task.mi()
  res.send('Hello Donghaijun')
})
app.use('/story', storyRouter)
app.get('/api/xiaomi/query', function (req, res) {
  const sql = 'SELECT * FROM xiaomi WHERE del = 0'
  sqlService.query(sql).then(row => {
    res.send({
      code: 200,
      message: 'success',
      data: row
    })
  }).catch(err => {
    res.send({
      code: 500,
      message: err
    })
  })
})
app.get('/api/xiaomi/query/:id', function (req, res) {
  const id = req.params.id
  const sql = `SELECT * FROM xiaomi WHERE id = ${id}`
  sqlService.query(sql).then(row => {
    res.send({
      code: 200,
      message: 'success',
      data: row
    })
  })
})
app.get('/api/xiaomi/delete/:id?', function (req, res) {
  const id = req.params.id
  if (id === undefined) {
    res.send({
      code: 500,
      message: 'id不能为空'
    })
    return
  }
  const sql = `UPDATE xiaomi SET del = 1 WHERE id = ${id}`
  sqlService.query(sql).then(row => {
    res.send({
      code: 200,
      message: row.affectedRows === 1 ? 'success' : 'fail'
    })
  })
})




const server = app.listen(3000, function () {
  console.log('server is running on port %d', 3000)
})