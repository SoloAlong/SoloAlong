const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/handleDBError');

module.exports = exports = function(req, res) {
  var newUser = new User();
  newUser.username = req.body.username;
  newUser.authentication.email = req.body.email;
  newUser.authentication.password = newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if (err) return handleDBError(err);
    return res.status(200).json( { msg: 'Success in signup!' } );
  });

};
