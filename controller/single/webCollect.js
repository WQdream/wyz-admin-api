/**
 * 获取网站收藏信息路由对数据库操作的语句
 */

const execSql = require('../../exec/execSql')
const {nanoid} = require('nanoid')
const getCurrentTime = require('../../util/getCurrentTime')


// 创建收藏网站
const addWebSite = (web_title,web_site) => {
   let id = nanoid();
   let sql = `insert into web_collect (id, web_title, web_site, 
                create_time, update_time)
                 values ("${id}", "${web_title}", "${web_site}", "${getCurrentTime()}", "${getCurrentTime()}");`
   return execSql(sql)
}

const if_webTitle =  (web_title) => {
  // 查询网站标题是否存在 sql
  let if_webTitle_sql = `SELECT * FROM web_collect WHERE web_title = "${web_title}"`
  return execSql(if_webTitle_sql)
}


// 获取网站收藏并做分页
const getWebCollectInfo =  (currentPage,pageSize,web_title) => {
   let ifWhere = ''
   let ifWeb_title = ''
   if(web_title){
       ifWhere = 'WHERE'
   }if(web_title){
       ifWeb_title = `web_title like '%${web_title}%'`
   }
   if(currentPage < 1){
       currentPage = 1
   }
   let startrow = ((currentPage - 1) * pageSize)
   //  let sql = `SELECT * FROM p_admin_user`
    let sql = `Select * from web_collect ${ifWhere} ${ifWeb_title} 
    Order By create_time Desc limit ${startrow},${pageSize}`
    return execSql(sql)
}

// 获取网站收藏表的数据总条数
const getWebCollectNum =  () => {
   //  let sql = `SELECT * FROM p_admin_user`
    let sql = `SELECT COUNT(id) FROM web_collect;`
    return execSql(sql)
}


// 根据id删除网站收藏
const deleteWebCollectInfo = (id) => {
    let sql = `DELETE FROM web_collect WHERE id = "${id}"`
    return execSql(sql);
}

// 批量删除管理员
const deleteMoreWebCollectInfo = (idList) => {
   // let idString = idList.join(",")
   let idString = ""
   for(let i in idList){
       idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
   }
   let sql = `DELETE FROM web_collect WHERE id IN (${idString})`
   return execSql(sql);
}

// 编辑网站收藏
const editWebCollect =  (id, web_title, web_site) => {

    let sql = `UPDATE web_collect SET web_title = "${web_title}",  
    web_site = "${web_site}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
    return execSql(sql)
}   

module.exports = {
    addWebSite,
    if_webTitle,
    getWebCollectInfo,
    getWebCollectNum,
    deleteWebCollectInfo,
    deleteMoreWebCollectInfo,
    editWebCollect
}