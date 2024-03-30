/**
 * 函数小工具
 */
const momont = require('moment')

const commonUtil = {
    // 获取当前时间的方法
    getCurrentTime : () => {
        return momont(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },

    // 拼接分页查询的方法
    paginationQuery : (selectArray, databaseName) => {
        // 将分页的两个参数去除
        let selectKey = Object.keys(selectArray).slice(2)
        // 获取开始查询的位置
        let startrow = ((selectArray.currentPage - 1) * selectArray.pageSize)
        let sqlStr = ''
        // 遍历生成查询条件
        for(let i in selectKey){
            if(selectArray[selectKey[i]] != null && (selectArray[selectKey[i]]) !='') {
                sqlStr += ` and ${selectKey[i]} like '%${selectArray[selectKey[i]]}%'`
            }
        }
        // 合成查询语句
        let sql = `Select * from ${databaseName} where 1=1 ${sqlStr} Order By update_time Desc limit ${startrow},${selectArray.pageSize}`
        return sql;
    }
}

module.exports = commonUtil

