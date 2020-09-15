# nodeApi

nodejs  for  vue   (from 0 to 1)

#环境安装

npm install -g express  

npm install -g express-generator

参数-g：表示全局安装

#生成项目

express -e webapp_api

参数 -e 就是说明用ejs引擎，demoName就是创建项目的目录

cd webapp_api   /  npm install     

注意创建成功后的提示，需要cd到项目目录，并执行npm install命令安装项目依赖项

#目录
bin：存放启动项目的脚本文件

node_modules：项目所有依赖的库，以及存放 package.json 中安装的模块，当你在 package.json 添加依赖的模块并安装后，存放在这个文件夹下

public：静态文件(css,js,img)

api: 接口类文件  只负责处理逻辑数据并返回 

routes：路由文件(MVC中的C,controller)  --做 render view 处理

views：页面文件( Ejs 模板)

app.js ： 核心文件，也是项目入口文件

package.json：存储着工程的信息及模块依赖app.js，应用核心配置文件（入口文件）

package-lock.json：记录当前状态下实际安装的各个npm package的具体来源和版本号。

#启动

npm start

#增加热更新

npm install nodemon -g --save-dev

注释：

　　　　-g：全局安装nodemon

npm install nodemon --save-dev　　　　--save-dev：安装到本项目的dev开发环境依赖下

新增nodemon.json文件

{
    "restartable": "rs",
    "ignore": [
        ".git",
        ".svn",
        "node_modules/**/node_modules"
    ],
    "verbose": true,
    "execMap": {
        "js": "node --harmony"
    },
    "watch": [
 
    ],
    "env": {
        "NODE_ENV": "development"
    },
    "ext": "js json"
}

#配置完成，执行

nodemon app

#连接数据库  mysql 使用sql语句查询  多表多数据采用sql查询

npm install mysql --save


<!-- // var mysql      = require('mysql');
// var connection = mysql.createConnection({
//   host     : 'qdm19942899.my3w.com',
//   user     : 'qdm19942899',
//   password : 'sql283251605.',
//   database : 'qdm19942899_db'
// });
 
// connection.connect();
 
// connection.query('SELECT * from student', function(err, data, fields) {
//   if (err) {
//     console.log(err);
//     return;
//   };
 
//   console.log(data);
// });
 
// connection.end(); -->

可用

# 改造 数据库连接  增 删 改 查 分页 搜索 排序  单表数据查询使用模型

# 新建数据库配置信息文件
module.exports = {
  host     : 'qdm19942899.my3w.com',
  user     : 'qdm19942899',
  password : 'sql283251605.',
  database : 'qdm19942899_db'
}

# 新建数据库查询文件

var mysql = require('mysql');
var dbConfig = require('./db.config'); 


module.exports = {
    query : function(sql,params,callback){
        //每次使用的时候需要创建链接，数据操作完成之后要关闭连接
        var connection = mysql.createConnection(dbConfig);        
        connection.connect(function(err){
            if(err){
                console.log('数据库链接失败');
                throw err;
            }
         //开始数据操作
        connection.query( sql, params, function(err,results,fields ){
           if(err){
                console.log('数据操作失败');
                throw err;
            }
            //将查询出来的数据返回给回调函数，这个时候就没有必要使用错误前置的思想了，因为我们在这个文件中已经对错误进行了处理，如果数据检索报错，直接就会阻塞到这个文件中
            callback && callback(JSON.parse(JSON.stringify(results)), JSON.parse(JSON.stringify(fields)));
            //results作为数据操作后的结果，fields作为数据库连接的一些字段，大家可以打印到控制台观察一下
                //停止链接数据库，必须再查询语句后，要不然一调用这个方法，就直接停止链接，数据操作就会失败
             connection.end(function(err){
                  if(err){
                      console.log('关闭数据库连接失败！');
                      throw err;
                  }
              });
           });
       });
    }
};

# GET 

var express = require('express');
var router = express.Router();
var db = require("../db"); //引入数据库封装模块
/* GET index page. */

router.get('/', function(req, res, next) {
//   console.log(req)
//   console.log(res)
//   console.log(next)
  //查询users表
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
//   console.log(req)
//   console.log(res)
//   console.log(next)
    //查询users表
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

module.exports = router;


# POST


# 加密 解密 的使用

commonjs 规范

const CryptoJS = require('../crypto-js/crypto-js.js'); 

module.exports = {
    encrypt,
    decrypt
}

var cryptojs = require('../../lib/js/GlobalFunction.js');//加密模块

# JSON.parse  JSON.stringfy 

npm install body-parser

body-parser - node.js 中间件，用于处理 JSON, Raw, Text 和 URL 编码的数据。
const bodyParser = require("body-parser");

// 使用 body-parser 中间
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

然后可以使用JSON.parse  JSON.stringfy

# cookie 使用

npm install cookie-parser --save
cookie-parser - 这就是一个解析Cookie的工具。通过req.cookies可以取到传过来的cookie，并把它们转成对象。

# multer 接口等文件处理
// console.log(__dirname,__filename)//当前文件路径+文件名

appjs 设置静态托管文件 
app.use('/statics', express.static(__dirname + '/uploads'))

#文件保存
npm install multer --save
multer - node.js 中间件，用于处理 enctype="multipart/form-data"（设置表单的MIME编码）的表单数据。

接口第二个参数增加  upload.single('file'),

//上传图片必备中间件及文件夹
var path = require('path');
const multer = require('multer')
const upload = multer({dest:path.join(__dirname,'../../uploads')});

console.log(req.file) // 为上传的文件

#文件编辑

var fs = require('fs');
var time = new Date().getTime();

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

#系统信息  获取本机ip

const os = require('os');
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

# 权限 及 分类 



https://www.cnblogs.com/ydam/p/10983572.html