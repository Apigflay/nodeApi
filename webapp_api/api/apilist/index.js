var express = require('express');
var router = express.Router();
var db = require("../db"); //引入数据库封装模块
var cryptojs = require('../../lib/js/GlobalFunction.js');//加密模块

/* GET index page. */

router.get('/', function(req, res, next) {
//   console.log(req)
//   console.log(res)
//   console.log(next)
  //查询users表\
  var a = JSON.stringify({"id":1});
  console.log(a);
  var b = JSON.parse(a);
  console.log(b)

  console.log('即将解密')
  console.log(JSON.parse(cryptojs.decrypt(decodeURIComponent(req.query.params))))
  console.log(cryptojs.decrypt(decodeURIComponent(req.query.params)))
  db.query("SELECT * FROM student",[],function(results,fields){
    console.log(results);
    // console.log(fields)
    // res.render('index', { title: 'Express  hellow' });
    if(req.query.id==1){
      var a ='1';
      res.send(a);
    }else{
      res.send(results);
    }
    
  })
  
});

/* GET index page. */

router.post('/po', function(req, res, next) {
  // console.log(req.body)
//   console.log(res)
//   console.log(next)
    //查询users表
     var params = JSON.parse(cryptojs.decrypt(decodeURIComponent(req.body.params)));
     console.log(params)
    db.query("SELECT * FROM student where username="+params.accountNumber+" and passwords="+params.password,[],function(results,fields){
    console.log(results);
    // console.log(fields)
    // res.render('index', { title: 'Express  hellow' });

    if(req.query.id==1){
        var a ='1';
        res.send(a);
    }else{
        res.send(results);
    }
    
    })
    
});

module.exports = router;
