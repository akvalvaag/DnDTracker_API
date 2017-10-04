var express = require('express');
var router = express.Router();
var assert = require('assert')

router.get('/', function(req, res, next) {
  var nameValue = req.params.name
  totalCurrency(db, function(result){
  	  res.json(result);
  })

});

router.put('/set/:name', function(req, res, next) {
  	var nameValue = req.params.name
  	
  	var goldVal = req.body.gold
	var electrumVal = req.body.electrum
	var silverVal = req.body.silver
	var copperVal = req.body.copper

  setMoney({name : nameValue}, +goldVal, +electrumVal, +silverVal, +copperVal, db, function(result){
  	  res.json(result);
  })

});

router.put('/add/:name', function(req, res, next) {
  	var nameValue = req.params.name
  	
  	var goldVal = req.body.gold
	var electrumVal = req.body.electrum
	var silverVal = req.body.silver
	var copperVal = req.body.copper

  	changeMoney({name : nameValue}, +goldVal, +electrumVal, +silverVal, +copperVal, db, function(result){
  	  res.json(result);
  })

});

router.put('/subtract/:name', function(req, res, next) {
  	var nameValue = req.params.name
  	
  	var goldVal = req.body.gold
	var electrumVal = req.body.electrum
	var silverVal = req.body.silver
	var copperVal = req.body.copper
  changeMoney({name : nameValue}, -goldVal, -electrumVal, -silverVal, -copperVal, db, function(result){
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


var setMoney = function(query, goldVal, electrumVal, silverVal, copperVal, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');

  // Find some documents
  
  	collection.updateOne(query, {$set: {"money.gold" : goldVal}}, function(err, docs) {
    	assert.equal(err, null);
  	});

  	  collection.updateOne(query, {$set: {"money.electrum" : electrumVal}}, function(err, docs) {
    	assert.equal(err, null);
  	});

  	  collection.updateOne(query, {$set: {"money.silver" : silverVal}}, function(err, docs) {
    	assert.equal(err, null);
  	});

  	  collection.updateOne(query, {$set: {"money.copper" : copperVal}}, function(err, docs) {
    	assert.equal(err, null);
    	callback(docs)
  	});
}

var changeMoney = function(query, goldVal, electrumVal, silverVal, copperVal, db, callback) {
  var collection = db.collection('characters');

  	  collection.updateOne(query, {$inc: {"money.gold" : goldVal}}, function(err, docs) {
    	assert.equal(err, null);
  	});
  	  collection.updateOne(query, {$inc: {"money.electrum" : electrumVal}}, function(err, docs) {
    	assert.equal(err, null);
  	});
  	  collection.updateOne(query, {$inc: {"money.silver" : silverVal}}, function(err, docs) {
    	assert.equal(err, null);
  	});

  	  collection.updateOne(query, {$inc: {"money.copper" : copperVal}}, function(err, docs) {
    	assert.equal(err, null);
    	callback(docs)
  	});
}

module.exports = router;