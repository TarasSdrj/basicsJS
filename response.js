"use strict"
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

let contents = readHttpLikeInput(`GET /sum?nums=1,2,3 HTTP/1.1
Host: student.shpp.me
`);

function outputHttpResponse(statusCode, statusMessage, headers, body) {
  // "GET /sum?nums=1,2,3 HTTP/1.1\nHost: student.shpp.me\n  \n"
  console.log(`HTTP/1.1 ${statusCode} ${statusMessage}
  Date: ${new Date().toUTCString()}
  Server: Apache/2.2.14 (Win32)
  Content-Length: ${statusMessage.length}
  Connection: Closed
  Content-Type: text/html; charset=utf-8
  
  ${body}`);
}

function processHttpRequest($method, $uri, $headers, $body) {
  let statusCode = "404";
  let statusMessage = "not found";
  let body = $body;
  if ($uri != null && $method == "GET" && $uri.match(/.=[\d,]+$/)) {
    statusCode = "200";
    statusMessage = "OK";
    body = $uri
      .match(/[\d,]+$/)[0]
      .split(",")
      .reduce((sum, current) => sum + +current, 0);
  }
  if ($uri != null && !$uri.match(/\/sum/)) {
    statusCode = "404";
    statusMessage = "Not found";
    body = "Not found";
  }
  if (($uri != null && !$uri.match(/.+?nums/)) || $method != "GET") {
    statusCode = "400";
    statusMessage = "Bad Request";
    body = "Not found";
  }

  // ... проаналізувати вхідні дані, обчислити результат
  // та спеціальною командою красиво вивести відповідь
  outputHttpResponse(statusCode, statusMessage, $headers, body);
}

function parseTcpStringAsHttpRequest($string) {
  // ну це ви вже написали
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
processHttpRequest(http.method, http.uri, http.headers, http.body);
