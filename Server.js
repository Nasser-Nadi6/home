const http = require("http");
const EventEmitter = require("events");

class Server extends EventEmitter {
  server;

  constructor() {
    super();
  }

  start() {
    this.server = http.createServer((req, res) => {
      this.emit("newRequest", req, res);
    });
  }

  listen(port) {
    this.server.listen(port, () => {
      console.log(`The server is running on port ${port}`);
    });
  }
}

module.exports = new Server();
