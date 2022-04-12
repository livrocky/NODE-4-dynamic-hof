const express = require('express');
const { numbers } = require('../db/db');
// sukuriam routerio objekta
const numbersRoutes = express.Router();

// Routes
numbersRoutes.get('/', (request, response) => {
  console.log('numbers===', numbers);
  response.json(numbers);
});

numbersRoutes.get('/positives', (request, response) => {
  function getPositiveNumbers(arr) {
    return arr.filter((value) => value > 0);
  }
  response.json(getPositiveNumbers(numbers));
});

numbersRoutes.get('/obj-values', (request, response) => {
  const numbObjs = numbers.map((sk) => ({
    value: sk,
  }));
  console.log('numbObjs ===', numbObjs);
  response.json(numbObjs);
});

numbersRoutes.get('/gt/:num', (request, response) => {
  const num = +request.params.num;
  response.json(numbers.filter((sk) => sk > num));
});

numbersRoutes.get('/max', (request, response) => {
  const max = numbers.reduce((maxNum, sk) => Math.max(maxNum, sk));
  response.json({ maxIs: max });
});

module.exports = numbersRoutes;
