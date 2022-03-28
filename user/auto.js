const SequelizeAuto = require('sequelize-auto')
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];
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