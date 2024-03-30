/**
 * 操作用户表
 */

 const execSql = require('../../exec/execSql')
 const {nanoid} = require('nanoid')
 const {encrypt, decrypt} = require('../../util/crypt')
 const getCurrentTime = require('../../util/getCurrentTime')


 // 创建
 const SimComCreate = (user_name, user_password, user_profile, nick_name, user_intro, user_phone, gender, user_identity) => {
    let id = nanoid();
    let pwd = encrypt(user_password);
    let sql = `insert into p_common_user (id, user_name, user_password, user_profile, 
                 nick_name, user_intro, user_phone, gender, user_identity, create_time, update_time)
                  values ("${id}", "${user_name}", "${pwd}", "${user_profile}",
                   "${nick_name}", "${user_intro}", "${user_phone}", "${gender}", "${user_identity}", "${getCurrentTime()}", "${getCurrentTime()}");`
    return execSql(sql)
}

// 判断用户是否存在
const if_exist =  (user_name) => {
   // 查询用户是否存在 sql
   let userSql = `SELECT * FROM p_common_user WHERE user_name = "${user_name}"`
   return execSql(userSql)
}

 
 // 获取用户并做分页
 const SimComGetInfo =  function (currentPage, pageSize, user_name, nick_name, user_phone, gender, user_identity){
    let args = {
        currentPage,
        pageSize,
        user_name,
        nick_name,
        user_phone,
        gender,
        user_identity
    }
    // 处理sql函数
    let sql = $util.paginationQuery(args,'p_common_user')
     return execSql(sql)
 }

 // 获取用户表的数据总条数
 const SimComGetTotalNum =  () => {
    //  let sql = `SELECT * FROM p_admin_user`
     let sql = `SELECT COUNT(id) FROM p_common_user;`
     return execSql(sql)
 }


// 根据id删除管理员
 const SimComDeleteInfo = (id) => {
     let sql = `DELETE FROM p_common_user WHERE id = "${id}"`
     return execSql(sql);
 }

 // 批量删除管理员
 const SimComDeleteMoreInfo = (idList) => {
    // let idString = idList.join(",")
    let idString = ""
    for(let i in idList){
        idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
    }
    let sql = `DELETE FROM p_common_user WHERE id IN (${idString})`
    return execSql(sql);
}

// 编辑管理员
 const SimComEditInfo =  (id, nick_name, user_profile, user_intro, user_phone, gender, user_identity) => {
 
     let sql = `UPDATE p_common_user SET nick_name = "${nick_name}",  
     user_profile = "${user_profile}", user_intro = "${user_intro}", user_phone = "${user_phone}", 
     gender = "${gender}", user_identity = "${user_identity}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
     return execSql(sql)
 }   
 
 module.exports = {
    SimComCreate,
    if_exist,
    SimComGetInfo,
    SimComGetTotalNum,
    SimComDeleteInfo,
    SimComDeleteMoreInfo,
    SimComEditInfo
 }