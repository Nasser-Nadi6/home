require("reflect-metadata");

function controller(prefix) {
  return (target) => {
    Reflect.defineMetadata("prefix", prefix, target);
  };
}

function method(method) {
  return (target, key, desc) => {
    Reflect.defineMetadata("method", method, target, key);
  };
}

function path(path) {
  return (target, key, desc) => {
    Reflect.defineMetadata("path", path, target, key);
  };
}

function validation(type) {
  return (target, key, desc) => {
    Reflect.defineMetadata("type", type, target, key);
  };
}

function injectToDI(depName) {
  return (target) => {
    Reflect.defineMetadata("dep", depName, target);
  };
}

module.exports = {
  controller,
  method,
  path,
  injectToDI,
  validation,
};
