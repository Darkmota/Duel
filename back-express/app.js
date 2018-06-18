let express = require('express'),
    https = require('https'),
    http = require('http'),
    path = require('path'),
    cors = require('cors'),
    fs = require('fs'),
    jwt = require('jwt-simple'),
    secret = require('./routes/secret'),
    session = require('express-session'),
    MongoStore = require('connect-mongo')(session),
    //config = require('./common/config'),
    hbs = require('hbs'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    urlencodedParser = bodyParser.urlencoded({ extended: true }),
    app = express();


// view engine setup
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));


let api = require('./routes/api');
let apps = require('./routes/apps');

// app.set(cors({
//     origin: ['http://localhost:8008'],
//     methods: ['GET', 'POST'],
//     alloweHeaders:['Content-Type', '*']
// }));

app.use(bodyParser.json({
    uploadDir: __dirname + '/covers',
    keepExtensions: true,
    limit: '50mb'
}));
app.use(urlencodedParser);
app.use(express.static('public'));

app.all('*', function(req, res, next) {
    req.token = req.headers.auth;
    console.log(req.headers.auth || 'No Auth');
    if (req.token) {
        req.auth = jwt.decode(req.token, secret.jwt_secret);
        if (req.auth.username) {
            if (req.auth.exp >= new Date().getTime()) {
                req.auth = undefined;
            }
        }
    }
    next();
});

app.get('/', function(req, res, next) {
  res.render("OK");
});

app.use('/api', api);
app.use('/app', apps);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({msg: err.message});
});

module.exports = app;
