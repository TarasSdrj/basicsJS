"use strict"
// цей файл потрібно буде дописати...

// не звертайте увагу на цю функцію
// вона потрібна для того, щоб коректно зчитувати вхідні данні
function readHttpLikeInput() {
  var fs = require("fs");
  var res = "";
  var buffer = Buffer.alloc ? Buffer.alloc(1) : new Buffer(1);
  let was10 = 0;
  for (;;) {
    try {
      fs.readSync(0 /*stdin fd*/, buffer, 0, 1);
    } catch (e) {
      break; /* windows */
    }
    if (buffer[0] === 10 || buffer[0] === 13) {
      if (was10 > 10) break;
      was10++;
    } else was10 = 0;
    res += new String(buffer);
  }

  return res;
}

let contents = readHttpLikeInput();

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {
  return {
    method: string.match(/^\w+\s/)[0],
    uri: string.match(/\/[\w.//]+/)[0],
    headers: new Map(
      string.match(/[\w\-]+:.+/g).map((item) => {
        return [item.split(":")[0], item.split(":")[1]];
      })
    ),
    body: string.match(/\w+=.+/)[0],
  };
}

http = parseTcpStringAsHttpRequest(contents);
console.log(JSON.stringify(http, undefined, 2));
