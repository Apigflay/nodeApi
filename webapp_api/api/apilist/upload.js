var express = require('express');
var router = express.Router();
var db = require("../db"); //引入数据库封装模块
var GlobalFunction = require('../../lib/js/GlobalFunction.js');//加密模块
//上传图片必备中间件及文件夹
const multer = require('multer')
const upload = multer({dest: __dirname + '../../uploads'})
/* GET index page. */

router.get('/', function(req, res, next) {
//   console.log(req)
//   console.log(res)
//   console.log(next)
  //查询users表
  var params = JSON.parse(GlobalFunction.decrypt(decodeURIComponent(req.query.params)));
  var sqlStr = "SELECT * FROM users where username='"+params.accountNumber+"' and passwords='"+params.password+"'";
  console.log(sqlStr)
  console.log(params)
  db.query(sqlStr,[],function(results,fields){
    console.log(results);
    if(results.length){
      res.send(GlobalFunction.suc100('欢迎',results));
    }else{
      res.send(GlobalFunction.err101('账号密码错误',results));
    }
  })
  
});

/* GET index page. */

router.post('/addPic',upload.single('file'), function(req, res, next) {
  // console.log(req.body)
  // console.log(req.file)
  console.log('get file------------------->')
  console.log(req.file)
//   console.log(res)
//   console.log(next)
const file = req.file
file.url = `http://localhost:3001/server/uploads/${file.originalname}`
// 

    //查询users表
    //  var params = JSON.parse(GlobalFunction.decrypt(decodeURIComponent(req.body.params)));
    //  var sqlStr = "SELECT * FROM users where username='"+params.accountNumber+"' and passwords='"+params.password+"'";
     var sqlStr = "SELECT * FROM users";
    //  console.log(sqlStr)
    //  console.log(params)
    db.query(sqlStr,[],function(results,fields){
      console.log(results);
      if(results.length){
        res.send(GlobalFunction.suc100('欢迎',results));
      }else{
        res.send(GlobalFunction.err101('账号密码错误',results));
      }
    
    })
    
});

module.exports = router;
