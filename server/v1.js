const express = require('express')
const router = express.Router()
const dbconn = require('./dbconn')
const createInviteCode = require('./createInviteCode')
const createLiveClassLink = require('./createLiveClassLink')

const errorOccuredResponse = {
	"status": 500,
	"result": false
}

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
		return res.json(errorOccuredResponse)
	}
})


/**
 * @todo create live class links with webRTC
 * @todo Use logger to record error
 * @todo Improve invite code creation algorithm
 * Create a new course and return class link and invite code
 */
router.post('/courses', async function(req, res) {
	try {
		const db = await dbconn();
		const col = db.collection('Course')
		let inviteCode = null;
		let liveClassLink = null;
		
		do {
			inviteCode = await createInviteCode();
			console.log(inviteCode);
		} while (col.findOne({"invite_code": inviteCode}) != null);
			
		liveClassLink = await createLiveClassLink();
		
		req.body["invite_code"] = inviteCode;
		req.body["live_class_link"] = liveClassLink;
		
		const insertResponse = await col.insertOne(req.body);
	
		const responseJSON = {
			"statuscode": 201,
			"course_id": insertResponse["ops"][0]["_id"],
			"invite_code": inviteCode,			
			"live_class_link": liveClassLink,
			"result": true
		}
		return res.json(responseJSON);
	} catch (e) {
		console.log(e)
		return res.json(errorOccuredResponse)
	}
})

module.exports = router;
