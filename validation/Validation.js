const {ResponseStatusCodes, ResponseMessages, ResponseStatus} = require("../utility/responseConfigs");

class Validation {
  validationErrors = [];
  bodyValidation(body) {
    this.validationErrors = []
    const {id, data, parentId} = body;
    if (!id || !data || !parentId) {
      this.validationErrors.push({
        statusCode: ResponseStatusCodes.BAD_REQUEST,
        message: ResponseMessages.MissingRequiredFields,
        status: ResponseStatus.BAD_REQUEST
      })
    }
    this.isEmail(body?.email)

  }
  isEmail(email){
    const emailPattern = /[a-zA-Z0-9.+-]+@[a-zA-Z]+\.[a-zA-Z]+/;
    if (!emailPattern.test(email)) {
      this.validationErrors.push({
        statusCode:ResponseStatusCodes.BAD_REQUEST,
        message:ResponseMessages.InvalidEmail,
        status:ResponseStatus.BAD_REQUEST
      })
    }
  }

  queryValidation(query){

  }
}

module.exports = new Validation();
