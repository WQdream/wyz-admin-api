/**
 * 题库管理对数据库操作的语句
 */

 const execSql = require('../../exec/execSql')  // 执行sql
 const md5 = require("md5")
 const {nanoid} = require('nanoid')
 const {encrypt, decrypt} = require('../../util/crypt')
 const getCurrentTime = require('../../util/getCurrentTime')


 
 // 获取题库（带分页）
 const getQuestionBank =  (currentPage,pageSize,q_name,if_show) => {
    let ifWhere = ''
    let ifAnd = ''
    let ifq_name = ''
    let ifif_show = ''
    if(q_name || if_show){
        ifWhere = 'WHERE'
    }if(q_name && if_show){
        ifAnd = 'AND'
    }if(q_name){
        ifq_name = `q_name like '%${q_name}%'`
    }if(if_show){
        ifif_show = `if_show like '%${if_show}%'`
    }
    if(currentPage < 1){
        currentPage = 1
    }
    let startrow = ((currentPage - 1) * pageSize)
    //  let sql = `SELECT * FROM p_admin_user`
     let sql = `Select * from p_question_bank ${ifWhere} ${ifq_name} ${ifAnd} ${ifif_show} 
     Order By create_time Desc limit ${startrow},${pageSize}`
     return execSql(sql)
 }
 // 获取题库表的数据总条数
 const getqBankNum =  () => {
    //  let sql = `SELECT * FROM p_admin_user`
     let sql = `SELECT COUNT(id) FROM p_question_bank;`
     return execSql(sql)
 }

 // 修改展示状态切换
 const editIfShow = (id, if_show) => {
    let sql = `UPDATE p_question_bank SET if_show=${if_show}
    WHERE id='${id}';`
    return execSql(sql)
 }

 // 添加题库
 const addQbank = (q_name) => {
    let sql = `INSERT INTO p_question_bank VALUES ('${nanoid()}','${q_name}','${getCurrentTime()}','${getCurrentTime()}','1');`
    return execSql(sql)
 }

// 删除题库
 const deleteQbank = (id) => {
     let sql = `DELETE FROM p_question_bank WHERE id = "${id}"`
     return execSql(sql);
 }

 // 批量删除题库
 const deleteMoreQbank = (idList) => {
    // let idString = idList.join(",")
    let idString = ""
    for(let i in idList){
        idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
    }
    let sql = `DELETE FROM p_question_bank WHERE id IN (${idString})`
    return execSql(sql);
}
// 编辑题库
const editQbank =  (id, q_name) => {
 
    let sql = `UPDATE p_question_bank SET q_name = "${q_name}",  
    update_time = "${getCurrentTime()}" WHERE id = "${id}"`
    return execSql(sql)
}   



// 根据id查询管理员
 const getGlyInfoFromId = (id) => {
     let sql = `SELECT * FROM user WHERE user_id = "${id}"`
     return execSql(sql);
 }

 const getGlyInfoFromMsg =async (user_name, nick_name, group) => {
        let sql = `SELECT * FROM user`
        // 判断 group 是否存在
        if (group){
            // 根据小区查询小区 id sql
            let group_sql = `SELECT area_id FROM area WHERE area_name = "${group}"`
            let group_idArr =await execSql(group_sql)
            // 获取小区 id
            var group_id = group_idArr[0].area_id
        }
        const paraList = [
                            {key:"user_name", value:user_name}, 
                            {key:"nick_name", value:nick_name}, 
                            {key:"group_id", value:group_id}
                        ];
        let newparaList = paraList.filter( item => {
            return item.value !== undefined
        })
        if(newparaList.length >= 1) {
            sql = sql + ` where ${newparaList[0].key} like "%${newparaList[0].value}%"`
        } if(newparaList.length >= 2) {
            sql = sql + ` and ${newparaList[1].key} like "%${newparaList[1].value}%"`
        } if(newparaList.length >= 3) {
            sql = sql + ` and ${newparaList[2].key} like "%${newparaList[2].value}%"`
        }
    return execSql(sql);
}

 const if_user =  (user_name) => {
    // 查询用户是否存在 sql
    let userSql = `SELECT * FROM user WHERE user_name = "${user_name}"`
    return execSql(userSql)
 }

 const editGlyInfo =  (id, nick_name, user_profile, user_intro) => {
 
     let sql = `UPDATE p_admin_user SET nick_name = "${nick_name}",  
     user_profile = "${user_profile}", user_intro = "${user_intro}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
     return execSql(sql)
 }   
 
 module.exports = {
    getQuestionBank,
    getqBankNum,
    editIfShow,
    addQbank,
    deleteQbank,
    deleteMoreQbank,
    editQbank,

    getGlyInfoFromId,
    editGlyInfo,
    if_user,
    getGlyInfoFromMsg,
 }