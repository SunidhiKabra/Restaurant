const http = require('http');
const express = require('express');
const accountSid = 'ACa85c7b7f567b95194f8868555ebe16be';
const authToken = 'e58077322dda5c40a269f6c043c89559';
const client = require('twilio')(accountSid, authToken);
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const jsonwebtoken = require("jsonwebtoken");
const order = require('./model/OrderModel');
const customer = require('./model/Customermodel');
const bookings = require('./model/Bookingmodel');
const admin = require('./model/AdminModel');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var auth = require('./auth.js');
const app = express();

//var Task = mongoose.model('inclass03');
// var medi = new Task();
// var user ;
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://archit:archit@cluster0-axmyu.mongodb.net/test?retryWrites=true');

app.set('view engine', 'ejs');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(session({ secret: 'this-is-a-secret-token', cookie: { maxAge: 60000 }}));

//sunidhi;switch

app.use('/resources', express.static('resources'));

app.get('/', function(req, res){
  res.render('index.ejs');
});

app.get('/adminLogin', urlencodedParser, function(req, res, next){
  var username = "admin1";
  req.session.admin = username;
  res.render('dashboard');
});

app.get('/bookings', auth.sessionChecker, function(req, res){
  res.render('bookings');
});

app.get('/customerReservations', auth.sessionChecker, function(req, res, next){
    res.render('customerReservations');
});

app.get('/menu', auth.sessionChecker, function(req, res){
  res.render('menu');
});

app.get('/logout', function(req, res){
  req.session.admin= null;
  // res.render('index');
  res.redirect('/');
});
// end of sunidhi's

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


app.use(express.static('WebApp'))


app.get('/index.html',function(req,res){
 res.sendFile(__dirname+'/WebApp/index.html');
 //__dirname : It will resolve to your project folder.
});




app.use((req, res, next) => {
 res.header("Access-Control-Allow-Origin", "*");
 res.header(
   "Access-Control-Allow-Headers",
   "Origin, X-Requested-With, Content-Type, Accept, Authorization"
 );
 if (req.method === "OPTIONS") {
   res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
   return res.status(200).json({});
 }
 next();
});



var routes = require('./Routes/routes'); //importing route
  routes(app); //register the route




http.createServer(app).listen(1337, () => {
  console.log('Express server listening on port 1337');
});
