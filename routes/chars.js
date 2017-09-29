var express = require('express');
var router = express.Router();
var assert = require('assert')


/* GET users listing. */
router.get('/all', function(req, res, next) {
  findCharacters({}, db, function(result){
  	  res.json(result);
  })

});

router.get('/find/:name', function(req, res, next) {
  var nameValue = req.params.name
  findCharacters({name:nameValue}, db, function(result){
  	  res.json(result);
  })

});


router.get('/delete/:name', function(req, res, next) {
	var nameValue = req.params.name
  removeCharacter({name:nameValue},db, function(result){
  	res.json(result);
  })
  
});



//Development

router.get('/populate', function(req, res, next) {
  insertCharacters(db, function(result){
  	res.json(result);
  })
  
});

router.get('/purge', function(req, res, next) {
  removeCharacter({},db, function(result){
  	res.json(result);
  })
  
});


//Functions

var insertCharacters = function(db, callback) {
  var collection = db.collection('characters');
  // Insert some documents
  collection.insertMany([
    {
    	name : "Xalph",
    	lvl : 2,
    	str : 12,
    	dex : 13,
    	con : 14,
    	int : 15,
    	wis : 16,
    	cha : 17,
    	money : {
    		gold : 130,
    		electrum : 34,
    		silver : 460,
    		copper : 2000
    	},
    	items : [
    		{
    			name : "Simple spear",
    			property : "1d4+1",
    			dmgType : "Piercing",
    			weight : 50,
    			description : "Sharp stick"
    		},
    		{
    			name : "Advanced spear",
    			property : "1d6+2",
    			dmgType : "Piercing",
    			weight : 50,
    			description : "Even sharper stick"
    		},
    		{
    			name : "Helmet of blindness",
    			property : "+4AC",
    			dmgType : "",
    			weight : 50,
    			description : "Can only be worn backwards"
    		}
    	]

	},    
	{
    	name : "Evon",
    	lvl : 2,
    	str : 12,
    	dex : 11,
    	con : 10,
    	int : 9,
    	wis : 8,
    	cha : 7,
    	money : {
    		gold : 1300,
    		electrum : 340,
    		silver : 46,
    		copper : 200
    	},
    	items : [
    		{
    			name : "Staff of sharpness",
    			property : "1d4+1",
    			dmgType : "Force",
    			weight : 50,
    			description : "Magical sharp stick"
    		},
    		{
    			name : "Cloak of heroism",
    			property : "+1 persuasion",
    			dmgType : "",
    			weight : 50,
    			description : "A blue cloak with a red S in the middle"
    		},
    		{
    			name : "Thieving gloves",
    			property : "+8 slight of hand",
    			dmgType : "",
    			weight : 50,
    			description : "Forces the wearer to steal something once a day if possible"
    		}
    	]

	}
  ], function(err, result) {
    assert.equal(err, null);
    callback(result);
  });
}

var findCharacters = function(query, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');
  // Find some documents
  collection.find(query).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}

var updateCharacter = function(query, target, value, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({query}
    , { $set: { target : value } }, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });  
}

var removeCharacter = function(query, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');
  // Delete document where a is 3
  collection.deleteOne(query, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });    
}

module.exports = router;