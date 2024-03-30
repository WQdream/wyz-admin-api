/**
 * 登录路由对数据库操作的语句
 */

const execSql = require('../exec/execSql') // 引入操作数据库的方法
const {encrypt, decrypt} = require('../util/crypt')


// 这个函数不用管
// const getUsers = (user_name, password) => {
//     let sql = `select * from user where 1=1 `
//     if(user_name && password){
//         sql += `and user_name='${user_name}' and password='${password}'`
//     }
//     // sql += `order by createtime decs`;
//     return execSql(sql)
// }

const login = (user_name, password) => {
    let pwd = encrypt(password)
    let sql = `select * from users where user_name='${user_name}' and user_password='${pwd}';`
    return execSql(sql)
}

const if_oldPwd =  (user_name,oldPwd) => {
    let pwd = encrypt(oldPwd)
    let sql = `select * from users where user_name='${user_name}' and user_password='${pwd}';`
    return execSql(sql)
  }

const editPwd = (user_name, password) => {
    let pwd = encrypt(password)
    let sql = `UPDATE users SET user_password = "${pwd}" where user_name='${user_name}';`
    return execSql(sql)
}

module.exports = {
    // getUsers,
    login,
    if_oldPwd,
    editPwd
}