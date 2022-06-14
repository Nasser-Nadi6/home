require("reflect-metadata");
const { connectToRedis } = require("../database/database");

function initControllers(controllers) {
  const result = [];
  controllers.forEach((Controller) => {
    const controllerPrefixPath = Reflect.getMetadata(
      "prefix",
      Controller.controller
    );

    result.push(extractMethodAndPath(Controller, controllerPrefixPath));
  });

  return result;
}

function extractMethodAndPath(Controller, prefix) {
  const routes = [];
  for (let handler of Controller.handlers) {
    const method = Reflect.getMetadata(
      "method",
      Controller.controller.prototype,
      handler
    );
    const path = Reflect.getMetadata(
      "path",
      Controller.controller.prototype,
      handler
    );
    const validationType = Reflect.getMetadata(
      "type",
      Controller.controller.prototype,
      handler
    );
    routes.push({
      controller: Controller,
      handler: handler,
      prefix: prefix,
      path: path,
      method: method,
      validationType: validationType,
    });
  }
  return routes;
}

async function connectToDB(port, index) {
  const redis = await connectToRedis(port, "127.0.0.1", index);
  return redis;
}

// const initServices = function (services, routes) {
//   const servicesInstances = [];
//   routes.forEach((route) => {
//     if (route[0].deps) {
//       // new one instance
//       const srv = services.find((service) => {
//         return Object.keys(service).includes(route[0].deps);
//       });
//       if (srv.singleton) {
//         servicesInstances.push(srv[route[0].deps].getInstance());
//       }
//     }
//   });
//   return servicesInstances;
// };

module.exports = {
  initControllers,
  connectToDB,
};
