const express = require('express');
const app = express();

const user = require('../routes/Users.js');
const show = require('../routes/Shows.js')

app.use('/users', user);
app.use('/shows', show);

module.exports = app;