var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
const passport = require('passport');
var dbConn = require('../core/DataBaseManager');
const { sendEmail } = require('../core/EmailUtils');
const { ensureToken, validate} = require('../core/auth');

router.post('/signup', passport.authenticate('local.signup', {}), function (req, res) {
  const userId = { id: res.id_user };
  const token = jwt.sign({ userId }, 'my_secret_key', {
    expiresIn: 60 * 60
  });
  res.json({ auth: { token } });
});

router.post('/signin',
  passport.authenticate('local.signin', {}),
  function (req, res) {
    const userId = { id: req.session.passport.user.id_user };
    const token = jwt.sign({ userId }, 'my_secret_key', {
      expiresIn: 60 * 60
    });
    res.json({ auth: { token } });
  });

router.get('/logout', (req, res) => {
  req.logOut();
  res.json({ message: 'usuario deslogueado' });
});

router.post('/signina',
  passport.authenticate('local.signin', {}),
  function (req, res) {
    const userId = { id: req.session.passport.user.id_user };
    if (userId.id == 19 || userId.id ==20) {
      const token = jwt.sign({ userId }, 'my_secret_key', {
        expiresIn: 60 * 60
      });
      res.json({
        auth: { token }
      });
    }
    else {
      res.status(403).json({
        status: 'Invalid User',
        message: 'Invalid User',
      });
    }
  });

router.get('/forgotpassword/:user', function (req, res, next) {
  const { user } = req.params;

  dbConn.query('SELECT * FROM users WHERE user like ?', [user], function (err, result) {

    if (err) {
      res.status(409).json({
        status: 'error',
        message: err,
      });
    } else {
      if (result.length == 1) {

        const token = jwt.sign({ user }, 'my_secret_key', {
          expiresIn: 60 * 60
        });

        const query = ` INSERT INTO forgotpassword (user,hash) VALUES ( ?, ?)`;
        dbConn.query(query, [user, token], function (err, rows) {
          if (err) {
            res.status(409).json({
              status: 'error',
              message: err,
            });
          } else {

            req.email = user;
            req.msj = "<h3> Hola " + result[0].name + "! <br/>para cambiar tu contrase&#241;a ingresa al siguiente link: <a href='www.mantina.com/ingresarcontrasena/"
              + user + "/" + token + "' target='_blank'>LINK</a></h3>";
            req.subject = 'Recupero de credenciales';
            sendEmail(req, res);
          }
        });


      } else {
        res.status(801).json({
          status: 'error',
          message: 'usario inexistante',
        });

      }
    }
  });

});

router.put('/forgotpassword', ensureToken, validate, passport.authenticate('local.updatepassword', {}),
function (req, res) {
  const userId = { id: res.id_user };
  const token = jwt.sign({ userId }, 'my_secret_key', {
    expiresIn: 60 * 60
  });
  res.json({ auth: { token } });
});
module.exports = router;