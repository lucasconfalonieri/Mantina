var jwt = require('jsonwebtoken');
var dbConn = require('../core/DataBaseManager');

module.exports = {
    isLoggedIn (req, res, next) {
        if (req.isAuthenticated()) {
            return next();
        }
        return res.json({message: 'usuario no logueado'});;
    },

    isNotLoggedIn (req, res, next) {
        if (!req.isAuthenticated()) {
            return next();
        }
        return res.json({message: 'usuario logueado'});
    },

    ensureToken(req, res, next){
        const bearerHeader = req.headers['authorization'];
        if(typeof bearerHeader !== 'undefined'){
            const bearer = bearerHeader.split(" ");
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
        }
    
    },
    validate(req, res, next){
        jwt.verify(req.token, process.env.JWT_SECRET, (err, data) => {
            if (err) {
              res.status(409).json({
                status: 'error',
                message: err,
              });
            } else {
              const { user } = req.body;
              const { token } = req;
              dbConn.query('SELECT * FROM forgotpassword WHERE user like ? and hash like ?', [user, token], function (err, result) {
        
                if (err) {
                  res.status(409).json({
                    status: 'error',
                    message: err,
                  });
                } else {
                  if (result.length == 1) {
        
                    next();
                    
                  } else {
                    res.status(802).json({
                      status: 'error',
                      message: 'usario y hash inexistantes',
                    });
        
                  }
        
                }
        
              });
            }
          
        
          }
        
        
        
          );
        


    }
};