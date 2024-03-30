/**
 * 题目的路由
 */

 const express = require('express')
 const router = express.Router();
 const  {SimComCreate, if_exist, SimComGetInfo, SimComGetTotalNum, SimComDeleteInfo, SimComDeleteMoreInfo, SimComEditInfo} = require('../../controller/question/questionManage')
 const { SuccessModel, ErrorModel } = require('../../model/resModel')
 const getCurrentTime = require('../../util/getCurrentTime')

 const getQuestionManageRouterHandle = router.post('/api/question/createQuestion', (req, res) => {
    // 解析 post 请求
    let q_bank_id = req.body.q_bank_id;
    let q_title = req.body.q_title;
    let q_option = req.body.q_option;
    let q_answer = req.body.q_answer;
    let q_type = req.body.q_type;
    let q_explain = req.body.q_explain;

    if_exist(q_title).then(userInfo => {
        if(userInfo[0]){
            const user_yes = new ErrorModel({
                tip: '该题目已存在请重新创建！',
                failTime: getCurrentTime()
            },"题目创建失败！");
            res.status(201).send(user_yes);
        }else{
            SimComCreate(q_bank_id, q_title, q_option, q_answer, q_type, q_explain).then( () => {
                const createUserInfo = new SuccessModel({
                    tip: '题目创建成功',
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

 module.exports = getQuestionManageRouterHandle