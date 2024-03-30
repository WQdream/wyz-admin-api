/**
 * 操作题目表
 */

 const execSql = require('../../exec/execSql')
 const {nanoid} = require('nanoid')
 const {encrypt, decrypt} = require('../../util/crypt')
 const getCurrentTime = require('../../util/getCurrentTime')
const { json } = require('body-parser')


 // 创建
 const SimComCreate = (q_bank_id, q_title, q_option, q_answer, q_type, q_explain) => {
    let id = nanoid();
    let sql = `insert into p_question_manage
                  values ("${id}", "${q_bank_id}", "${q_title}", "${q_option}",
                   "${q_answer}", "${q_type}", "${q_explain}", "${getCurrentTime()}", "${getCurrentTime()}");`
    return execSql(sql)
}

// 判断题目是否存在
const if_exist =  (q_title) => {
   // 查询用户是否存在 sql
   let commonSql = `SELECT * FROM p_question_manage WHERE q_title = "${q_title}"`
   return execSql(commonSql)
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