/**
 * 构造返回数据
 */
 
class Base {
    constructor (data, msg) {
        this.data = data;
        this.msg = msg;
    } 
}

class SuccessModel extends Base {
    constructor (data, msg) {
        super (data, msg)
        this.errno = 0
    }
}

class ErrorModel extends Base {
    constructor (data, msg) {
        super (data, msg)
        this.errno = -1
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}