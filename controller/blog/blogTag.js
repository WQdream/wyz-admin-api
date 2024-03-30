/**
 * 获取标签信息路由对数据库操作的语句
 */

const execSql = require('../../exec/execSql')
const {nanoid} = require('nanoid')
const getCurrentTime = require('../../util/getCurrentTime')


// 添加标签
const addBlogTag = (tag_name) => {
   let b_tag_count = 0
   let id = nanoid();
   let sql = `insert into b_tag (id, b_tag_name, b_tag_count,
                create_time, update_time)
                 values ("${id}", "${tag_name}", "${b_tag_count}", "${getCurrentTime()}", "${getCurrentTime()}");`
   return execSql(sql)
}

const if_blogTag =  (tag_name) => {
  // 查询标签是否存在是否存在 sql
  let if_blogTag_sql = `SELECT * FROM b_tag WHERE b_tag_name = "${tag_name}"`
  return execSql(if_blogTag_sql)
}


// 获取标签并做分页
const getTagNameInfo =  (currentPage,pageSize,tag_name) => {
   let ifWhere = ''
   let ifTag_name = ''
   if(tag_name){
       ifWhere = 'WHERE'
       ifTag_name = `b_tag_name like '%${tag_name}%'`
   }
   if(currentPage < 1){
       currentPage = 1
   }
   let startrow = ((currentPage - 1) * pageSize)
   //  let sql = `SELECT * FROM p_admin_user`
    let sql = `Select * from b_tag ${ifWhere} ${ifTag_name} 
    Order By create_time Desc limit ${startrow},${pageSize}`
    return execSql(sql)
}

// 获取标签表的数据总条数
const getBlogTagNum =  () => {
   //  let sql = `SELECT * FROM p_admin_user`
    let sql = `SELECT COUNT(id) FROM b_tag;`
    return execSql(sql)
}


// 根据id删除标签
const deleteBlogTagInfo = (id) => {
    let sql = `DELETE FROM b_tag WHERE id = "${id}"`
    return execSql(sql);
}

// 批量删除标签
const deleteMoreBlogTagInfo = (idList) => {
   // let idString = idList.join(",")
   let idString = ""
   for(let i in idList){
       idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
   }
   let sql = `DELETE FROM b_tag WHERE id IN (${idString})`
   return execSql(sql);
}

// 编辑标签
const editBlogTag =  (id, tag_name) => {

    let sql = `UPDATE b_tag SET b_tag_name = "${tag_name}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
    return execSql(sql)
}   

module.exports = {
    addBlogTag,
    if_blogTag,
    getTagNameInfo,
    getBlogTagNum,
    deleteBlogTagInfo,
    deleteMoreBlogTagInfo,
    editBlogTag
}