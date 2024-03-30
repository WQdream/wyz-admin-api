/**
 * 获取网站收藏信息的路由
 */

const express = require('express')
const router = express.Router();
const  {addBlogTag, if_blogTag, getTagNameInfo, getBlogTagNum, deleteBlogTagInfo, deleteMoreBlogTagInfo, editBlogTag} = require('../../controller/blog/blogTag')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const getCurrentTime = require('../../util/getCurrentTime')

const getBlogTagRouterHandle = router.post('/api/blogTag/addBlogTag', (req, res) => {
   // 解析 post 请求
   let tag_name = req.body.tag_name;
   if_blogTag(tag_name).then(blogTagInfo => {
       if(blogTagInfo[0]){
           const tag_name_yes = new ErrorModel({
               tip: '此标签已存在请修改后重试！',
               failTime: getCurrentTime()
           },"网站添加失败创建失败！");
           res.status(201).send(tag_name_yes);
       }else{
        addBlogTag(tag_name).then( () => {
               const addBlogTag = new SuccessModel({
                   tip: '标签添加成功~！',
                   createTime: getCurrentTime()
               },'ok')
               res.send(addBlogTag)
           })
       }
   })
})
.post('/api/blogTag/getBlogTagInfo', async(req, res) => {
   const currentPage = req.body.currentPage
   const pageSize = req.body.pageSize
   const tag_name = req.body.tag_name
   let total = await getBlogTagNum();
   total = total[0]['COUNT(id)']
   getTagNameInfo(currentPage,pageSize, tag_name).then( relust => {
       const blogTagInfo = new SuccessModel({
           tip: '标签列表获取成功',
           time: getCurrentTime(),
           data: relust,
           paging:{
               currentPage:currentPage,
               pageSize:pageSize,
               total:total
           }
       },'ok')
       res.send(blogTagInfo)
   })
}).post('/api/blogTag/deleteBlogTagInfo', (req, res) => {
    let id = req.body.id
    deleteBlogTagInfo(id).then( () => {
       const deleteBlogTagInfo = new SuccessModel({
           time: getCurrentTime(),
           tip: `以删除id为${id}标签成功`
       },'ok')
       res.send(deleteBlogTagInfo)
   })
}).post('/api/blogTag/deleteMoreBlogTagInfo', (req, res) => {
   let idList = req.body.idList
   deleteMoreBlogTagInfo(idList).then( () => {
      const deleteMoreBlogTagInfo = new SuccessModel({
          time: getCurrentTime(),
          tip: `标签删除成功！`
      },'ok')
      res.send(deleteMoreBlogTagInfo)
  })
}).post('/api/blogTag/editBlogTag', (req, res) => {
    let id = req.body.id
    let tag_name = req.body.tag_name;
    editBlogTag(id, tag_name).then( () => {
       const editWebCollectSuccess = new SuccessModel({
           tip:'标签修改成功',
           time: getCurrentTime()
       },'OK')
       res.send(editWebCollectSuccess);
   })
   
})

module.exports = getBlogTagRouterHandle