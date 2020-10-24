const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const expressLayouts = require('express-ejs-layouts')
const flash = require('connect-flash');
const session = require('express-session');

const app = express();
const port = process.env.PORT || 5000;

const db = require('./config/database');
// TESTING DB
db.authenticate()
  .then(()=>console.log('Database Connected'))
  .catch(err=>console.log(err))



// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Express body parser
app.use(express.urlencoded({ extended: true }));

// Express session
app.use(
  session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  })
);


// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.use('/', require('./routes/index.js'));
app.use('/user',require("./routes/user"));




app.listen(port, ()=>{

    console.log(`Listening at port: ${port}`);
})