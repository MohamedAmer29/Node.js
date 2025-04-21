const fs = require("fs");
const http = require("http");
const url = require("url");
const slugify = require("slugify");
//Importing replacement functions
const replaceTemplate = require("./modules/replaceTempFunction");
//sync read file
const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, "utf8");
const tempCard = fs.readFileSync(`./templates/card.html`, "utf8");
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/product.html`,
  "utf8"
);
const tempOverview = fs.readFileSync(
  `${__dirname}/templates/overview.html`,
  "utf8"
);

//dataobject with is parsed data.json
const dataObj = JSON.parse(data);
const slug = dataObj.map((product) =>
  slugify(product.productName, { lower: true })
);

//Server
const server = http.createServer((req, res) => {
  const { query, pathname } = url.parse(req.url, true);
  console.log(slug);

  ////////////////
  //TODOoverview page
  /////////////////
  if (pathname === "/overview" || pathname === "/") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const cardHtml = dataObj
      .map((el) => {
        return replaceTemplate(tempCard, el);
      })
      .join("");
    const output = tempOverview.replace(/{%PRODUCT_CARDS%}/g, cardHtml);

    res.end(output);

    ////////////////////////
    //TODOproduct page
    ///////////////////////
  } else if (pathname === "/product") {
    res.writeHead(200, {
      "content-type": "text/html",
    });
    const product = dataObj[query.id];
    const output = replaceTemplate(tempProduct, product);

    res.end(output);
    //////////////////
    //TODO API Page
    /////////////////
  } else if (pathname === "/api") {
    res.writeHead(200, {
      "content-type": "application/json",
    });
    res.end(data);

    ///////////////
    //error page
    /////////////
  } else {
    res.writeHead(404, {
      "content-type": "text/html",
      "my-own-header": "hello World",
    });
    res.end(
      "<h1 style='font-size:40px;background-color:red;margin:auto;text-align:center;padding:6px'>404 Page Not Found!</h1>"
    );
  }
});

//port
server.listen(3000, "127.0.0.1", () => {
  console.log(`Listing to request on port 3000`);
});

/*Files
//Blocking, Synchronous way
const textIn = fs.readFileSync("./txt/input.txt", "utf-8");
const textOut = `this is what we know about avocado: ${textIn}.\nCreated on ${Date.now()}`;
fs.writeFileSync("./txt/output.txt", textOut, (err) => {
  console.log(`The sychronous file has been written`);
});
// console.log("File Written!");

//Non-blocking, Asynchronous way
fs.readFile("./txt/start.txt", "utf-8", (err, data) => {
  fs.readFile(`./txt/${data}.txt`, "utf-8", (err, data2) => {
    console.log(data2);
    fs.readFile("./txt/append.txt", "utf-8", (err, data3) => {
      console.log(data3);

      fs.writeFile("./txt/final.txt", `${data2}\n${data3}`, (err) => {
        console.log(`Your file has been written ☺️`);
      });
    });
  });
});
console.log(`Will read file!`);
*/
