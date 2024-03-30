/**
 * 数据库配置
 */

// node 进程，判断当前环境为开发环境还是生产环境
const env = process.env.NODE_ENV

var MYSQL_CONF

if(env === 'dev'){
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        database: 'software',
        user: 'root',
        password: 'root'
    }
}

else if(env === 'production'){
    MYSQL_CONF = {
        host: 'localhost',
        port: '3306',
        database: 'blog',
        user: 'root',
        password: 'root'
    }
}

module.exports = {
    MYSQL_CONF
}