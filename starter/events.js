const EventEmmiter = require("events");
const http = require("http");
class Sales extends EventEmmiter {
  constructor() {
    super();
  }
}
const myEmitter = new Sales();

myEmitter.on("newSale", () => {
  console.log(`There was a new sale!`);
});

myEmitter.on("newSale", () => {
  console.log(`Costumer name: Amer`);
});

myEmitter.on("newSale", (stock) => {
  console.log(`There are now ${stock} left in Stock`);
});

myEmitter.emit("newSale", 9);

/////////////////////
const server = http.createServer((req, res) => {});

server.on("request", (req, res) => {
  console.log(req.url);
  console.log(`Request Recieved`);
  res.writeHead(200, { "content-type": "text/html" });
  res.end("<h1>Request Recived</h1>");
});
server.on("request", (req, res) => {
  console.log(`Another Request Recieved😏`);
});

server.on("close", () => {
  console.log(`Server Closed`);
});
server.listen(8000, "127.0.0.1", () => {
  console.log(`Waiting for requests...`);
});
