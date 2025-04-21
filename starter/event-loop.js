const fs = require("fs");
const crypto = require("crypto");

const start = Date.now();

setTimeout(() => {
  console.log(`Timer 1 Finished`, Date.now() - start);
}, 0);

setImmediate(() => {
  console.log(`Immediate 1 finished`, Date.now() - start);
});

fs.readFile("./test-file.txt", (err, data) => {
  console.log(`I/O Finished`, Date.now() - start);
  console.log(`--------------------------------`);

  setTimeout(() => {
    console.log(`Timer 2 Finished`, Date.now() - start);
  }, 0);
  setTimeout(() => {
    console.log(`Timer 3 Finished`, Date.now() - start);
  }, 3000);

  setImmediate(() => {
    console.log(`Immediate 2 finished`, Date.now() - start);
  });

  process.nextTick(() => {
    console.log(`Process.nextTick()`, Date.now() - start);
  });

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted`, Date.now() - start);

  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted`, Date.now() - start);
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted`, Date.now() - start);
  crypto.pbkdf2Sync("password", "salt", 100000, 1024, "sha512");
  console.log(`Password Encrypted`, Date.now() - start);
});

console.log(`Hello from top-level code`, Date.now() - start);
