const jwt = require('jsonwebtoken');
const Manager = require('../schemas/manager');

async function getJWTToken(req, res) {
  let manager = await Manager.findOne({pin: req.body.pin});
  console.log(manager);
  const token = jwt.sign({ id: manager._id,
                           name: manager.name },
                           process.env.SECRET, {
                          expiresIn: '1d'
                        });
      return res.json({ auth: true, token: token });
}

module.exports = getJWTToken;
