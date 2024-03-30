/**
 * 获取友链信息路由对数据库操作的语句
 */

const execSql = require('../../exec/execSql')
const {nanoid} = require('nanoid')
const getCurrentTime = require('../../util/getCurrentTime')


// 添加友链
const addFriendLink = (link_name, link_address, link_introduce, link_state) => {
   let id = nanoid();
   let sql = `insert into friend_link (id, link_name, link_address,link_introduce, link_state,
                create_time, update_time)
                 values ("${id}", "${link_name}", "${link_address}", "${link_introduce}", "${link_state}", "${getCurrentTime()}", "${getCurrentTime()}");`
   return execSql(sql)
}

const if_friendLink =  (link_name) => {
  // 查询友链是否存在是否存在 sql
  let if_friendLink_sql = `SELECT * FROM friend_link WHERE link_name = "${link_name}"`
  return execSql(if_friendLink_sql)
}


// 获取友链并做分页
const getFriendLinkInfo =  (currentPage,pageSize,link_name, link_address, link_state) => {
    let args = {
        currentPage,
        pageSize,
        link_name,
        link_address,
        link_state
    }
    // 处理sql函数
    let sql = $util.paginationQuery(args,'friend_link')
    return execSql(sql)
}

// 获取友链表的数据总条数
const getFriendLinkNum =  () => {
   //  let sql = `SELECT * FROM p_admin_user`
    let sql = `SELECT COUNT(id) FROM friend_link;`
    return execSql(sql)
}


// 根据id删除友链
const deleteFriendLinkInfo = (id) => {
    let sql = `DELETE FROM friend_link WHERE id = "${id}"`
    return execSql(sql);
}

// 批量删除友链
const deleteMoreFriendLinkInfo = (idList) => {
   // let idString = idList.join(",")
   let idString = ""
   for(let i in idList){
       idString += `'${idList[i]}'${parseInt(i)+1<idList.length?',':""}`
   }
   let sql = `DELETE FROM friend_link WHERE id IN (${idString})`
   return execSql(sql);
}

// 编辑友链
const editFriendLink =  (id, link_name, link_address, link_introduce, link_state) => {

    let sql = `UPDATE friend_link SET link_name = "${link_name}",link_address = "${link_address}",link_introduce = "${link_introduce}",link_state = "${link_state}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
    return execSql(sql)
}   

// 添加关于
const addInfoAbout = (info_sign, info_nickname, info_avatar, info_book, info_address, info_job, info_hobby, info_about) => {
    let id = nanoid();
    let sql = `insert into b_info (id, info_sign, info_nickname,info_avatar, info_book,
        info_address,info_job,info_hobby,info_about,create_time, update_time)
                  values ("${id}", "${info_sign}", "${info_nickname}", "${info_avatar}", "${info_book}", "${info_address}", "${info_job}", "${info_hobby}", "${info_about}","${getCurrentTime()}", "${getCurrentTime()}");`
    return execSql(sql)
 }

// 编辑关于
const editInfoAbout =  (id, info_sign, info_nickname, info_avatar, info_book, 
                        info_address, info_job, info_hobby, info_about) => {
    let sql = `UPDATE b_info SET info_sign = "${info_sign}",info_nickname = "${info_nickname}",
    info_avatar = "${info_avatar}",info_book = "${info_book}",info_address = "${info_address}",
    info_job = "${info_job}",info_hobby = "${info_hobby}",info_about = "${info_about}",update_time = "${getCurrentTime()}" WHERE id = "${id}"`
    return execSql(sql)
}   

// 查询关于
const selectInfoAbout = () => {
    let sql = `select * from b_info`
    return execSql(sql)
}
module.exports = {
    addFriendLink,
    if_friendLink,
    getFriendLinkInfo,
    getFriendLinkNum,
    deleteFriendLinkInfo,
    deleteMoreFriendLinkInfo,
    editFriendLink,
    addInfoAbout,
    editInfoAbout,
    selectInfoAbout
}