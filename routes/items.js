var express = require('express');
var router = express.Router();
var assert = require('assert')

router.get('/:name', function(req, res, next) {
  var nameValue = req.params.name
  getItems(nameValue, db, function(result){
  	  res.json(result);
  })

});

router.post('/:name', function(req, res, next) {
  var nameValue = req.params.name
  giveItem(nameValue, req, db, function(result){
      res.json(result);
  })

});

router.delete('/:name/:itemName', function(req, res, next) {
  var nameValue = req.params.name
  var itemValue = req.params.itemName
  removeItem(nameValue, itemValue,  db, function(result){
      res.json(result);
  })

});


//Functions
var getItems = function(nameValue, db, callback) {
  //Get all items by char name
   var collection = db.collection('characters');

   collection.find({name:nameValue}, {_id:0, items:1}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log(docs)
    callback(docs);
  });
}


var giveItem = function(nameValue, req, db, callback) {
  //Add item to user with given name
   var collection = db.collection('characters');

  var itemNameVal = req.body.name
  var propertyVal = req.body.property
  var dmgTypeVal = req.body.dmgType
  var weightVal = req.body.weight
  var descriptionVal = req.body.description


  var item = {
                name: itemNameVal,
                property: propertyVal,
                dmgType: dmgTypeVal,
                weight: weightVal,
                description: descriptionVal
            }

  collection.update(
    { name: nameValue }, 
    {$addToSet: {items: item}} ,function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

var removeItem = function(nameValue, itemValue, db, callback) {
  //Remove item from user with given name
  var collection = db.collection('characters');

  collection.update(
    { name : nameValue },
    { $pull: { items: { name : itemValue} } }
  , function(err, result) {
    assert.equal(err, null);
    callback(result);
  });   
}

module.exports = router;