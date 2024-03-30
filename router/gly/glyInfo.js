/**
 * 获取管理员信息的路由
 */

 const express = require('express')
 const router = express.Router();
 const  {deleteMoreGlyInfo, getGlyNum, getGlyInfo, deleteGlyInfo, editGlyInfo,createGly, if_user} = require('../../controller/gly/glyInfo')
 const { SuccessModel, ErrorModel } = require('../../model/resModel')
 const getCurrentTime = require('../../util/getCurrentTime')

 const getGlyInfoRouterHandle = router.post('/api/user/createGly', (req, res) => {
    // 解析 post 请求
    let user_name = req.body.userName;
    let user_password = req.body.userPassword;
    let user_profile = req.body.userProfile;
    let nick_name = req.body.nickName;
    let user_intro = req.body.userIntro;
    if_user(user_name).then(userInfo => {
        if(userInfo[0]){
            const user_yes = new ErrorModel({
                tip: '管理员已存在请重新创建！',
                failTime: getCurrentTime()
            },"管理员创建失败！");
            res.status(201).send(user_yes);
        }else{
            createGly(user_name, user_password, user_profile, nick_name, user_intro).then( () => {
                const createGlyInfo = new SuccessModel({
                    tip: '管理员创建成功',
                    createTime: getCurrentTime()
                },'ok')
                res.send(createGlyInfo)
            })
        }
    })
 })
 .post('/api/user/getGlyInfo', async(req, res) => {
    const currentPage = req.body.currentPage
    const pageSize = req.body.pageSize
    const userName = req.body.userName
    const nickName = req.body.nickName
    let total = await getGlyNum();
    total = total[0]['COUNT(id)']
    getGlyInfo(currentPage,pageSize,userName,nickName).then( relust => {
        const glyInfo = new SuccessModel({
            tip: '管理员列表获取成功',
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
 }).post('/api/user/deleteGlyInfo', (req, res) => {
     let id = req.body.id
    deleteGlyInfo(id).then( () => {
        const deleteGlyInfo = new SuccessModel({
            time: getCurrentTime(),
            tip: `以删除id为${id}管理员成功`
        },'ok')
        res.send(deleteGlyInfo)
    })
 }).post('/api/user/deleteMoreGlyInfo', (req, res) => {
    let idList = req.body.idList
    deleteMoreGlyInfo(idList).then( () => {
       const deleteGlyInfo = new SuccessModel({
           time: getCurrentTime(),
           tip: `管理员删除成功！`
       },'ok')
       res.send(deleteGlyInfo)
   })
}).post('/api/user/editGlyInfo', (req, res) => {
     let id = req.body.uid
     let user_name = req.body.userName;
     let nick_name = req.body.nickName;
     let user_profile = req.body.userProfile;
     let user_intro = req.body.userIntro;
    editGlyInfo(id, nick_name, user_profile, user_intro).then( () => {
        const editGlyInfoSuccess = new SuccessModel({
            tip:'管理员修改成功',
            time: getCurrentTime()
        },'OK')
        res.send(editGlyInfoSuccess);
    })
    
 })

 module.exports = getGlyInfoRouterHandle