const express = require('express')
const router = express.Router()
const dbconn = require('./dbconn')
const createInviteCode = require('./createInviteCode')
const createLiveClassLink = require('./createLiveClassLink')
const ObjectID = require('mongodb').ObjectID;

const errorOccuredResponse = {
	"status": 500,
	"result": false
}

/**
 * Creates a new user entry in the database
 *  @todo Find a secure way to transfer password over wire
 *  @todo Use a logger instead to writing errors to console
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
 * Create a new course and return class link and invite code
 *  @todo Create live class links with webRTC
 *  @todo Improve invite code creation algorithm
 */
router.post('/courses', async function(req, res) {
	try {
		const db = await dbconn();
		const col = db.collection('Course')
		let inviteCode = null;
		let liveClassLink = null;
		
		do {
			inviteCode = await createInviteCode();
		} while (await col.findOne({"invite_code": inviteCode}) != null);
			
		liveClassLink = await createLiveClassLink();
		
		req.body["invite_code"] = inviteCode;
		req.body["live_class_link"] = liveClassLink;
		req.body["posts"] = [];
		req.body["schema_ver"] = "1.0";
		
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

/**
 * Get course details corresponding to a course ID
 * @todo Allow user to Input Course IDs 
 */
router.get('/courses/:courseid', async function (req, res) {
	try {
		const db = await dbconn();
		const col = db.collection('Course');
		const courseDetails = await col.findOne({"_id": ObjectID(req.params.courseid)});
		return res.json(courseDetails);
	} catch (e) {
		console.log(e);
		return res.json(errorOccuredResponse);
	}
})

/**
 * Get post IDs of all posts which are assignments for a particular course
 */
//@todo set constraints on db to have unique email id
router.get('/courses/:courseid/assignments', async function (req, res) {
	try {
		let assignmentList = []	
		const db = await dbconn();
		const col = db.collection('Course');	

		const postIdList = await col.find({
			"_id" : ObjectID(req.params.courseid),
			"posts": {"$exists": true}
		})
		.project({"posts":1, "_id":0})
		.toArray()
		.then((postIdDocument) => {
			return postIdDocument[0]["posts"].map((postId) => ObjectID(postId));
		})
		
		const postsWithAssignmentIDList = await db.collection('Post').find({
			"_id": {
				"$in": postIdList
			},
			"assignment_id": {"$exists": true}
		})
		.project({"_id":1})
		.toArray()
		.then((postWithAssignmentIdDocumentArray) => {
			return postWithAssignmentIdDocumentArray.map((postIdDocument) => {
				return postIdDocument["_id"]
			})
		})

		return res.json({"assignment_list": postsWithAssignmentIDList});
	} catch (e) {
		console.log(e);
		return res.json(errorOccuredResponse);
	}
})

router.post('/courses/:courseid/assignments', async function (req, res) {
	const db = await dbconn();
	const col = db.collection('Assignment');
	let assignmentData = req.body;

	delete assignmentData["description"]
	delete assignmentData["file_url"]

	assignmentData["submissions"] = []	
	assignmentData["schema_ver"] = 1.0
	const insertResponse = await col.insertOne(assignmentData);
	const insertId = insertResponse["insertedId"]

	let assignmentPost = {};
	assignmentPost["creator_ID"] = req.body["creator_ID"]
	assignmentPost["post_title"] = "Assignment"
	assignmentPost["post_text"] = req.body["description"]
	assignmentPost["files"] = [req.body["file_url"]]
	assignmentPost["assignment_id"] = insertId;
	assignmentPost["comments"] = []	

	const postInsertResponse = await db.collection('Post').insertOne(assignmentPost)
	const postId = postInsertResponse["insertedId"]

	return res.json({
		"statuscode": 201,
		"assignment_id": postId,
		"result": true
	});
})

router.get('/courses/:courseid/assignments/:assignmentid', async function(req, res) {
	const db = await dbconn();
	const assignmentDetails = await db.collection('Assignment').findOne({
		"_id": ObjectID(req.params.assignmentid)
	})
	return res.json(assignmentDetails);
})

router.post('/courses/:courseid/posts', async function(req, res) {
	const db = await dbconn();
	const insertResponse = await db.collection('Post').insertOne(req.body);
	const insertedId = insertResponse["insertedId"]
	db.collection('Course').update(
		{
			"_id": ObjectID(req.params.courseid),
		},
		{
			"$push":	
				{
					"posts": insertedId.toString()
				}
		}
	)

	return res.json({
		"statuscode": 201,	
		"result": true,
		"postId": insertResponse["insertedId"]
	})
});

module.exports = router;
