const User = require(__dirname + '/../models/user');
const handleDBError = require(__dirname + '/../lib/handleDBerror');

module.exports = exports = function(req, res) {
  var newUser = new User();
  newUser.username = req.body.user.name;
  newUser.authentication.email = req.body.email;
  newUser.authentication.password = newUser.hashPassword(req.body.password);
  newUser.save((err, data) => {
    if (err) return handleDBError(err);
    console.log(data._id);
    return res.status(200).json( { token: data.generateToken() } );
  });

};
