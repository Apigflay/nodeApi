var express = require('express');
var router = express.Router();
var db = require("../api/db"); //引入数据库封装模块
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/', function(req, res, next) {
//   console.log(req.query.id)
//   // console.log(res)
//   // console.log(next)
//   //查询users表
//   db.query("SELECT * FROM student",[],function(results,fields){
//     console.log(results);
//     // console.log(fields)
//     // res.render('index', { title: 'Express  hellow' });
//     if(req.query.id==1){
//       var a ='1';
//       res.send(a);
//     }else{
//       res.send(results);
//     }
    
//   })
  
// });
module.exports = router;
