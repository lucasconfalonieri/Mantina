const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const jwt = require('jsonwebtoken');

var dbConn  = require('./DataBaseManager');
const helpers = require('./helpers');

// Only an already-authenticated admin's own request may grant is_admin to a
// user being created - otherwise anyone hitting the public /login/signup
// endpoint could self-elevate to backoffice access.
function callerIsAdmin(req) {
  return new Promise((resolve) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader) return resolve(false);

    const token = authHeader.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err || !decoded || !decoded.userId || !decoded.userId.id) return resolve(false);

      dbConn.query('SELECT is_admin FROM users WHERE id_user = ?', [decoded.userId.id], (err, rows) => {
        resolve(!err && rows.length > 0 && !!rows[0].is_admin);
      });
    });
  });
}


passport.use('local.signin', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, user, password, done) => {
    
    dbConn.query('SELECT * FROM users WHERE user = ? ', [user], async function(err,rows)     {

        if(err) {
          done(err, false, console.log('message', err));

        } else {
            if (rows.length > 0) {
                const userLog = rows[0];
                const validPassword = await helpers.matchPassword(password, userLog.password)
                if (validPassword) {
                  done(null, userLog, console.log('success', 'Welcome ' + userLog.user));
                } else {
                  err = new Error('Incorrect Password');
                  err.status = 901;
                  done(err, false, console.log('message',  err));
                }
              } else {
                err = new Error('The Username does not exists.');
                err.status = 902;
                done(err, false, console.log('message',  err));
              }
        }
    });
}));
    

passport.use('local.signup', new LocalStrategy({
    usernameField: 'user',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, user, password, done) => {
    const { name, is_admin } = req.body;
    const isAdminGranted = is_admin && await callerIsAdmin(req);
    let newUser = {
        name,
        user,
        password,
        is_admin: isAdminGranted ? 1 : 0
    };
    newUser.password = await helpers.encryptPassword(password);

    const query = ` INSERT INTO users (user, password, name, is_admin ) VALUES (?, ?, ?, ?)`;
    const result = dbConn.query(query,[newUser.user , newUser.password , newUser.name, newUser.is_admin], function(err,rows) {
      if(err) { 
        err = new Error('UNIQE USERNAME');
        err.status = 903;
        done(err, false, console.log('message',  err));
      } else { 
        console.log({ Status: 'User saved'});
        done(null, newUser);
      } 
    });

    
}));


passport.use('local.updatepassword', new LocalStrategy({
  usernameField: 'user',
  passwordField: 'password',
  passReqToCallback: true
}, async (req, user, password, done) => {
    let newUser = {
        user,
        password
    };
    newUser.password = await helpers.encryptPassword(password);

    const query = ` UPDATE users SET  password = ? WHERE user = ?;`;
    const result = dbConn.query(query,[newUser.password , user ], function(err,rows) {
      if(err) { 
        err.status = 904;
        done(err, false, console.log('message',  err));
      } else { 
        if(rows.affectedRows == 1){
        console.log({ Status: 'Password updated'});
        done(null, newUser);
        } else{
          err = new Error('Cold not update pasword');
          err.status = 905;
          done(err, false, console.log('message',  err));
        }
      } 
    });

  


}));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser(async (user, done) => {
  await dbConn.query('select * from users where user = ? ', user.user,function(err,rows){	
    done(err, rows[0]);
  });
});