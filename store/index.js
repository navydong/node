const mysql = require("mysql")
// const connection = mysql.createConnection({
//   host: '39.96.10.141',
//   port: 3306,
//   user: 'base',
//   password: '123456',
//   database: 'base'
// })
// 建立连接池
const pool = mysql.createPool({
  host: '39.96.10.141',
  port: 3306,
  user: 'base',
  password: '123456',
  database: 'base',
  connectionLimit: 10
})

const connectCallback = function(err, connection){
  if (err) {
    console.log(err)
    return
  }
  console.log('连接建立')
  // 查询数据库
  connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    connection.release();
    if (err) throw err;
    console.log(rows)
    console.log('The solution is: ', rows[0].solution);
  });
  // 关闭连接
  // connection.end(function (err) {
  //   if (!err) {
  //     console.log('连接关闭')
  //   }
  // });
}
// pool.getConnection(connectCallback)

const endPool = function(){
  pool.end(function(){
    console.log('连接池关闭')
  })
}


const sqlServies = {
  query: function(sql, value){
    return new Promise((resolve, reject)=>{
      pool.getConnection((err, connection)=>{
        if(err){
          reject(err)
          return
        }
        connection.query(sql, value, (err, rows)=>{
          connection.release()
          if(err){
            reject(err)
            return
          }
          resolve(rows)
        })
      })
    })
  },
  endPool
}



module.exports = sqlServies
