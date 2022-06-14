const {
  sendResponse,
  validPaths,
  checkRoute,
  routeIsValid,
} = require("../utility/utility");

const validation = require("../validation/Validation");

class BaseHandler {
  #nextHandler;

  handle(request, response, routes, servicesInstances) {
    if (this.#nextHandler) {
      return this.#nextHandler.handle(
        request,
        response,
        routes,
        servicesInstances
      );
    } else {
      const validRoutesAndMethods = validPaths(request.pathName, routes);
      const incomingRequestUrlandMethod = checkRoute(request);
      const validRoute = routeIsValid(
        validRoutesAndMethods,
        incomingRequestUrlandMethod
      );

      // validation payload or query string
      if(request.method==='POST' || request.method==="PUT"){
        validation.bodyValidation(request.payload)
      } else {
        validation.queryValidation(request.query)
      }

      if (validRoute) {
        validRoute.controller.controller
          .getInstance(servicesInstances)
          [validRoute.handler](request, response,validation.validationErrors);
      } else {
        sendResponse(response, 404, { message: "Resource not found." });
      }
    }
  }

  setNext(handler) {
    this.#nextHandler = handler;
    return handler;
  }
}

module.exports = BaseHandler;
