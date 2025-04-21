const fs = require("fs");
const server = require("http").createServer();

server.on("request", (req, res) => {
  //solution 1 reqular read file
  //   fs.readFile("./test-file.txt", (err, data) => {
  //     if (err) throw new Error("error");
  //     res.end(data);
  //   });
  //streams pros:faster than regular read, cons:slower than pipe because write chunk is slower than read chunk(backplesure)
  //   const readable = fs.createReadStream("./test-file.txt");
  //   readable.on("data", (chunk) => {
  //     res.write(chunk);
  //   });
  //   readable.on("end", () => {
  //     res.end();
  //   });
  //   readable.on("error", (err) => {
  //     console.log(err);
  //     res.statusCode = 500;
  //     res.end("File Not Found!");
  //   });

  //solution:3 pipe operator
  const readable = fs.createReadStream("./test-file.txt");

  readable.pipe(res);
  //readableSource.pipe(writeDest);
});

server.listen(8000, "127.0.0.1", () => {
  console.log(`Listening...`);
});
