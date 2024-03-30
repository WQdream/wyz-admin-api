/**
 * 激活码路由对数据库操作的语句
 */

const execSql = require('../exec/execSql')
const {nanoid} = require('nanoid')
const getCurrentTime = require('../util/getCurrentTime')


// 生成cdk
const addCdk = (count,due_time) => {

    let sqlInfo = ''
    for(let i =0; i < count; i++){
        let id = nanoid();
        let cdk = nanoid(16);
        sqlInfo = sqlInfo + `("${id}", "${cdk}", "${due_time}", "${getCurrentTime()}", "${getCurrentTime()}"),`
    }
    sqlInfo = sqlInfo.slice(0, -1)
    // return
   let sql = `insert into cdk (id, cdk, due_time, 
                create_time, update_time)
                 values ${sqlInfo};`
   return execSql(sql)
}



// 获取网站收藏并做分页
const getCdk =  (currentPage, pageSize, cdk, due_time, use_account) => {
    let args = {
        currentPage,
        pageSize,
        cdk,
        due_time,
        use_account
    }
    // 处理sql函数
    let sql = $util.paginationQuery(args,'cdk')
    return execSql(sql)
}

// 获取网站收藏表的数据总条数
const getCdkNum =  () => {
   //  let sql = `SELECT * FROM p_admin_user`
    let sql = `SELECT COUNT(id) FROM cdk;`
    return execSql(sql)
}


// 根据id删除网站收藏
const deleteCdk = (id) => {
    let sql = `DELETE FROM cdk WHERE id = "${id}"`
    return execSql(sql);
}

// 批量删除管理员
const deleteMoreCdk = (idList) => {
   // let idString = idList.join(",")
   let idString = ""
   for(let i in idList){
       idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
   }
   let sql = `DELETE FROM cdk WHERE id IN (${idString})`
   return execSql(sql);
}



module.exports = {
    addCdk,
    getCdk,
    getCdkNum,
    deleteCdk,
    deleteMoreCdk,
}