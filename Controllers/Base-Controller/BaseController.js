const { sendResponse } = require("../../utility/utility");

class BaseController {
  // an abstract method -> children must implement this method
  handleRequest() {}

  methodNotFound(res) {
    sendResponse(res, 405, { message: "method not allowed!" });
  }
}

module.exports = BaseController;
