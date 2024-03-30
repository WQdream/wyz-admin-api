/**
 * 获取管理员信息路由对数据库操作的语句
 */

 const execSql = require('../../exec/execSql')
 const {nanoid} = require('nanoid')
 const md5 = require('md5')
 const {encrypt, decrypt} = require('../../util/crypt')
 const getCurrentTime = require('../../util/getCurrentTime')


 // 创建管理员
 const createGly = (user_name, user_password, user_profile, nick_name, user_intro) => {
    // 根据 group 去 area 表中查询相关 group_id
    let id = nanoid();
    let pwd = encrypt(user_password);
    let sql = `insert into b_admin_user (id, user_name, user_password, user_profile, 
                 nick_name, user_intro, create_time, update_time)
                  values ("${id}", "${user_name}", "${pwd}", "${user_profile}",
                   "${nick_name}", "${user_intro}", "${getCurrentTime()}", "${getCurrentTime()}");`
    return execSql(sql)
}

const if_user =  (user_name) => {
   // 查询用户是否存在 sql
   let userSql = `SELECT * FROM b_admin_user WHERE user_name = "${user_name}"`
   return execSql(userSql)
}

 
 // 获取管理员并做分页
 const getGlyInfo =  (currentPage,pageSize,userName,nickName) => {
    let ifWhere = ''
    let ifAnd = ''
    let ifUserName = ''
    let ifNickName = ''
    if(userName || nickName){
        ifWhere = 'WHERE'
    }if(userName && nickName){
        ifAnd = 'AND'
    }if(userName){
        ifUserName = `user_name like '%${userName}%'`
    }if(nickName){
        ifNickName = `nick_name like '%${nickName}%'`
    }
    if(currentPage < 1){
        currentPage = 1
    }
    let startrow = ((currentPage - 1) * pageSize)
    //  let sql = `SELECT * FROM b_admin_user`
     let sql = `Select * from b_admin_user ${ifWhere} ${ifUserName} ${ifAnd} ${ifNickName} 
     Order By create_time Desc limit ${startrow},${pageSize}`
     return execSql(sql)
 }

 // 获取管理员表的数据总条数
 const getGlyNum =  () => {
    //  let sql = `SELECT * FROM b_admin_user`
     let sql = `SELECT COUNT(id) FROM b_admin_user;`
     return execSql(sql)
 }


// 根据id删除管理员
 const deleteGlyInfo = (id) => {
     let sql = `DELETE FROM b_admin_user WHERE id = "${id}"`
     return execSql(sql);
 }

 // 批量删除管理员
 const deleteMoreGlyInfo = (idList) => {
    // let idString = idList.join(",")
    let idString = ""
    for(let i in idList){
        idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
    }
    let sql = `DELETE FROM b_admin_user WHERE id IN (${idString})`
    return execSql(sql);
}

// 编辑管理员
 const editGlyInfo =  (id, nick_name, user_profile, user_intro) => {
 
     let sql = `UPDATE b_admin_user SET nick_name = "${nick_name}",  
     user_profile = "${user_profile}", user_intro = "${user_intro}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
     return execSql(sql)
 }   
 
 module.exports = {
    getGlyInfo,
    deleteGlyInfo,
    editGlyInfo,
    getGlyNum,
    deleteMoreGlyInfo,
    createGly,
    if_user
 }