/**
 * 获取网站收藏信息的路由
 */

const express = require('express')
const router = express.Router();
const  {addWebSite, if_webTitle, getWebCollectNum, getWebCollectInfo, deleteWebCollectInfo, deleteMoreWebCollectInfo, editWebCollect} = require('../../controller/single/webCollect')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const getCurrentTime = require('../../util/getCurrentTime')

const getWebCollectRouterHandle = router.post('/api/webCollect/addWebCollect', (req, res) => {
   // 解析 post 请求
   let web_title = req.body.web_title;
   let web_site = req.body.web_site;
   if_webTitle(web_title).then(webCollectInfo => {
       if(webCollectInfo[0]){
           const web_title_yes = new ErrorModel({
               tip: '此网站名称已存在请修改后重试！',
               failTime: getCurrentTime()
           },"网站添加失败创建失败！");
           res.status(201).send(web_title_yes);
       }else{
        addWebSite(web_title, web_site).then( () => {
               const addWebCollect = new SuccessModel({
                   tip: '网站添加成功成功~！',
                   createTime: getCurrentTime()
               },'ok')
               res.send(addWebCollect)
           })
       }
   })
})
.post('/api/webCollect/getWebCollectInfo', async(req, res) => {
   const currentPage = req.body.currentPage
   const pageSize = req.body.pageSize
   const web_title = req.body.web_title
   let total = await getWebCollectNum();
   total = total[0]['COUNT(id)']
   getWebCollectInfo(currentPage,pageSize, web_title).then( relust => {
       const glyInfo = new SuccessModel({
           tip: '网站列表获取成功',
           time: getCurrentTime(),
           data: relust,
           paging:{
               currentPage:currentPage,
               pageSize:pageSize,
               total:total
           }
       },'ok')
       res.send(glyInfo)
   })
}).post('/api/webCollect/deleteWebCollectInfo', (req, res) => {
    let id = req.body.id
    deleteWebCollectInfo(id).then( () => {
       const deleteWebCollectInfo = new SuccessModel({
           time: getCurrentTime(),
           tip: `以删除id为${id}网站成功`
       },'ok')
       res.send(deleteWebCollectInfo)
   })
}).post('/api/webCollect/deleteMoreWebCollectInfo', (req, res) => {
   let idList = req.body.idList
   deleteMoreWebCollectInfo(idList).then( () => {
      const deleteMoreWebCollectInfo = new SuccessModel({
          time: getCurrentTime(),
          tip: `网站删除成功！`
      },'ok')
      res.send(deleteMoreWebCollectInfo)
  })
}).post('/api/webCollect/editWebCollect', (req, res) => {
    let id = req.body.id
    let web_title = req.body.web_title;
    let web_site = req.body.web_site;
    editWebCollect(id, web_title, web_site).then( () => {
       const editWebCollectSuccess = new SuccessModel({
           tip:'网站修改成功',
           time: getCurrentTime()
       },'OK')
       res.send(editWebCollectSuccess);
   })
   
})

module.exports = getWebCollectRouterHandle