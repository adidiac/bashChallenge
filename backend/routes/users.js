var express = require('express');
var router = express.Router();
// import UserSchema from '../models/UserSchema';
const User=require('../UserSchema');
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// make a register route
router.post('/register', function(req, res, next) {
  // get the username and password from the request
  const username = req.body.username;
  const password = req.body.password;
  // create a new user
  const user = new User({
    username: username,
    password: password,
    reports:[]
  });
  // save the user to the database
  user.save()
    .then(() => {
      res.send('user created successfully');
    }
    )
    .catch(err => {
      res.send('error: ' + err);
    }
    );
}
);
// make a login route
router.post('/login', function(req, res, next) {
  // get the username and password from the request
  const username = req.body.username;
  const password = req.body.password;
  // find the user in the database
  User.findOne({
    username: username,
    password: password
  })
    .then(user => {
      // if the user exists
      if (user) {
        // send a response
        res.send(user);
      } else {
        // if the user does not exist
        res.send('user not found');
      }
    }
    )
    .catch(err => {
      res.send('error: ' + err);
    }
    );
}
);

module.exports = router;
