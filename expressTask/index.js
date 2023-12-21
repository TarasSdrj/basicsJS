"use strict";
import express from "express";
import path from "path";

const app = express();
const PORT = 3000;
const __dirname = path.resolve();

let counter = 0;

app.get("/", (req, res) => {
  res.send("<h1>`HelloWorld !!!\n ${counter}`</h1>"+counter);
  //res.send(path.resolve(__dirname, "index.html"))
  counter ++;
  console.log(counter);
});

app.listen(PORT, () => {
  console.log(`Server has ben started on port - ${PORT}`);
});
