const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require("jsonwebtoken");
const fs = require("fs");

// 引用配置文件db.js连接数据库
const db = require('./config/db.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.all('*', (req, res, next) => {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header('Access-Control-Allow-Origin', '*');
  //允许的header类型
  res.header('Access-Control-Allow-Headers', 'content-type');
  //跨域允许的请求方式
  res.header('Access-Control-Allow-Methods', 'DELETE,PUT,POST,GET,OPTIONS');
  if (req.method.toLowerCase() === 'options') {
    res.send(200)
  } else {
    next()
  }
})

// 登录用户
app.post('/login', (req, res) => {
  db.query('SELECT * FROM admin WHERE username = "' + req.body.username + '"AND password = "' + req.body.password + '"', null, (err, docs) => {
    if (err) {
      console.log(err)
      return;
    }
    if (docs.length > 0) {
      let content = {
        uname: req.body.username
      }
      let secretOrPrivateKey = "suiyi"
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 24 // 24小时过期
      });

      //token写入数据库docs[0].token = token
      db.query('UPDATE admin SET token = "' + token + '"WHERE username ="' + req.body.username + '"', null, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        res.send({
          code: 200,
          msg: '登录成功',
          data: docs[0],
          token: token   //返回token~
        })
      })

    } else {
      res.send({
        code: 0,
        msg: '登录失败',
        data: docs
      })
    }
  })
})

// 注册用户
app.post('/register', (req, res) => {
  db.query('INSERT INTO admin (id, username, password) VALUES (' + new Date().getTime() + ',"' + req.body.username + '","' + req.body.password + '")', null, (err, docs) => {
    if (err) {
      console.log(err)
      return;
    }

    if (docs) {
      let content = {
        uname: req.query.username
      }
      let secretOrPrivateKey = "suiyi" // 这是加密的key（密钥）
      let token = jwt.sign(content, secretOrPrivateKey, {
        expiresIn: 60 * 60 * 24 // 24小时过期
      });
      //token写入数据库docs[0].token = token
      db.query('UPDATE admin SET token="' + token + '"WHERE username="' + req.body.username + '"', null, (err, result) => {
        if (err) {
          console.log(err)
          return;
        }
        res.send({
          code: 200,
          msg: '注册成功',
          data: result,
          token: token
        })
      })
    } else {
      res.send({
        code: 0,
        msg: '注册失败',
        data: docs
      })
      return
    }
  })
})

// 退出登录，重置用户token
app.post('/loginOut', (req, res) => {
  db.query('UPDATE admin SET token="" WHERE id = "' + req.body.id + '"', null, (err, result) => {
    if (err) {
      console.log(err)
      return
    }

    res.send({
      code: 200,
      msg: '退出成功',
      data: result
    })
  })
})

// 查询用户信息
app.get('/userInfo', (req, res) => {
  db.query('SELECT * FROM admin WHERE', null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }
    res.send({
      msg: '获取user信息',
      code: 200,
      data: result
    })
  })
})

// 获取菜单列表
app.post('/getMenus', (req, res) => {
  db.query('SELECT * FROM menus ORDER BY `index` ASC', null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }
    res.send({
      msg: '获取menu列表',
      code: 200,
      data: result
    })
  })
})

// 获取二级菜单列表
app.post('/getSecondMenus', (req, res) => {
  db.query('SELECT * FROM menus_second WHERE parent_index=' + req.body.parent_index, null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }

    res.send({
      msg: '获取menu二级列表',
      code: 200,
      data: result
    })
  })
})

// 获取待办事项
app.post('/getTodoList', (req, res) => {
  db.query('SELECT * FROM todolist ORDER BY `id` ASC', null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }

    res.send({
      msg: '获取todolist',
      code: 200,
      data: result
    })
  })
})

// 新增待办事项
app.post('/addTodo', (req, res) => {
  db.query('INSERT INTO todolist (title) VALUES ("' + req.body.title + '")', null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }

    res.send({
      msg: '事项新增成功',
      code: 200,
      data: result
    })
  })
})

// 删除待办事项
app.post('/delTodo', (req, res) => {
  db.query('DELETE FROM todolist WHERE id = ' + req.body.id, null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }

    res.send({
      msg: '事项已删除',
      code: 200,
      data: result
    })
  })
})

// 编辑待办事项
app.post('/editTodo', (req, res) => {
  let sql = ''
  if(req.body.title.length) {
    sql = 'UPDATE todolist SET isdone=' + req.body.isdone + ', title="' + req.body.title + '" WHERE id = ' + req.body.id
  } else {
    sql = 'UPDATE todolist SET isdone=' + req.body.isdone + ' WHERE id = ' + req.body.id
  }
  db.query(sql, null, (err, result) => {
    if (err) {
      console.log(err)
      return;
    }

    res.send({
      msg: '事项更新成功',
      code: 200,
      data: result
    })
  })
})


var server = app.listen(3000, () => {
  console.log('isRunning........')
})