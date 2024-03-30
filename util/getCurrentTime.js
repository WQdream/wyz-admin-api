/**
 * 获取当前时间
 */

const getCurrentTime = () => {
    const momont = require('moment')
    return momont(new Date()).format('YYYY-MM-DD HH:mm:ss')
}

module.exports = getCurrentTime
