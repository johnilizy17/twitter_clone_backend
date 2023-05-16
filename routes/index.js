const express = require('express');
const app = express.Router();

require('./endpoints/User')(app);
require('./endpoints/Post')(app);
require('./endpoints/Mail')(app);

module.exports = app;