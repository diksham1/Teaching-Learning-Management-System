const express = require('express')
const router = express.Router()

router.get('/login', function (req, res) {
	// login code here
	console.log(req)
	res.json({'statusCode': 200});
})

module.exports = router;
