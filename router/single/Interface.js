/**
 * 获取网站收藏信息的路由
 */

const express = require('express')
const router = express.Router();
// const  {} = require('../../controller/single/webCollect')
const { SuccessModel, ErrorModel } = require('../../model/resModel')
const getCurrentTime = require('../../util/getCurrentTime')
const axios = require("axios");

const getInterfaceRouterHandle = router.post('/api/Interface/oneSentence', (req, res) => {
    axios.get(`https://www.mxnzp.com/api/daily_word/recommend?count=10&app_id=enqtmtlwtn0nkmmg&app_secret=SHJGYURpZlZKSFlueUJPUGdzcXhNdz09`)
   .then(result => {
    const getOneSentence = new SuccessModel({
        tip: '每日一句获取成功~！',
        createTime: getCurrentTime(),
        data:result.data.data
    },'ok')
    res.send(getOneSentence)
    // console.log(result.data.data)
   })
    // 解析 post 请求

//         addWebSite(web_title, web_site).then( () => {
//                const addWebCollect = new SuccessModel({
//                    tip: '网站添加成功成功~！',
//                    createTime: getCurrentTime()
//                },'ok')
//                res.send(addWebCollect)
       
//    })
}).post('/api/Interface/getWbHotspot',(req,res) => {
    axios.get(`https://zj.v.api.aa1.cn/api/weibo-rs/`)
    .then(result => {
     const getWbHotspot = new SuccessModel({
         tip: '微博热点获取成功~！',
         createTime: getCurrentTime(),
         data:result.data.data
     },'ok')
     res.send(getWbHotspot)
    })
})
.post('/api/Interface/getBlblHotspot',(req,res) => {
    axios.get(`https://v.api.aa1.cn/api/bilibili-rs/`)
    .then(result => {
     const getBlblHotspot = new SuccessModel({
         tip: 'blbl热点获取成功~！',
         createTime: getCurrentTime(),
         data:result.data.data
     },'ok')
     res.send(getBlblHotspot)
    })
})
.post('/api/Interface/getZhHotspot',(req,res) => {
    axios.get(`https://v.api.aa1.cn/api/zhihu-news/index.php?aa1=xiarou`)
    .then(result => {
        let zhHotspot = JSON.parse(result.data.slice(0, -4)).news[0];
     const getZhHotspot = new SuccessModel({
         tip: '知乎热点获取成功~！',
         createTime: getCurrentTime(),
         data:zhHotspot
     },'ok')
     res.send(getZhHotspot)
    })
})


module.exports = getInterfaceRouterHandle