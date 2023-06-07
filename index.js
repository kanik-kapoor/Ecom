const express = require("express");
const router = require("./routes/index");
const cartRouter = require("./routes/shoppingCart.js");
const app = express();
const hbs = require('hbs');
const coneectDB = require("./db.js");
const passport = require('passport');
const session = require('express-session');
const {initializingPassport} = require('./controllers/auth.js')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());

initializingPassport(passport);
coneectDB();
app.use(session({secret: "cats"}));
app.use(passport.initialize());
app.use(passport.session());

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}

// app.get('/', function (req, res) {
//     router.Index(req, res);
// });

// app.get('/user', isLoggedIn, function (req, res) {
//     router.home(req, res);
// });


app.use(express.static(__dirname + '/public'));
app.use(express.json())
app.set('view engine', '.hbs');
app.set('view options', { layout: '/layouts/main' });
app.use(express.json());

//app.engine('.hbs', expressHbs.engine({ extname: '.hbs', defaultLayout: "main"}));

 
app.use('/cart', cartRouter)
app.use('/', router)


app.listen(3000, () =>{
    console.log('http://localhost:3000');
})