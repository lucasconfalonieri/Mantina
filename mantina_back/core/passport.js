const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

var dbConn  = require('./DataBaseManager');
const helpers = require('./helpers');


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
    const { name } = req.body;
    let newUser = {
        name,
        user,
        password
    };
    newUser.password = await helpers.encryptPassword(password);

    const query = ` INSERT INTO users (user, password, name ) VALUES (?, ?, ?)`;
    const result = dbConn.query(query,[newUser.user , newUser.password , newUser.name], function(err,rows) {
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