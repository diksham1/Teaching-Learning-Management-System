const express = require('express')
const router = express.Router()
const MongoClient = require('mongodb').MongoClient;

router.get('/login', function (req, res) {
	// login code here
	/*
const uri = "mongodb+srv://tlms:<password>@tlms.1so97.mongodb.net/<dbname>?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});

*/
	console.log(req)
	res.json({'statusCode': 200});
})

module.exports = router;
