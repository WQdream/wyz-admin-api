/**
 * 用户信息的路由
 */

 const express = require('express')
 const router = express.Router();
 const  {SimComCreate, if_exist, SimComGetInfo, SimComGetTotalNum, SimComDeleteInfo, SimComDeleteMoreInfo, SimComEditInfo} = require('../../controller/user/userInfo')
 const { SuccessModel, ErrorModel } = require('../../model/resModel')
 const getCurrentTime = require('../../util/getCurrentTime')

 const getUserInfoRouterHandle = router.post('/api/user/createUser', (req, res) => {
    // 解析 post 请求
    let user_name = req.body.user_name;
    let user_password = req.body.user_password;
    let user_profile = req.body.user_profile;
    let nick_name = req.body.nick_name;
    let user_intro = req.body.user_intro;
    let user_phone = req.body.user_phone;
    let gender = req.body.gender;
    let user_identity = req.body.user_identity;

    if_exist(user_name).then(userInfo => {
        if(userInfo[0]){
            const user_yes = new ErrorModel({
                tip: '用户已存在请重新创建！',
                failTime: getCurrentTime()
            },"用户创建失败！");
            res.status(201).send(user_yes);
        }else{
            SimComCreate(user_name, user_password, user_profile, nick_name, user_intro, user_phone, gender, user_identity).then( () => {
                const createUserInfo = new SuccessModel({
                    tip: '用户创建成功',
                    createTime: getCurrentTime()
                },'ok')
                res.send(createUserInfo)
            })
        }
    })
 })
 .post('/api/user/getUserInfo', async(req, res) => {
    const currentPage = req.body.currentPage
    const pageSize = req.body.pageSize
    const user_name = req.body.user_name
    const nick_name = req.body.nick_name
    const user_phone = req.body.user_phone
    const gender = req.body.gender
    const user_identity = req.body.user_identity

    let total = await SimComGetTotalNum();
    total = total[0]['COUNT(id)']
    SimComGetInfo(currentPage,pageSize,user_name,nick_name, user_phone, gender, user_identity).then( relust => {
        const userInfo = new SuccessModel({
            tip: '用户列表获取成功',
            time: getCurrentTime(),
            data: relust,
            paging:{
                currentPage:currentPage,
                pageSize:pageSize,
                total:total
            }
        },'ok')
        res.send(userInfo)
    })
 }).post('/api/user/deleteUserInfo', (req, res) => {
     let id = req.body.id
     SimComDeleteInfo(id).then( () => {
        const deleteUserInfo = new SuccessModel({
            time: getCurrentTime(),
            tip: `用户删除成功！`
        },'ok')
        res.send(deleteUserInfo)
    })
 }).post('/api/user/deleteMoreUserInfo', (req, res) => {
    let idList = req.body.idList
    SimComDeleteMoreInfo(idList).then( () => {
       const deleteMoreUserInfo = new SuccessModel({
           time: getCurrentTime(),
           tip: `用户删除成功！`
       },'ok')
       res.send(deleteMoreUserInfo)
   })
}).post('/api/user/editUserInfo', (req, res) => {
     let id = req.body.id
     let user_name = req.body.user_name;
     let nick_name = req.body.nick_name;
     let user_profile = req.body.user_profile;
     let user_intro = req.body.user_intro;
     let user_phone = req.body.user_phone
     let gender = req.body.gender
     let user_identity = req.body.user_identity
     SimComEditInfo(id, nick_name, user_profile, user_intro, user_phone, gender, user_identity).then( () => {
        const editUserInfo = new SuccessModel({
            tip:'用户修改成功',
            time: getCurrentTime()
        },'OK')
        res.send(editUserInfo);
    })
    
 })

 module.exports = getUserInfoRouterHandle