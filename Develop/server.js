// require dependencies
const express = require("express");
const fs = require("fs");
const path = require('path');

// initialize express app
const PORT = process.env.PORT || 3001;
const app = express();


// initialize data parsing
app.use(express.static(__dirname));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require('./routes/routes')(app);

// initialize listener
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
  });