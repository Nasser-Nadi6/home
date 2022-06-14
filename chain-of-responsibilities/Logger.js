const BaseHandler = require("./BaseHandler");

class Logger extends BaseHandler {
  handle(request, response, routes,servicesInstances) {
    console.log("logger");
    return super.handle(request, response, routes,servicesInstances);
  }
}

module.exports = new Logger();
