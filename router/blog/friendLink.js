/**
 * 获取网站收藏信息的路由
 */

const express = require('express')
const router = express.Router();
const  { addFriendLink, if_friendLink, getFriendLinkInfo, getFriendLinkNum, 
    deleteFriendLinkInfo, deleteMoreFriendLinkInfo, editFriendLink, addInfoAbout, editInfoAbout, selectInfoAbout} = require('../../controller/blog/friendLink')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const getCurrentTime = require('../../util/getCurrentTime')

const getFriendLinkRouterHandle = router.post('/api/friendLink/addFriendLink', (req, res) => {
   // 解析 post 请求
   let link_name = req.body.link_name;
   let link_address = req.body.link_address;
   let link_introduce = req.body.link_introduce;
   let link_state = req.body.link_state;

   if_friendLink(link_name).then(friendLinkInfo => {
       if(friendLinkInfo[0]){
           const link_name_yes = new ErrorModel({
               tip: '此友链名已存在请修改后重试！',
               failTime: getCurrentTime()
           },"此友链名已存在请修改后重试！");
           res.status(201).send(link_name_yes);
       }else{
        addFriendLink(link_name, link_address, link_introduce, link_state).then( () => {
               const addFriendLink = new SuccessModel({
                   tip: '友链添加成功~！',
                   createTime: getCurrentTime()
               },'ok')
               res.send(addFriendLink)
           })
       }
   })
})
.post('/api/friendLink/getFriendLinkInfo', async(req, res) => {
   const currentPage = req.body.currentPage
   const pageSize = req.body.pageSize
   const link_name = req.body.link_name
   const link_address = req.body.link_address
   const link_state = req.body.link_state

   let total = await getFriendLinkNum();
   total = total[0]['COUNT(id)']
   getFriendLinkInfo(currentPage,pageSize, link_name, link_address, link_state).then( relust => {
       const friendLinkInfo = new SuccessModel({
           tip: '友链列表获取成功',
           time: getCurrentTime(),
           data: relust,
           paging:{
               currentPage:currentPage,
               pageSize:pageSize,
               total:total
           }
       },'ok')
       res.send(friendLinkInfo)
   })
}).post('/api/friendLink/deleteFriendLinkInfo', (req, res) => {
    let id = req.body.id
    deleteFriendLinkInfo(id).then( () => {
       const deleteFriendLinkInfo = new SuccessModel({
           time: getCurrentTime(),
           tip: `以删除id为${id}友链成功`
       },'ok')
       res.send(deleteFriendLinkInfo)
   })
}).post('/api/friendLink/deleteMoreFriendLinkInfo', (req, res) => {
   let idList = req.body

   deleteMoreFriendLinkInfo(idList).then( () => {
      const deleteMoreFriendLinkInfo = new SuccessModel({
          time: getCurrentTime(),
          tip: `友链删除成功！`
      },'ok')
      res.send(deleteMoreFriendLinkInfo)
  })
}).post('/api/friendLink/editFriendLink', (req, res) => {
    let id = req.body.id
    let link_name = req.body.link_name;
    let link_address = req.body.link_address;
    let link_introduce = req.body.link_introduce;
    let link_state = req.body.link_state;
    editFriendLink(id, link_name, link_address, link_introduce, link_state).then( () => {
       const editFriendLink = new SuccessModel({
           tip:'友链修改成功',
           time: getCurrentTime()
       },'OK')
       res.send(editFriendLink);
   })
   
}).post('/api/info/addInfoAbout', (req, res) => {
    let info_sign = req.body.info_sign;
    let info_nickname = req.body.info_nickname;
    let info_avatar = req.body.info_avatar;
    let info_book = req.body.info_book;
    let info_address = req.body.info_address;
    let info_job = req.body.info_job;
    let info_hobby = req.body.info_hobby;
    let info_about = req.body.info_about;

    addInfoAbout(info_sign, info_nickname, info_avatar, info_book, info_address, info_job, info_hobby, info_about).then( () => {
       const addInfoAbout = new SuccessModel({
           tip:'我的信息添加成功',
           time: getCurrentTime()
       },'OK')
       res.send(addInfoAbout);
   })
   
}).post('/api/info/editInfoAbout', (req, res) => {
    let id = req.body.id
    let info_sign = req.body.info_sign;
    let info_nickname = req.body.info_nickname;
    let info_avatar = req.body.info_avatar;
    let info_book = req.body.info_book;
    let info_address = req.body.info_address;
    let info_job = req.body.info_job;
    let info_hobby = req.body.info_hobby;
    let info_about = req.body.info_about;
    editInfoAbout(id, info_sign, info_nickname, info_avatar, info_book, info_address, info_job, info_hobby, info_about).then( () => {
       const editInfoAbout = new SuccessModel({
           tip:'我的信息修改成功',
           time: getCurrentTime()
       },'OK')
       res.send(editInfoAbout);
   })
   
}).post('/api/info/selectInfoAbout', (req, res) => {
    selectInfoAbout().then( (relust) => {
       const selectInfoAbout = new SuccessModel({
           tip:'我的信息查询成功',
           time: getCurrentTime(),
           data: relust,
       },'OK')
       res.send(selectInfoAbout);
   })
   
})

module.exports = getFriendLinkRouterHandle