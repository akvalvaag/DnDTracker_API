var express = require('express');
var router = express.Router();
var assert = require('assert')

router.get('/', function(req, res, next) {
  var nameValue = req.params.name
  totalCurrency(db, function(result){
  	  res.json(result);
  })

});

router.put('/:name/:type/:amount', function(req, res, next) {
  var nameValue = req.params.name
  var typeValue = req.params.type
  var amountValue = req.params.amount
  updateMoney({name : nameValue}, typeValue, amountValue, db, function(result){
  	  res.json(result);
  })

});

//Functions
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


var updateMoney = function(query, typeVal, amountVal, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');

  // Find some documents
  if(typeVal === gold){
  	  collection.updateOne(query, {$set: {gold : amountVal}}, function(err, docs) {
    	assert.equal(err, null);
    	callback(docs)
  	});
  } else if(typeVal === electrum){
  	  collection.updateOne(query, {$set: {electrum : amountVal}}, function(err, docs) {
    	assert.equal(err, null);
    	callback(docs)
  	});
  } else if(typeVal === silver){
  	  collection.updateOne(query, {$set: {silver : amountVal}}, function(err, docs) {
    	assert.equal(err, null);
    	callback(docs)
  	});
  } else if(typeVal === copper){
  	  collection.updateOne(query, {$set: {copper : amountVal}}, function(err, docs) {
    	assert.equal(err, null);
    	callback(docs)
  	});
  }
}

module.exports = router;