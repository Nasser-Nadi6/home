require("reflect-metadata");

class DIContainer {
  services;
  singletonInstances = [];
  transientInstances = [];

  constructor(services) {
    console.log("Dependency Injection Container initialized...");
    this.services = services;
    this.generateSingletonInstances();
    // this.generateTransientInstances();
  }

  generateSingletonInstances() {
    const deps = this.servicesMustInjectToDI();
    deps.forEach((dep) => {
      this.services.find((service) => {
        if (
          service.name == dep &&
          !this.singletonInstances.includes(service.class.getInstance())
        ) {
          this.singletonInstances.push(service.class.getInstance());
        }
      });
    });
  }

  generateTransientInstances() {
    const deps = this.servicesMustInjectToDI();

    deps.forEach((dep) => {
      this.services.find((service) => {
        if (service.name == dep) {
          this.transientInstances.push(new service.class());
        }
      });
    });
  }

  servicesMustInjectToDI() {
    const deps = [];
    this.services.forEach((service) => {
      const dep = Reflect.getMetadata("dep", service.class);
      if (dep) {
        deps.push(dep);
      }
    });
    return deps;
  }
}

module.exports = DIContainer;
