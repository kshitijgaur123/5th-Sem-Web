const express = require('express');
var bCrypt = require('bcrypt-nodejs');
const router = express.Router();
const bcrypt = require('bcryptjs');
// Load User model
const User = require('../models/Users');
//Generate Hashed Passwords
var generateHash = function(password) {
 
  return bCrypt.hashSync(password, bCrypt.genSaltSync(8), null);

};
// const { forwardAuthenticated } = require('../config/auth');

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Register Page
router.get('/register', (req, res) => res.render('register'));
router.get('/dashboard',(req,res)=>res.render('dashboard'))
// Register
router.post('/register', async (req, res) => {
  const { name, email, password, password2 } = req.body;
  let errors = [];

  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please enter all fields' });
  }

  if (password != password2) {
    errors.push({ msg: 'Passwords do not match' });
  }

  if (password.length < 8) {
    errors.push({ msg: 'Password must be at least 8 characters' });
  }

  if (errors.length > 0) {
    res.render('register', {
      errors,
      name,
      email,
      password,
      password2
    })

}
else{
  User.findOne({
    where: {
        Email: email
    }
}).then(function(user) {
 
    if (user)
 
    {
      errors.push({ msg: 'Email already taken' });
      res.render('register', {
        errors,
        name,
        email,
        password,
        password2
      })
 
    } else
 
    {
 
        var userPassword = generateHash(password);
 
        var data =
 
            {
                Email: email,
 
                Password: userPassword,
 
                Name: name
 
            };
 
 
        User.create(data).then(function(newUser, created) {
          req.flash('success_msg', 'Yor are now registered and can login')
           res.redirect('/user/login');
 
        });
 
    }
 
});
}
});

// Login Handle
router.post('/login', (req, res) => {
  let e = [];
  const { email, password} = req.body;
  const hpass = generateHash(password);
  User.findOne({
    where: {
        Email: email
    }
}).then(function(user) {
  
    if (!user)
  {
   e.push({msg: 'This email is not registered'});
   res.render('login', {
    e})

  }
  else{
    //console.log(user.Password);
    //console.log(hpass);
    bcrypt.compare(password, user.Password, (err, isMatch)=> {
      if (err) throw err;
      if(isMatch) {
        res.redirect('/user/dashboard');
      }
      else{
        e.push({msg: 'Incorrect password'})
       res.render('login', {
         e})
      }})
    
  }
    
})});


module.exports = router;


