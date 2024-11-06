const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const passport = require('passport');
const cors = require('cors');
const initializePassportJWT = require('./config/passport');
require('dotenv').config();

// Initialize Express
const app = express();
// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// CORS Configuration
const corsOptions = {
  origin: ['http://localhost:5173', 'https://synerry-test.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true,
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));

// Preflight request handling
app.options('*', cors(corsOptions));

// Initialize Passport with JWT strategy
initializePassportJWT(passport);
app.use(passport.initialize());

// Routes
const indexRouter = require('./routes/index');
const authRoutes = require('./routes/auth');
const usersRouter = require('./routes/users');
const urlRoutes = require('./routes/url');

app.use('/', indexRouter);
app.use('/api/auth', authRoutes);
app.use('/api/auth/user', usersRouter);
app.use('/api/urls', urlRoutes);

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
