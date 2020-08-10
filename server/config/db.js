var mysql = require('mysql')
// 创建数据库链接,并暴露为connection
module.exports = connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'test',
    port: '3306'
})

connection.connect((err) => {
    if(err) {
        console.log('---' + err)
        return;
    }
    console.log('---------数据库登录成功---------')
})