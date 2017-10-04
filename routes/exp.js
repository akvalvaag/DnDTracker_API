var express = require('express');
var router = express.Router();
var assert = require('assert')

router.get('/', function(req, res, next) {
  getExp(db, function(result){
  	  res.json(result);
  })

});

router.put('/add/:amount', function(req, res, next) {
  var amountValue = req.params.amount
  updateExp(+amountValue, db, function(result){
      res.json(result);
  })

});

router.put('/subtract/:amount', function(req, res, next) {
  var amountValue = req.params.amount
  updateExp(-amountValue, db, function(result){
      res.json(result);
  })

});

router.patch('/divide', function(req, res, next) {
  divide(db, function(result){
      res.json(result);
  })

});



//Functions
var getExp = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('exp');

  // Find some documents
  collection.findOne({},function(err, docs) {
    assert.equal(err, null);

    var expVal = 0

    if(docs === null){
      collection.insert({exp : 0})

      callback({
        exp : 0
      });

    } else {
      callback(docs);
    }

  });

}


var divide = function(db, callback) {
    var expCollection = db.collection('exp');
    var charCollection = db.collection('characters');

    expCollection.findOne({}, function(err, expDocs){
      charCollection.count({}, function(err, count){

        console.log(expDocs.exp)
        console.log(count)

        var expAmount = expDocs.exp
        var charsAmount = count

        var amount = Math.floor(expAmount/charsAmount);

        charCollection.updateMany({}, {$inc: {exp : amount}}, function(err, docs) {
          assert.equal(err, null);
          updateExp(-expAmount, db, callback)
        });
      });
    });

}

var updateExp = function(amount, db, callback) {
    var collection = db.collection('exp');

    collection.updateOne({}, {$inc: {exp : amount}}, function(err, docs) {
      assert.equal(err, null);
      collection.findOne({},function(err, docs) {
        callback(docs)
      });
    });
}


module.exports = router;