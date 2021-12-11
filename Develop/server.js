// Require Dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');
//Require routes file
const routes = require('./routes/routes');

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);



app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });