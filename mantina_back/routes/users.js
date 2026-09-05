var express = require('express');
var router = express.Router();
var dbConn  = require('../core/DataBaseManager');
var jwt = require('jsonwebtoken');
const { ensureToken } = require('../core/auth');

/* GET users listing. */
router.get('/', ensureToken, function(req, res, next) {
    jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
        if(err){
          res.status(409).json({
            status: 'error',
            message: err,
          });
        } else {

    dbConn.query('SELECT id_user, name, user, is_admin FROM users',function(err,users)     {

        if(err) {
            res.status(409).json({
                status: 'error',
                message: err,
              });
        } else {


          var usersPrivileges=[];
          users.forEach(user => {
              var userCustom = {"id_user": user.id_user, "name": user.name, "email": user.user,
               "is_admin": !!user.is_admin, "has_privileges": false };

              usersPrivileges.push(userCustom)

          });


            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({ users: usersPrivileges}));
         }
    });
}
});
});

router.put('/:idUser',ensureToken, function(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
      if(err){
        res.status(409).json({
          status: 'error',
          message: err,
        });
      } else {
          const { email } = req.body;
          const { name } = req.body;
          const { is_admin } = req.body;
          const { idUser } = req.params;
          const query = `
          UPDATE users SET  name = ? , user = ?, is_admin = ?
          WHERE id_user = ?;
          `;

          dbConn.query(query,[ name , email, is_admin ? 1 : 0, idUser ], function(err,rows)     {
              if(err) {
                  res.status(409).json({
                      status: 'error',
                      message: err,
                  });
              } else {
                  res.json({ Status: 'User Updated'});
              }
          });
      }
  });
});

router.delete('/:idUser',ensureToken, function(req, res, next) {
  jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
      if(err){
        res.status(409).json({
          status: 'error',
          message: err,
        });
      } else {
          const { idUser } = req.params;
          const query = `
          DELETE FROM users
          WHERE id_user = ?;
          `;

          dbConn.query(query,[ idUser ], function(err,rows)     {
              if(err) {
                  if(err.code == 'ER_ROW_IS_REFERENCED_2'){
                      res.status(910).json({
                          status: 'error',
                          message: err,
                      });
                  }else{
                  res.status(409).json({
                      status: 'error',
                      message: err,
                  });}
              } else {
                  res.json({ Status: 'User Deleted'});
              }
          });
      }
  });
});

module.exports = router;