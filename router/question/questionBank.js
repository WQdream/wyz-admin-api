/**
 * 获取管理员信息的路由
 */

 const express = require('express')
 const router = express.Router();
 const  {getQuestionBank,getqBankNum,editIfShow,addQbank,deleteQbank,deleteMoreQbank,editQbank} = require('../../controller/question/questionBank')
 const { SuccessModel, ErrorModel } = require('../../model/resModel')
 const getCurrentTime = require('../../util/getCurrentTime')

 const getQuestionBankRouterHandle = router.post('/api/question/getqBank', async(req, res) => {
    const currentPage = req.body.currentPage
    const pageSize = req.body.pageSize
    const q_name = req.body.q_name
    const if_show = req.body.if_show
    let total = await getqBankNum();
    total = total[0]['COUNT(id)']
    getQuestionBank(currentPage,pageSize,q_name,if_show).then( relust => {
        const qBank = new SuccessModel({
            tip: '题库列表获取成功',
            time: getCurrentTime(),
            data: relust,
            paging:{
                currentPage:currentPage,
                pageSize:pageSize,
                total:total
            }
        },'ok')
        res.send(qBank)
    })
 }).post(`/api/question/ifShow`, (req,res) => {
    const id = req.body.id
    const if_show = req.body.if_show
    editIfShow(id,if_show).then( relust => {
        const editShow = new SuccessModel({
            tip: '修改展示状态成功',
            time: getCurrentTime()
        },'ok')
        res.send(editShow)
    })
 }) .post('/api/question/addQbank', (req, res) => {
    let q_name = req.body.q_name
    addQbank(q_name).then( () => {
       const addQbank = new SuccessModel({
           time: getCurrentTime(),
           tip: `添加题库成功`
       },'ok')
       res.send(addQbank)
   })
})
 .post('/api/question/deleteQbank', (req, res) => {
     let id = req.body.id
     deleteQbank(id).then( () => {
        const deleteQbank = new SuccessModel({
            time: getCurrentTime(),
            tip: `删除题库成功`
        },'ok')
        res.send(deleteQbank)
    })
 }).post('/api/question/deleteMoreQbank', (req, res) => {
    let idList = req.body.idList
    deleteMoreQbank(idList).then( () => {
       const deleteMoreQbank = new SuccessModel({
           time: getCurrentTime(),
           tip: `题库删除成功！`
       },'ok')
       res.send(deleteMoreQbank)
   })
}).post('/api/question/editQbank', (req, res) => {
     let id = req.body.id
     let q_name = req.body.q_name;
     editQbank(id, q_name).then( () => {
        const editQbankSuccess = new SuccessModel({
            tip:'题库修改成功',
            time: getCurrentTime()
        },'OK')
        res.send(editQbankSuccess);
    })
    
 }).post('/api/user/getGlyInfoFromMsg', (req, res) => {
     user_name = req.body.user_name;
     nick_name = req.body.nick_name;
     group = req.body.group;
     getGlyInfoFromMsg(user_name, nick_name, group).then( glyList => {
         const getGlyInfoFromMsgSuccess = new SuccessModel({
            tip: '获取管理员列表成功',
            time: getCurrentTime(),
            data: glyList
         },'OK')
         res.send(getGlyInfoFromMsgSuccess)
     })
 })

 module.exports = getQuestionBankRouterHandle