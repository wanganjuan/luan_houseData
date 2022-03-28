### 安装koa-generator
 执行
```
npm i koa-generator -g
koa2 myapp
```
创建工程myapp
### 安装sequelize相关连接mysql
安装sequelize 依赖 mysql2

```
npm install --save sequelize
npm install --save mysql2
npm install -g sequelize-cli
sequelize
或者
npm install --save sequelize-cli
node_modules/.bin/sequelize
```
执行：

```
sequelize init
```
生成模型目录：

==这里我们先移除种子文件以及迁移文件，暂时不用！==
修改config.json

```
"database": "koaDemo"
```
执行：

```
sequelize db:create
```
执行db:create 创建数据库
先手动在数据库创建2个表：
user 用户表
love 爱好表
安装：

```
npm i sequelize-auto
npm i mysql
```
新建auto.js

```
const SequelizeAuto = require('sequelize-auto')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const auto = new SequelizeAuto(config.database, config.username, config.password,
    {
        host: '127.0.0.1',      // 数据库服务器ip
        dialect: 'mysql',
        directory: './models',  // prevents the program from writing to disk
        port: '3306',           // 数据库运行端口
        additional: {
            timestamps: false
        }
    }
)
auto.run(function (err) {
    if (err) throw err;
});
```
生成符合model，修改lib


```
var upperTableName = tableName.substring(0,1).toUpperCase() + tableName.substring(1);
```

```
text[table] += spaces + "const" + spaces + upperTableName + spaces + "=" + spaces + "sequelize.define('" + upperTableName + "', {\n";
```

```
关键字：module.exports = function(sequelize, DataTypes
text[table] += ");\n";
      text[table] += spaces  + upperTableName + ".associate = function(models) {\n"
      text[table] += spaces  + "// associations can be defined here\n"
      text[table] += spaces  +  "};\n"
      text[table] += spaces  +  "return " + upperTableName + "\n};\n"
```
这样就生成符合格式的model
执行第一个数据库查询语句

```
const Models = require('../models');
router.get('/', async (ctx) => {
  let rs = await Models.User.findAndCountAll({
      limit: 3,
      offset: 0
  })
  ctx.body = {
    code: 0,
    count: rs.count,
    data: rs
  }
})
```
关联查询：

```
MessageModel.belongsTo(UserModel, {
        foreignKey: 'uid'
    });

    let data2 = await MessageModel.findById(1, {
        include: [UserModel]
    });
```
这边也是：
关联已经在model定义的时候执行了！

```
User.hasMany(models.Content, {
			foreignKey: 'uid',
			as: 'list'
    });
```

```
include: [{ model: Models.Content, as: 'list'}]
```
get 请求：

```
router.get('/user', async (ctx) => {
  let rs = await Models.User.findAndCountAll({
      limit: 10,
      offset: 0,
      include: [{ model: Models.Content, as: 'list'}]
  })
  ctx.body = {
    code: 0,
    count: rs.count,
    data: rs
  }
})
```


```
curl localhost:3000/users/user
```
根据条件查询

```
$ curl localhost:3000/users/user?username=xiaowang
```

```
let {username} = ctx.query
    let rs = await Models.User.findOne({
      where: {
        username
      }
    })
```


post 请求：（新增数据）

```
$ curl -X POST localhost:3000/users/user -d  'username=wwwww&age=9999'
```


```
router.post('/user', async (ctx) => {
  await Models.User.create(ctx.request.body)
  await getUser(ctx)
})
```
put 请求（更新数据）

```
curl -X PUT localhost:3000/users/user -d  'username=pppp123123&id=1'
```

```
router.put('/user', async (ctx) => {
  let {username, id} = ctx.request.body
  await Models.User.update({
    username
  }, {
    where: {
      id
    }
  })
  await getUser(ctx)
})
```
删除：

```
router.delete('/user/:id', async (ctx) => {
  let {id} = ctx.params
  await Models.User.destroy({
    where: {
      id
    }
  })
  await getUser(ctx)
})
```

```
curl -X DELETE localhost:3000/users/user/1
```
这样基本的增删该查都有了！

下一步就是对接typescript

洋葱圈模型
koa2 中间件模型。1 2 3 3 2 1