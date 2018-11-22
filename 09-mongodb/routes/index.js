var express = require('express');
var router = express.Router();
const mongo = require('mongodb');
const assert = require('assert');

const url = 'mongodb://localhost:27017/test';

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'GET and POST' });
});

router.post('/test/submit', function (req, res, next) {
  var item = {
    id: req.body.id
  };

  mongo.MongoClient.connect(url,{ useNewUrlParser: true }, function(error, db){
    assert.equal(null, error);
    var dbo = db.db("mydb");
    var collection = dbo.collection('user-data');
    
    collection.insertOne(item, function(error, result) {
      assert.equal(null, error);
      console.log('Item Inserted!');
      db.close();
    });
  });
});

module.exports = router;
