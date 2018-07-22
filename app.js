require('dotenv').config();
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const logger = require('morgan');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const MongoStore = require('connect-mongo')(session);

const indexRouter = require('./routes/indexRouter');
const userRouter = require('./routes/userRouter');
const postRouter = require('./routes/postRouter');
const commentRouter = require('./routes/commentRouter');

mongoose
  .connect(
    process.env.MONGO_URL,
    { useNewUrlParser: true }
  )
  .then(
    () => console.log('connected to DB'),
    err => console.log('trying to reconnect')
  );

const db = mongoose.connection;
const app = express();
const sessionOption = {
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: db }),
  cookie: {
    maxAge: 600000,
  },
  resave: false,
  saveUninitialized: true,
};
if (app.get('env') === 'production') {
  app.set('trust proxy', 1); // trust first proxy
  sessionOption.cookie.secure = true; // serve secure cookies
}
app.use(session(sessionOption));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const auth = require('./handlers/authHandler');

auth(passport);
app.use(passport.initialize());
app.use(passport.session());

// middleware that assigns useful details to be used in views
app.use((req, res, next) => {
  app.locals.appName = 'Medium Clone';
  app.locals.baseUrl = 'http://localhost:3000';
  app.locals.loginedUser = req.user;
  next();
});

app.use('/users', userRouter);
app.use('/post', postRouter);
app.use('/comment', commentRouter);
app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
