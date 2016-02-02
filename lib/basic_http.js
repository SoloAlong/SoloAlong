const zeroBuffer = require(__dirname + '/zero_buffer.js');

module.exports = exports = function(req, res, next) {

  try {
    console.log(req.headers.authorization);
    var authString = req.headers.authorization;
    console.log(authString);
    var base64String = authString.split(' ')[1];
    console.log(base64String);
    var authBuf = new Buffer(base64String, 'base64');
    var utf8AuthString = authBuf.toString();
    console.log(utf8AuthString);
    var authArr = utf8AuthString.split(':');
    console.log(authArr);

    zeroBuffer(authBuf);

    if (authArr[0].length && authArr[1].length) {
      req.basicHTTP = {
        email: authArr[0],
        password: authArr[1]
      };
      console.log(req.basicHTTP);
      return next();
    }
  } catch (e) {
    console.log(e);
  }

  res.status(401).json({ msg: 'Could not authenticate.' });
};
