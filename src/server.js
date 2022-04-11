const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const { port } = require("./config");
const { request } = require("http");

const app = express();

//Middleware
app.use(cors());
app.use(morgan("dev"));

app.get("/", (request, response) => {
  response.send("<h1> Hello Express </h1>");
});

//paleidziam serveri
app.listen(port, () => console.log("express is online", port));

//GET /numbers - grazina numbers masyva json formatu is db.js
const { numbers } = require("./db/db");
app.get("/numbers", (request, response) => {
  console.log("numbers===", numbers);
  response.json(numbers);
});

// GET /numbers/positive - grazina numbers masyva json formatu is db.js su tik teigiamais skaiciais//
app.get("/numbers/positives", (request, response) => {
  function getPositiveNumbers(numbers) {
    return numbers.filter((value) => value > 0);
  }
  response.json(getPositiveNumbers(numbers));
});

//GET /numbers/obj-values - grazinam masyva kuris turi objektus {value: 1},
// {value: 12}
app.get("/numbers/obj-values", (request, response) => {
  const numbObjs = numbers.map((sk) => {
    return {
      value: sk,
    };
  });
  console.log("numbObjs ===", numbObjs);
  response.json(numbObjs);
});

// GET /numbers/gt/10 - grazina masyva kuriame yra sk didesni uz 10
app.get("/numbers/10plus", (request, response) => {
  function moreThan10(numbers) {
    return numbers.filter((value) => value > 10);
  }
  response.json(moreThan10(numbers));
});

// GET /numbers/gt/:num - grazina masyva kuriame yra sk didesni uz num
app.get("/numbers/gt/:num", (request, response) => {
  //pasiimti num
  const num = +request.params.num;
  response.json(numbers.filter((sk) => sk > num));
});

// GET /numbers/max - grazina didziausia reiksme objekto pavidalu {max: 500}//
app.get("/numbers/max", (request, response) => {
  const max = numbers.reduce((maxNum, sk) => Math.max(maxNum, sk));
  response.json({ maxIs: max });
});

//GET /numbers/separate - (galima padaryti su reduce)
{
  positives: [];
  negatives: [];
}

//GET /numbers - grazina posts masyva json formatu is db.js
const { posts } = require("./db/db");
app.get("/posts", (request, response) => {
  console.log("posts===", posts);
  response.json(posts);
});

// GET /posts/1 - grazina post objekta kurio id yra 1
app.get("/posts/1", (request, response) => {
  const foundPost = posts.find((postObj) => postObj.id === 1);
  response.json(foundPost);
});

//GET /posts/:postId = grazina post objekta kurio id yra postId
//:postId - dinaminis route parametras. Ji gaunam is request.params. <pavadinimas>
app.get("/posts/:postId", (request, response) => {
  //   console.log("request.params", request.params);
  const postId = +request.params.postId;
  console.log("postId===", postId);
  const foundPost = posts.find((postObj) => postObj.id === postId);
  console.log("foundPost===", foundPost);
  if (foundPost === undefined) {
    response.status(404).json("Post not found");
    return;
  }
  response.json(foundPost);
});
