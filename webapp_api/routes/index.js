var express = require('express');
var router = express.Router();
var db = require("../api/db"); //引入数据库封装模块
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express' });
// });

router.get('/', function(req, res, next) {

  //查询users表
  db.query("SELECT * FROM student",[],function(results,fields){
    console.log(results);
    // console.log(fields)
    // res.render('index', { title: 'Express  hellow' });
    res.send(results);
  })
  
});
module.exports = router;
