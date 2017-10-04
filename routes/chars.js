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


router.delete('/:name', function(req, res, next) {
	var nameValue = req.params.name
  removeCharacter({name:nameValue},db, function(result){
  	res.json(result);
  })
  
});

router.post('/', function(req, res, next) {
	createCharacter(req, db, function(result){
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
  removeAllCharacters({},db, function(result){
  	res.json(result);
  })
  
});


//Functions

var createCharacter = function(req, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');

  	var nameVal = req.body.name
	var expVal = req.body.exp
	var strVal = req.body.str
	var dexVal = req.body.dex
	var conVal = req.body.con
	var intVal = req.body.int
	var wisVal = req.body.wis
	var chaVal = req.body.cha

	var classVal = req.body.className
	var initiativeVal = req.body.initiative
	var acVal = req.body.ac
	




	var character = {
    	name : nameVal,
    	exp : expVal,
    	str : strVal,
    	dex : dexVal,
    	con : conVal,
    	int : intVal,
    	wis : wisVal,
    	cha : chaVal,
    	class : classVal,
    	initiative : initiativeVal,
    	ac : acVal,
    	money : {
    		gold : 0,
    		electrum : 0,
    		silver : 0,
    		copper : 0
    	},
    	items : []
	}

  collection.insertOne(character, function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

var insertCharacters = function(db, callback) {
  var collection = db.collection('characters');
  // Insert some documents
  collection.insertMany([
    {
    	name : "Xalph",
    	exp : 345,
    	str : 12,
    	dex : 13,
    	con : 11,
    	int : 8,
    	wis : 16,
    	cha : 10,
    	class : "Druid",
    	initiative : 3,
    	ac : 19,
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
    	exp : 345,
    	str : 12,
    	dex : 11,
    	con : 10,
    	int : 9,
    	wis : 8,
    	cha : 7,
    	class : "Sorcerer",
    	initiative : 2,
    	ac : 15,
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
    console.log(docs)
    callback(docs);
  });
}

var updateCharacter = function(query, target, value, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');
  // Update document where a is 2, set b equal to 1
  collection.updateOne(query
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

var removeAllCharacters = function(query, db, callback) {
  // Get the documents collection
  var collection = db.collection('characters');
  // Delete document where a is 3
  collection.deleteMany(query, function(err, result) {
    assert.equal(err, null);
    callback(result);
  });    
}

module.exports = router;
