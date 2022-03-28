const SequelizeAuto = require('sequelize-auto')
const env = process.env.NODE_ENV || 'development';
let Models = require('./models')
const config = require(__dirname + '/config/config.json')[env];
const auto = new SequelizeAuto(config.database, config.username, config.password,
    {
        host: '119.45.40.245',      // 数据库服务器ip
        dialect: 'mysql',
        directory: './models',  // prevents the program from writing to disk
        port: '3306',           // 数据库运行端口
        additional: {
            timestamps: true
        }
    }
)
auto.run(function (err) {
    for (let key in  Models) {
        if (Models[key].sync) {
            Models[key].sync({
                alter: true //这将检查数据库中表的当前状态(它具有哪些列,它们的数据类型等),然后在表中进行必要的更改以使其与模型匹配.
              });
        }
    }
    if (err) throw err;
});

