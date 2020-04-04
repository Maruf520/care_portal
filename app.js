const express = require('express');
const path = require('path');
const app = express();
const router = require('express').Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
var expresshbs = require('express-handlebars');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');
const logger = require('./config/logger');
dotenv.config();
mongoose.connect(process.env.DB_CONNECT,{useNewUrlPar:  true},() => logger.info('info','Db Connected!'));

//use sessions for tracking logins
app.use(session({
  secret: 'heltcareproject',
  resave: true,
  saveUninitialized: false,
  cookie: { maxAge: 1800000 }
}));

var hbss = require('express-hbs');
var hbs = expresshbs.create({
  defaultLayout: 'layout',
  extname: '.hbs',
  // Specify helpers which are only registered on this instance.
  helpers: {
    compare: function(lvalue, operator, rvalue, options) {

      if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'compare' needs 2 parameters");

      var operators = {
        '==':       function(l,r) { return l == r; },
        '===':      function(l,r) { return l === r; },
        '!=':       function(l,r) { return l != r; },
        '<':        function(l,r) { return l < r; },
        '>':        function(l,r) { return l > r; },
        '<=':       function(l,r) { return l <= r; },
        '>=':       function(l,r) { return l >= r; },
        'typeof':   function(l,r) { return typeof l == r; }
      }

      if (!operators[operator])
        throw new Error("Handlerbars Helper 'compare' doesn't know the operator "+operator);

      var result = operators[operator](lvalue,rvalue);

      if( result ) {
        return options.fn(this);
      } else {
        return options.inverse(this);
      }

    },
    math: function(lvalue, operator, rvalue, options) {

      if (arguments.length < 3)
        throw new Error("Handlerbars Helper 'math' needs 2 parameters");

      var operators = {
        '+':       function(l,r) { return l + r; },
        '/':      function(l,r) { return l / r; },
        '*':       function(l,r) { return l * r; },
        '-':        function(l,r) { return l - r; }
      }

      if (!operators[operator])
        throw new Error("Handlerbars Helper 'math' doesn't know the operator "+operator);

      var result = operators[operator](Number(lvalue), Number(rvalue));

      if( result ) {
        return options.fn(result);
      } else {
        return options.inverse(this);
      }

    },
    times: function(start, n, block) {
      var accum = '';
      for(var i = Number(start); i <= n; ++i)
          accum += block.fn(i);
      return accum;
    }
  }
});
// Use `.hbs` for extensions and find partials in `views/partials`.
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, '/public')));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
app.listen(4000, () => logger.debug('server up and runnig at '+"http://localhost:"+4000));
const input = require('./routes/in');
const indexrout = require('./routes/index');
app.use('/',indexrout);


app.use('/',input);
