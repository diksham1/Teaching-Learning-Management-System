const express = require('express')
const router = express.Router()
const dbconn = require('./dbconn')

router.get('/login', function (req, res) {	
	res.json({'statusCode': 200});
})

/**
 * Creates a new user entry in the database
 * @todo find a secure way to transfer password over wire
 * @todo Use a logger instead to writing errors to console
 */
router.post('/users', async function(req, res) {
	try {
		const db = await dbconn();
		const user = req.body;
		const col = db.collection("User");
		const insertResponse = await col.insertOne(user);
		res.json({
			"statuscode": 201,
			"_id": insertResponse["ops"][0]["_id"],
			"result": true	
		});	
	} catch(e) {
		console.log(e);
		return res.json({
			"statuscode": "500",
			"result": false
		})
	}
})

module.exports = router;
