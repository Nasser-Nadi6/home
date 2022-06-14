const server = require("../Server");
const { payloadParser } = require("../utility/utility");
const requestParser = require("../chain-of-responsibilities/RequestParser");
const validation = require("../chain-of-responsibilities/Validation");
const logger = require("../chain-of-responsibilities/Logger");

class Router {
  constructor(routes, servicesInstances) {
    console.log("APP CONTROLLERS");
    console.log(routes);

    server.on("newRequest", async (req, res) => {
      const payload = await payloadParser(req);
      req.payload = payload;

      // Chain of Responsibilities
      requestParser.setNext(logger);
      requestParser.handle(req, res, routes, servicesInstances);
    });
  }
}

module.exports = Router;
