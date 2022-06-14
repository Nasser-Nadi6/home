const sendResponse = function (
  res,
  statusCode,
  message,
  status
) {
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    date:new Date().toUTCString(),
    statusCode:statusCode,
    data:{message:message},
    status:status
  }));
};

const payloadParser = function (req) {
  return new Promise((resolve, reject) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      if (!body) {
        return resolve({});
      }
      resolve(JSON.parse(body));
    });

    req.on("error", () => {
      reject();
    });
  });
};

const validPaths = (path, routes) => {
  const validRoutes = [];
  routes.forEach((route) => {
    route.map((realRoute) => {
      validRoutes.push({
        routes: `${realRoute.method}:${realRoute.prefix}${realRoute.path}`,
        handler: realRoute.handler,
        controller: realRoute.controller,
        validationType: realRoute.validationType,
      });
    });
  });
  return validRoutes;
};

const isEmpty = function (obj) {
  if (Object.keys(obj).length === 0) {
    return true;
  }
  return false;
};

const userExist = function (obj) {
  if (Object.keys(obj).includes("email")) {
    return true;
  }
  return false;
};

function checkRoute(req) {
  const { method, pathName } = req;
  const incomingRequestUrlandMethod = `${method}:${pathName}`;
  return incomingRequestUrlandMethod;
}

function routeIsValid(validRoutesAndMethods, incomingRequestUrlandMethod) {
  const validRoutes = [];
  validRoutesAndMethods.forEach((route) => {
    validRoutes.push(route.routes);
  });

  const result = validRoutesAndMethods.find((el) => {
    return el.routes === incomingRequestUrlandMethod;
  });
  return result;
}

module.exports = {
  sendResponse,
  payloadParser,
  validPaths,
  isEmpty,
  userExist,
  checkRoute,
  routeIsValid,
};
