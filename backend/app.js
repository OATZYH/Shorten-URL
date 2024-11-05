const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
require('dotenv').config();

// Initialize Express
const app = express();
// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));
// Passport Config
require('./config/passport')(passport);

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Initialize Passport
app.use(passport.initialize());

// Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const protectedRoutes = require('./routes/protected');
const profileRouter = require('./routes/profile');

app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/protected', protectedRoutes);
app.use('/api/profile', profileRouter);

// Error Handling
app.use(function (req, res, next) {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use(function (err, req, res, next) {
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
