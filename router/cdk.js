/**
 * 激活码的路由
 */

const express = require('express')
const router = express.Router();
const { addCdk, getCdkNum, getCdk, deleteCdk, deleteMoreCdk } = require('../controller/cdk')
const { SuccessModel, ErrorModel } = require('../model/resModel')
const getCurrentTime = require('../util/getCurrentTime')

const getCdkRouterHandle = router.post('/api/cdk/addCdk', (req, res) => {
    // 解析 post 请求
    let count = req.body.count;
    let due_time = req.body.due_time;
    addCdk(count, due_time).then(() => {
        const addcdk = new SuccessModel({
            tip: 'cdk添加成功成功~！',
            createTime: getCurrentTime()
        }, 'ok')
        res.send(addcdk)
    })
})
    .post('/api/cdk/getCdk', async (req, res) => {
        const currentPage = req.body.currentPage
        const pageSize = req.body.pageSize
        const cdk = req.body.cdk
        const due_time = req.body.due_time
        const use_account = req.body.use_account

        let total = await getCdkNum();
        total = total[0]['COUNT(id)']
        getCdk(currentPage, pageSize, cdk, due_time, use_account).then(relust => {
            const glyInfo = new SuccessModel({
                tip: 'cdk列表获取成功',
                time: getCurrentTime(),
                data: relust,
                paging: {
                    currentPage: currentPage,
                    pageSize: pageSize,
                    total: total
                }
            }, 'ok')
            res.send(glyInfo)
        })
    }).post('/api/cdk/deleteCdk', (req, res) => {
        let id = req.body.id
        deleteCdk(id).then(() => {
            const deleteCdk = new SuccessModel({
                time: getCurrentTime(),
                tip: `以删除id为${id}cdk成功`
            }, 'ok')
            res.send(deleteCdk)
        })
    }).post('/api/cdk/deleteMoreCdk', (req, res) => {
        let idList = req.body.idList
        deleteMoreCdk(idList).then(() => {
            const deleteMoreCdk = new SuccessModel({
                time: getCurrentTime(),
                tip: `cdk删除成功！`
            }, 'ok')
            res.send(deleteMoreCdk)
        })
    })

module.exports = getCdkRouterHandle