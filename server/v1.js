const express = require('express')
const router = express.Router()
const dbconn = require('./dbconn')
const createInviteCode = require('./createInviteCode')
const createLiveClassLink = require('./createLiveClassLink')
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt')
const saltRounds = 10;

const errorOccuredResponse = {
	"status": 500,
	"result": false
}

/**
 * Creates a new user entry in the database
 *  @todo Find a secure way to transfer password over wire
 *  @todo Use a logger instead to writing errors to console
 */

router.get('/',async function(req,res){
	res.send("<h1>APIs currently under developement.</h1>");
})

/**
router.get('/scrap',async function(req,res){ //only to be user to delete all test documents
	const db = await dbconn()
	db.collection('User').remove({})
	res.send("hey")
})
 */

router.post('/login',async (req,res) => {
	try{
		const db = await dbconn();
    	const login = req.body;
    	const col = db.collection("User");
		const queryResponse = await col.findOne({ email: login.email });

		if(queryResponse == null)
			return res.json(errorOccuredResponse)

		bcrypt.compare(login.password,queryResponse.password,(err,sm) => {
			if(err){
				console.log(err)
				return res.json(errorOccuredResponse)
			}
			else{
				if(sm){
					res.json({
						statuscode: 201,
						name : queryResponse.name,
            			result: true,
          			});	
				}
				else{
					res.json(errorOccuredResponse)
				}
			}
		})
	}
	catch(e){
		console.log(e);
	    return res.json(errorOccuredResponse);
	}
})

router.post('/users', async function(req, res) {
	try {
		let exists = false
		const db = await dbconn();
		const user = req.body;
		user["schema_ver"] = 1;
		user['courses'] = []
		
		bcrypt.hash(req.body.password,saltRounds,(err,hash) => {
			console.log(hash)
			user['password'] = hash
		})

		const col = db.collection("User");
		const check1 = (await col.findOne({"email" : req.body.email})) == null //checking uniqueness of documents
		const check2 = (await col.findOne({"phone" : req.body.phone})) == null
		exists = (check1 || check2)?false:true
		if(exists)
			return res.json(errorOccuredResponse)

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

router.post('/courses/:courseid/students', async function(req, res) {
	const userId = req.body["userID"]
	const courseId = req.params.courseid;
	
	const db = await dbconn();
	db.collection('User').update(
		{
			"_id": ObjectID(userId)
		},
		{
			"$push": {"courses": courseId}
		}
	);
	return res.json({"statuscode":201, "result": true})
});

router.get('/courses/:courseid/students', async function(req, res) {
	try{
		const courseId = req.params.courseid;
		const db = await dbconn();
		const userList = await db.collection('User').find({
			"courses": courseId
		})	
		.project({	
			"_id": 1,
			"name": 1,
			"email": 1,
			"phone_number": 1
		})
		.toArray();
		return res.json({"students": userList});
	} catch(e) {
		console.log(e);
		return res.json(errorOccuredResponse);
	}
});

router.get('/courses/:courseid/students/:studentid', async function (req, res) {
	const studentId = req.params.studentid;
	const db = await dbconn();
	const userDetails = await db.collection('User').findOne({
		'_id': ObjectID(studentId)
	});
	return res.json(userDetails);
});

//@todo comment every API in JSDoc format
router.get('/courses/:courseid/posts/:postid/comments', async function (req, res) {
	const db = await dbconn();
	await db.collection('Post').update(
		{
			"_id": ObjectID(req.params.postid)
		},
		{
			"$push": {"comments": req.body}
		}
	)
	return res.json({"statuscode": 201, "result": true})
});

router.get('/courses/:courseid/posts', async function (req, res) {
	const courseId = req.params.courseid;
	const db = await dbconn();
	const postIDs = await db.collection('Course').find({
		'_id': ObjectID(courseId)
	})
	.project({
		"posts": 1,
		"_id": 0
	})
	.limit(1)
	.toArray();

	return res.json({"posts": postIDs[0]["posts"]})
})

router.get('/courses/:courseid/posts/:postid', async function(req, res) {
	const db = await dbconn();
	const postId = req.params.postid;
	const postDetails = await db.collection('Post').findOne({
		"_id": ObjectID(postId)
	})
	return res.json(postDetails);
})
module.exports = router;
