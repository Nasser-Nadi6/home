const BaseHandler = require("./BaseHandler");
const { sendResponse } = require("../utility/utility");

const validationData = require("../validation/ValidationData");

class Validation extends BaseHandler {
  handle(request, response, routes,servicesInstances) {
    if (request.method === "POST") {
      const {
        data: { email, fullname },
      } = request.payload;
      const emailValidationResult = validationData.isEmail(email);
      const fullNameValidationresult = validationData.validFullName(fullname);
      if (!emailValidationResult || !fullNameValidationresult) {
        return sendResponse(response, 400, { message: validationData.errors });
      }
      return super.handle(request, response, routes,servicesInstances);
    } else {
      return super.handle(request, response, routes,servicesInstances);
    }
  }
}

module.exports = new Validation();
