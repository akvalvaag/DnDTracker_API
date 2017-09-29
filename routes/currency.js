var express = require('express');
var router = express.Router();
var assert = require('assert')

router.get('/', function(req, res, next) {
  var nameValue = req.params.name
  totalCurrency(db, function(result){
  	  res.json(result);
  })

});

var totalCurrency = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');

  var goldCount = 0
  var silverCount = 0
  var electrumCount = 0
  var copperCount = 0

  // Find some documents
  collection.find({}, {_id:0, money:1}).toArray(function(err, docs) {
    assert.equal(err, null);
    	for (var i = docs.length - 1; i >= 0; i--) {
    		goldCount += docs[i].money.gold
    		electrumCount += docs[i].money.electrum
    		silverCount += docs[i].money.silver
    		copperCount += docs[i].money.copper
    	}

    	
    callback({
    	gold:goldCount,
    	electrum:electrumCount,
    	silver:silverCount,
    	copper:copperCount
    });
  });
}


var updateMoney = function(quesry, type, amount, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');

  // Find some documents
  collection.updateOne({query}, {$set: {type : amount}}, function(err, docs)) {
    assert.equal(err, null);

    	
    callback(
  });
}

module.exports = router;