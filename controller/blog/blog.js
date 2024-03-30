/**
 * 获取博客信息路由对数据库操作的语句
 */

const execSql = require('../../exec/execSql')
const {nanoid} = require('nanoid')
const getCurrentTime = require('../../util/getCurrentTime')


// 添加博客
const addBlog = (blog_title, blog_summary, blog_tag_id, blog_state, blog_content) => {
   let id = nanoid();
   let blog_contentNew = blog_content.replace(/'/g,"&#39")
   let sql = `insert into b_blog (id, blog_title, blog_summary, blog_tag_id, blog_recommend, blog_state, 
                blog_content, create_time, update_time)
                 values ("${id}", '${blog_title}', '${blog_summary}', '${blog_tag_id}', "0",
                 "${blog_state}",'${blog_contentNew}',"${getCurrentTime()}", "${getCurrentTime()}");`
   return execSql(sql)
}

const if_blogTitle =  (blog_title) => {
  // 查询博客标题是否存在是否存在 sql
  let if_blogTitle_sql = `SELECT * FROM b_blog WHERE blog_title = "${blog_title}"`
  return execSql(if_blogTitle_sql)
}


// 获取博客文章并做分页
const getBlogInfo =  (currentPage,pageSize,blog_title, blog_tag_id, blog_state) => {
    let args = {
        currentPage,
        pageSize,
        blog_title,
        blog_tag_id,
        blog_state
    }
    // 处理sql函数
    let sql = $util.paginationQuery(args,'b_blog')
    return execSql(sql)
}

// 获取博客表的数据总条数
const getBlogNum =  (blog_title, blog_tag_id, blog_state) => {
   //  let sql = `SELECT * FROM p_admin_user`
   let tagSql = ''
   let stateSql = ''
   if(blog_tag_id) {
    tagSql = ` and blog_tag_id like '%${blog_tag_id}%'`
   }
   if(blog_state) {
    stateSql = ` and blog_state = ${blog_state}`
   }
    let sql = `SELECT COUNT(id) FROM b_blog where blog_title like '%${blog_title}%' ${tagSql} ${stateSql};`
    return execSql(sql)
}


// 根据id删除博客
const deleteBlogInfo = (id) => {
    let sql = `DELETE FROM b_blog WHERE id = "${id}"`
    return execSql(sql);
}

// 批量删除博客
const deleteMoreBlogInfo = (idList) => {
   // let idString = idList.join(",")
   let idString = ""
   for(let i in idList){
       idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
   }
   let sql = `DELETE FROM b_blog WHERE id IN (${idString})`
   return execSql(sql);
}

// 编辑博客签
const editBlog =  (id, blog_title, blog_summary, blog_tag_id, blog_state, blog_content) => {

    let sql = `UPDATE b_blog SET blog_title = "${blog_title}", blog_summary = "${blog_summary}", blog_tag_id = "${blog_tag_id}", blog_state = "${blog_state}", blog_content = "${blog_content}", update_time = "${getCurrentTime()}" WHERE id = "${id}"`
    return execSql(sql)
}  

 // 修改展示状态切换
 const editIfRecommend = (id, if_show) => {
    let sql = `UPDATE b_blog SET blog_recommend=${if_show}
    WHERE id='${id}';`
    return execSql(sql)
 }

 // 根据id查询博文
 const getBlogInfoById =  (id) => {

    // 处理sql函数
    let sql = `select * from b_blog where id='${id}';`
    return execSql(sql)
}

module.exports = {
    addBlog,
    if_blogTitle,
    getBlogInfo,
    getBlogNum,
    deleteBlogInfo,
    deleteMoreBlogInfo,
    editBlog,
    editIfRecommend,
    getBlogInfoById
}