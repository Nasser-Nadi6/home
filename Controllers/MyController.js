const BaseController = require("./Base-Controller/BaseController");
const { controller, method, path } = require("../decorators/decorators");

@controller("/mycontroller")
class MyController extends BaseController {
  static instance;
  todoSrv;

  constructor(services) {
    super();
    this.todoSrv = services[1];
  }

  @method("GET")
  @path("/myPath")
  firstMethod() {
    this.todoSrv.add();
  }

  static getInstance(services) {
    if (this.instance) {
      return this.instance;
    }
    return (this.instance = new MyController(services));
  }
}

module.exports = MyController;
