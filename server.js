const express = require('express');
const app = module.exports = exports = express();
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/soloDev');

const s_router = require(__dirname + '/routes/router');
const authRouter = require(__dirname + '/routes/auth_router');

app.use(express.static(__dirname + '/public'));
app.use('/', s_router);
app.use('/', authRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
