const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const { request } = require('http');
const { port } = require('./config');

const app = express();

// Middleware
app.use(cors());
app.use(morgan('dev'));

app.get('/', (_request, response) => {
  response.send('<h1> Hello Express </h1>');
});

// paleidziam serveri
app.listen(port, () => console.log('express is online', port));

// import routes
const numbersRoutes = require('./api/numbersRoutes');
// use routes

app.use('/api/numbers', numbersRoutes);
// GET /numbers - grazina numbers masyva json formatu is db.js
const { numbers } = require('./db/db');

// GET /numbers/positive - grazina numbers masyva json formatu is db.js su tik teigiama skaiciais//

// GET /numbers/obj-values - grazinam masyva kuris turi objektus {value: 1},
// {value: 12}

// GET /numbers/gt/10 - grazina masyva kuriame yra sk didesni uz 10
app.get('/numbers/10plus', (_request, response) => {
  function moreThan10(arr) {
    return arr.filter((value) => value > 10);
  }
  response.json(moreThan10(numbers));
});

// GET /numbers/gt/:num - grazina masyva kuriame yra sk didesni uz num

// GET /numbers/max - grazina didziausia reiksme objekto pavidalu {max: 500}//

// GET /numbers/separate - (galima padaryti su reduce)

// GET /numbers - grazina posts masyva json formatu is db.js
const { posts } = require('./db/db');

app.get('/posts', (_request, response) => {
  console.log('posts===', posts);
  response.json(posts);
});

// GET /posts/1 - grazina post objekta kurio id yra 1
app.get('/posts/1', (_request, response) => {
  const foundPost = posts.find((postObj) => postObj.id === 1);
  response.json(foundPost);
});

// GET /posts/:postId = grazina post objekta kurio id yra postId
// :postId - dinaminis route parametras. Ji gaunam is request.params. <pavadinimas>
app.get('/posts/:postId', (_request, response) => {
  //   console.log("request.params", request.params);
  const postId = +request.params.postId;
  console.log('postId===', postId);
  const foundPost = posts.find((postObj) => postObj.id === postId);
  console.log('foundPost===', foundPost);
  if (foundPost === undefined) {
    response.status(404).json('Post not found');
    return;
  }
  response.json(foundPost);
});
