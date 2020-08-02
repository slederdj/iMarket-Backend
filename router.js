const express = require('express');
const app = express();

app.use('/auth', require('./Controllers/authController'));
app.use('/cart', require('./Controllers/cartController'));

module.exports = app;