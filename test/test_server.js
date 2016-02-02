const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');
const authRouter = require(__dirname + '/../routes/auth_router.js');
mongoose.connect('mongodb://localhost/test_app_dev');

app.use(authRouter);

var PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log('server up'));
