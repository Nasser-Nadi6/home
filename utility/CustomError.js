class CustomError extends Error {
    statusCode
    msg
    status

    constructor(statusCode, msg, status) {
        super()
        this.statusCode = statusCode
        this.msg = msg
        this.status = status
    }
}

module.exports = CustomError