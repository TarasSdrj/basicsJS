"use strict";
// ось цю функцію, власне, і треба написати
let string = `GET /doc/test.html HTTP/1.1 
Host: www.test101.com 
Accept: image/gif, image/jpeg, */* 
Accept-Language: en-us 
Accept-Encoding: gzip, deflate 
User-Agent: Mozilla/4.0 
Content-Length: 35

bookId=12345&author=Tan+Ah+Teck`;

let string2 = `POST /api/checkLoginAndPassword HTTP/1.1
Accept: */*
Content-Type: application/x-www-form-urlencoded
User-Agent: Mozilla/4.0
Content-Length: 35

login=student&password=12345
`;
function processHttpRequest($method, $uri, $headers, $body) {
  let statusCode = "404 Not Found";
  let statusMessagee = "not found";
  if ($uri != null && $method == "GET" && $uri.match(/.=[\d,]+$/)) {
    statusCode = "200 OK";
    statusMessagee = $uri
      .match(/[\d,]+$/)[0]
      .split(",")
      .reduce((sum, current) => sum + +current, 0);
  }
  if ($uri != null && !$uri.match(/\/sum/)) {
    statusCode = "404 Not Found";
    statusMessagee = "not found";
  }
  if (($uri != null && !$uri.match(/.+?nums/)) || $method != "GET") {
    statusCode = "400 Bad Request";
    statusMessagee = "not found";
  }
}
// const myMap = new Map([
//     ['key1', 'value1'],
//     ['key2', 'value2']
//   ]);

// ось цю функцію, власне, і треба написати
function parseTcpStringAsHttpRequest(string) {
  return {
    method: string.match(/^\w+\s/)[0],
    uri: string.match(/\/[a-z.//]+/)[0],
    headers: new Map(
      string.match(/[\w\-]+:.+/g).map((item) => {
        //let res = new Map();
        //console.log(item.split(":")[0]);
        return [item.split(":")[0], item.split(":")[1]];
      })
    ),
    body: string.match(/\s\w+=.+$/)[0],
  };
}

//console.log(quest(string));
console.log(parseTcpStringAsHttpRequest(string));
//console.log(obmap(string));
console.log(new Date().toUTCString());
let $uri = "/sum?nums=1,2,3";
let statusMessage = $uri.match(/\/sum/);
console.log(statusMessage);
