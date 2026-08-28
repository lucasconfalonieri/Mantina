var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var subjectsRouter = require('./routes/subjects');
var topicsRouter = require('./routes/topics');
var subtopicsRouter = require('./routes/subtopics');
var contentsRouter = require('./routes/contents');
var loginRouter = require('./routes/login');
var mailsRouter = require('./routes/mails');
var treeviewRouter = require('./routes/treeview.js');
var studentcontents = require('./routes/studentcontents.js');
var studenttopics = require('./routes/studenttopics.js');
var contentstopics = require('./routes/contentstopics.js')
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);
const flash = require('connect-flash');
const passport = require('passport');
const { database } = require('./keys');


var cors = require('cors');
var app = express();
require('./core/passport');

//Swagger
const swaggerJsdoc = require('swagger-jsdoc');
const optionsSwagger = require('./core/SwaggerManager.js');

const specs = swaggerJsdoc(optionsSwagger);
const swaggerUi = require('swagger-ui-express');

//app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));


// Cors
app.use(cors());

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Middlewares
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  store: new MySQLStore(database)
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});



// Routes
app.use('/', indexRouter);
app.use('/subjects', subjectsRouter);
app.use('/topics', topicsRouter);
app.use('/subtopics', subtopicsRouter);
app.use('/contents', contentsRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/mails', mailsRouter);
app.use('/treeview', treeviewRouter);
app.use('/studentcontents', studentcontents);
app.use('/studenttopics', studenttopics);
app.use('/contentstopics', contentstopics)
app.use('/public', express.static(path.join(__dirname,'/storage')))

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
