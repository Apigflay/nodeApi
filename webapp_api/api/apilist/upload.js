var express = require('express');
var fs = require('fs');
var path = require('path');
var router = express.Router();
const os = require('os');
///获取本机ip///
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}
const myHost = getIPAdress();
console.log(myHost)
var db = require("../db"); //引入数据库封装模块
var GlobalFunction = require('../../lib/js/GlobalFunction.js');//加密模块
//上传图片必备中间件及文件夹
const multer = require('multer')
const upload = multer({dest:path.join(__dirname,'../../uploads')});
// console.log(__dirname,__filename)//当前文件路径+文件名
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
  console.log(req.file.path)
  console.log('/uploads')
  var time = new Date().getTime();
// ------图片保存成功后更改名字 返回url 路径 req.file.filename req.file.originalname
fs.rename("uploads/"+req.file.filename,"uploads/"+time+'-'+req.file.originalname,function(err,data) {
  if(err) {
      console.log(err)
  }else{
      console.log("ok------------------------------------------保存并修改成功")
      var imgSrc =":3000/statics/"+time+'-' + req.file.originalname;
      var jsonData = {code:100,url:"/statics/"+time+'-' + req.file.originalname,ip:myHost+':3000'}
      res.send(jsonData);
  }

})


// 
  
//   console.log(res)
//   console.log(next)
// const file = req.file
// file.url = `http://localhost:3001/server/uploads/${file.originalname}`

// 

    //查询users表
    //  var params = JSON.parse(GlobalFunction.decrypt(decodeURIComponent(req.body.params)));
    //  var sqlStr = "SELECT * FROM users where username='"+params.accountNumber+"' and passwords='"+params.password+"'";
    //  var sqlStr = "SELECT * FROM users";
    //  console.log(sqlStr)
    //  console.log(params)
    // db.query(sqlStr,[],function(results,fields){
    //   console.log(results);
    //   if(results.length){
    //     res.send(GlobalFunction.suc100('欢迎',results));
    //   }else{
    //     res.send(GlobalFunction.err101('账号密码错误',results));
    //   }
    
    // })
    
});

module.exports = router;
