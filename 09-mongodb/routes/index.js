var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'login' });
});

router.post('/login', function (req, res, next) {
  var item = {
    username: req.body.username,
    password: req.body.password
  };

  mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (error, db) {
    assert.equal(null, error);
    var dbo = db.db("test");
    var collection = dbo.collection('user-login');

    collection.insertOne(item, function (error, result) {
      assert.equal(null, error);
      console.log('Item Inserted!');
      console.log(item);
      db.close();

      res.render('message', { title: 'Success!', message: 'Item inserted!' });
    });
  });
});

router.get('/userlist', function (req, res, next) {

  var resultArray = [];
  mongo.MongoClient.connect(url, { useNewUrlParser: true }, function (error, db) {
    assert.equal(null, error);

    var dbo = db.db("test");
    var cursor = dbo.collection('user-login').find();

    cursor.forEach(function (doc, error) {
      assert.equal(null, error);
      resultArray.push(doc);
      console.log(resultArray);
    }, function () {
      db.close();
      res.render('message', { array: resultArray });
    });
  });
});

module.exports = router;
