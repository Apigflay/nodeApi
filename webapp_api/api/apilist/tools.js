var express = require('express');
var router = express.Router();
var db = require("../db"); //引入数据库封装模块
var GlobalFunction = require('../../lib/js/GlobalFunction.js');//加密模块

/* GET tools page. */

router.get('/', function(req, res, next) {
    var userIp = GlobalFunction.getClientIP(req);
    console.log(userIp,'--------------------11111111111111111')
    var sqlStr3 = "SELECT * FROM ipList";
    db.query(sqlStr3,[],function(results3,fields3){
        console.log(results3)
        if(results3.length){
            res.send({total:results3.length});
        }else{
            res.send({total:0});
        }
    })
    var sqlStr = "SELECT * FROM ipList where ip='"+userIp+"'";
    db.query(sqlStr,[],function(results,fields){
        if(results.length){//存在 则 返回所有数据
            console.log(results)
        // res.send({total:results.length});
        }else{//不存在则 插入数据
            var insertStr2 = "insert into ipList (ip) values ('"+userIp+"')"
            db.query(insertStr2,[],function(results2,fields2){
                console.log(results2)
            })
        
        }
    })
  
});

/* GET index page. */

router.post('/po', function(req, res, next) {
  // console.log(req.body)
//   console.log(res)
//   console.log(next)
    //查询users表
     var params = JSON.parse(GlobalFunction.decrypt(decodeURIComponent(req.body.params)));
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

module.exports = router;
