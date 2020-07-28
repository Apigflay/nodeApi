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

routes：路由文件(MVC中的C,controller)

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

#连接数据库  mysql

npm install mysql --save

//---------测试代码----------
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

# 改造 数据库连接  增 删 改 查 分页 搜索 排序

