const bcrypt = require('bcryptjs');

function checkPassword(password, hashed){
  return bcrypt.compareSync(password, hashed)
}

module.exports = checkPassword