const express = require('express');
const app = express();

app.use('/user', require('./Controllers/userController'));

module.exports = app;