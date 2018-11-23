var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.redirect('/login');
});

router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });
});

router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

router.get('/users', function (req, res, next) {

  var resultArray = [];
  mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (error, db) {
    assert.equal(null, error);

    var dbo = db.db("test");
    var cursor = dbo.collection('users').find();

    cursor.forEach(function (doc, error) {
      assert.equal(null, error);
      resultArray.push(doc);
      console.log(resultArray);
    }, function () {
      db.close();
      res.render('users', { array: resultArray });
    });
  });
});

router.post('/login-submit', function (req, res, next) {
  var email = req.body.email;
  var password = req.body.password;
  console.log("\n\n**************************");
  console.log("Email: " + email + "\nPassword: " + password);
  console.log("**************************\n\n");

  mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (error, db) {
    assert.equal(null, error);

    var dbo = db.db("test");
    dbo.collection('users').findOne({ email: email }, function (error, user) {

      if (user === null) {
        res.end("Login invalid");
      } else if (user.email === req.body.email && user.password === req.body.password) {
        console.log(user);
        res.render('message', { title: "Hi "+ user.name, message: "You have logged in successfully."});
      } else {
        res.end("Credentials wrong");
      }
    });
  });
});

router.post('/register-submit', function (req, res, next) {
  var item = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password
  };

  mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (error, db) {
    assert.equal(null, error);
    var dbo = db.db("test");
    var collection = dbo.collection('users');

    collection.insertOne(item, function (error, result) {
      assert.equal(null, error);
      console.log('Item Inserted!');
      console.log(item);
      db.close();
      res.redirect('/login');
    });
  });
});

module.exports = router;
