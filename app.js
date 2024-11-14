const express = require('express');
const app = express();
const { db } = require('./db/connection.js');

const port = 3000;
const user = require('./models/User.js');
const show = require('./models/Show.js')