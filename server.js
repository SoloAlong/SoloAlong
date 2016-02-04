const express = require('express');
const app = module.exports = exports = express();
const jsonParser = require('body-parser').json();
const mongoose = require('mongoose');
const fs = require('fs');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/soloDev');

var Message = mongoose.model('Message', new mongoose.Schema({
  msg: String
}));


app.post('/api/message', jsonParser, (req, res) => {
  var msg = new Message(req.body);
  msg.save((err, data) => {
    if (err) return res.status(500).json({ msg: 'server err' });
    console.log('server err with : ' + data);
    res.json(msg);
  });
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  var index = fs.createReadStream(__dirname + '/public/index.html');
  index.pipe(res);
});

app.get('/index', (req, res) => {
  var index = fs.createReadStream(__dirname + '/public/index.html');
  index.pipe(res);
});

app.get('/home', (req, res) => {
  var index = fs.createReadStream(__dirname + '/public/index.html');
  index.pipe(res);
});

app.get('/profiles', (req, res) => {
  var index = fs.createReadStream(__dirname + '/public/profile.html');
  index.pipe(res);
});

app.get('/chordsInKey', (req, res) => {
  var index = fs.createReadStream(__dirname + '/public/chordsInKey.html');
  index.pipe(res);
});

const s_router = require(__dirname + '/routes/router');
const authRouter = require(__dirname + '/routes/auth_router');

app.use('/', s_router);
app.use('/', authRouter);

var PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('server up on port: ' + PORT));
