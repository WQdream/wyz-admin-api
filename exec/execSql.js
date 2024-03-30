/**
 * 
 */
// 引入mysql
const mysql = require('mysql')
let connection = '';

const { MYSQL_CONF } = require('../config/db')


const execSql = (sql) => {
    function handleDisconnection() {

        connection = mysql.createConnection(MYSQL_CONF)

        connection.connect(function (err) {
            if (err) {
                setTimeout('handleDisconnection()', 2000);
            }
        });

        connection.on('error', function (err) {
            console.log('db error', err);
            if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                console.log('db error执行重连:' + err.message);
                handleDisconnection();
            } else {
                throw err;
            }
        });
    }

    handleDisconnection()
    const promise = new Promise((resolve, reject) => {
        connection.query(sql, (err, data) => {
            if (err) {
                reject(err)
                return
            }
            resolve(data)
        })
    })
    return promise
}

module.exports = execSql
