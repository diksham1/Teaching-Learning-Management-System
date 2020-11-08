const express = require('express')
const router = express.Router()
const createInviteCode = require('./createInviteCode')
const createLiveClassLink = require('./createLiveClassLink')
const ObjectID = require('mongodb').ObjectID;
const bcrypt = require('bcrypt')
const saltRounds = 10; //set to be 10 across all apis for encryption
// delete post, delete student from a course
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const username = process.env.USER_NAME;
const password = process.env.PASS;

const uri = `mongodb+srv://${username}:${password}@tlms.1so97.mongodb.net/tlms?retryWrites=true&w=majority`;

const dbName = "tlms";

let db = null

try {
  const client = new MongoClient(uri, { useNewUrlParser: true });
  client.connect().then(() => {db = client.db(dbName)});
} catch (err) {
  console.log(err.stack);
}

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
router.get('/scrap',async function(req,res){ //only to be used to delete all test documents
	const db = await dbconn()
	db.collection('User').remove({})
	res.send("hey")
})
 */

//This accepts login details for verification....
/**
 * {
 * 		"email" : <email>,
 * 		"password" : <password>,
 * }
 * {
 * 		"statuscode" : *Success or failure*,
 * 		"_id" : *The User ID of the user for storing as a global variable*,
 * 		"name" : *The name of the user for storing as a global state*
 *
 * }
 * 
 * Here email is used as key as it is unique
 */
router.post('/login',async (req,res) => {
	try{
		//const db = await dbconn();
    	const login = req.body;
    	const col = db.collection("User");
		const queryResponse = await col.findOne({ email: login.email });

		if(queryResponse == null)
			return res.json(errorOccuredResponse) //if user does not exist

		bcrypt.compare(login.password,queryResponse.password,(err,sm) => { //
			if(err){
				console.log(err)
				return res.json(errorOccuredResponse)
			}
			else{
				if(sm){
					res.json({
						statuscode: 201,
						_id : queryResponse._id,
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

/**
 * This api is responsible to create a new user
 * 
 * {
 * 		"email" : <email>,
 * 		"name" : <name of the user>,
 * 		"phone no." : <phone number of the user(optional)>,
 * 		"password" : <Password of the user>
 * }
 * {
 * 		"statuscode" : <statuscode>,
 * 		"_id" : *Contains the object id of newly created document*,
 * 		"result" : <true>
 * }
 * 
 * "schema_ver","courses" added as empty fields
 */
router.post('/users',async function(req, res) {
	try {
		let exists = false
		//const db = await dbconn();
		const user = req.body;
		user["schema_ver"] = 1;
		user['courses'] = []
		const col = db.collection("User");
		const check1 = (await col.findOne({ email: req.body.email })) == null;

		bcrypt.hash(req.body.password,saltRounds,async (err,hash) => {
			console.log(hash)
			user['password'] = hash //the password is hashed before storing in database

			exists = (check1)?false:true
			if(exists)
				return res.json(errorOccuredResponse)

			const insertResponse = await col.insertOne(user);
			res.json({
				"statuscode": 201,
				"_id": insertResponse["ops"][0]["_id"],
				"result": true	
			});
		})
	} catch(e) {
		console.log(e);
		return res.json(errorOccuredResponse)
	}
})


/**
 * This API returns the details of a user corresponding to a given userid
 */
router.get('/users/:userid',async function(req,res){
	try{
		console.log(req.params.userid)
		//const db = await dbconn()
		const queryResponse = await db.collection('User').findOne({"_id" : ObjectID(req.params.userid)})
		//search via objectid parameter and return the whole document
		return res.json(queryResponse)
	}
	catch(e){
		console.log(e)
		return res.json(errorOccuredResponse)
	}
})


/**
 * Create a new course and return class link and invite code
 *  @todo Create live class links with webRTC
 *  @todo Improve invite code creation algorithm
 */

 /**
  * This api creates a new course 
  * 
  * {
  * 	"creator_id" : <id of the course creator>,
  * 	"creator_name" : <name of the creator>,
  * 	"name" : <name of the course>,
  * 	"course_desc" : <description of the course>
  * }
  * 
  * {
  * 	"statuscode" : <statuscode>,
  * 	"course_id" : <object id of newly created document>,
  * 	"invite_code" : <Invite code for joining the class>,
  * 	"live_class_link" : <live class link , null  as of now>,
  * 	"result " : <true>
  * }
  * 
  * The attributes added are invite_code, live_class_link, schema_ver, posts as an empty array
  */
router.post('/courses', async function(req, res) {
	try {

		if(!req.body.name)
			return res.json(errorOccuredResponse)
		//const db = await dbconn();
		const col = db.collection('Course')
		let inviteCode = null;
		let liveClassLink = null;
		
		do {
			inviteCode = await createInviteCode();
		} while (await col.findOne({"invite_code": inviteCode}) != null); //Ensuring no duplicate invite code
			
		liveClassLink = await createLiveClassLink();
		
		req.body["invite_code"] = inviteCode;
		req.body["live_class_link"] = liveClassLink;
		req.body["posts"] = [];
		req.body["schema_ver"] = 1.0;
		
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
/**
 * This api returns the document with the corresponding courseid from the Course collction
 * This is to be kept in mind that here and henceforth course_id shall mean invite _code
 * {
 * 		Ths whole Course Documents
 * }
 */
router.get('/courses/:courseid', async function (req, res) {
	try {
		//const db = await dbconn();
		const col = db.collection('Course');
		const courseDetails = await col.findOne({"invite_code": req.params.courseid});
		//invite_code being treated as course id
		return res.json(courseDetails);
	} catch (e) {
		console.log(e);
		return res.json(errorOccuredResponse);
	} 
})


/**
 * New API addition alert
 * This api was added to simplifiy database query calls
 * This api returns all the invite_code of the classes who creator is same as that of a given creator id
 * {
 * 		"courses" : [{<invite_code>}]
 * }
 */
router.get('/courses/creator/:creatorid', async function (req, res) {
	try {
		//const db = await dbconn();
		const col = db.collection('Course');
		const courseDetails = await col.find({"creator_id": req.params.creatorid})
		.project(
			{
				"_id" : 0,
				"invite_code" : 1
			}
		)
		.toArray();
		return res.json({ 'courses' : courseDetails})
		
	} catch (e) {
		console.log(e);
		return res.json(errorOccuredResponse);
	} 
})

/**
 * Get post IDs of all posts which are assignments for a particular course
 * filters out the posts for a given course which are also assignment
 */
router.get('/courses/:courseid/assignments', async function (req, res) {
	try {
		let assignmentList = []	
		//const db = await dbconn();
		const col = db.collection('Course');	

		const postIdList = await col.find({
			"invite_code" : req.params.courseid,
			"posts": {"$exists": true}
		})
		.project({"posts":1, "_id":0})
		.toArray()
		.then((postIdDocument) => {
			console.log(postIdDocument)
			return postIdDocument[0]["posts"].map((postId) => ObjectID(postId));
		})

		console.log(postIdList)
		
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

/**
 * API to post a new assignment 
 */
router.post('/courses/:courseid/assignments', async function (req, res) {
	//const db = await dbconn();
	const col = db.collection('Assignment');
	let assignmentData = req.body;

	delete assignmentData["description"]
	delete assignmentData["file_url"]

	assignmentData["submissions"] = []	
	assignmentData["schema_ver"] = 1.0
	const insertResponse = await col.insertOne(assignmentData);
	const insertId = insertResponse["insertedId"]

	let assignmentPost = {};
	assignmentPost["creator_id"] = req.body["creator_id"]
	assignmentPost["post_title"] = "Assignment"
	assignmentPost["post_text"] = req.body["post_text"]
	assignmentPost["files"] = [req.body["file_url"]]
	assignmentPost["assignment_id"] = insertId;
	assignmentPost["comments"] = []	

	const postInsertResponse = await db.collection('Post').insertOne(assignmentPost)
	const postId = postInsertResponse["insertedId"]

	db.collection('Course').update(
		{
			"invite_code": req.params.courseid,
		},
		{
			"$push":	
				{
					"posts": postId.toString()
				}
		}
	)
	return res.json({
		"statuscode": 201,
		"assignment_id": postId,
		"result": true
	});
})

//would look at it later
router.get('/courses/:courseid/assignments/:assignmentid', async function(req, res) {
	//const db = await dbconn();
	const assignmentDetails = await db.collection('Assignment').findOne({
		"_id": ObjectID(req.params.assignmentid)
	})
	return res.json(assignmentDetails);
})

/**
 * Creates a new post and add it to a given course
 * courseId is same as invite_code
 */
router.post('/courses/:courseid/posts', async function(req, res) {
	//const db = await dbconn();
	req.body['comments'] = []
	const insertResponse = await db.collection('Post').insertOne(req.body);
	const insertedId = insertResponse["insertedId"]
	db.collection('Course').update(
		{
			"invite_code": req.params.courseid,
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

/**
 * This api is to be used to add a student to a given course if it exixts
 * {
 * 		"userID" : <the object id of the User documents>, 
 * }
 * {
 * 		"statuscode" : <statuscode>,
 * 		"result" : <true>
 * }
 * 
 * Here also the courseis same as invite_code
 */
router.post('/courses/:courseid/students', async function(req, res) {
	try{
		const userId = req.body["userID"]
		const inviteCode = req.params.courseid;

		//const db = await dbconn();

		const queryResponse = await db.collection('Course').findOne({invite_code : inviteCode})

		if(queryResponse.creator_id == userId){
			throw "User same as creator"
		}
		
		if(queryResponse === null){
			throw "Not Valid Class"
		}
		else{
			db.collection('User').update(
				{
					"_id": ObjectID(userId)
				},
				{
					"$push": {"courses": inviteCode}
				}
			);

			return res.json({"statuscode":201, "result": true})
		}
	} catch(e){
		console.log(e)
		return res.json(errorOccuredResponse);
	}
});

/**
 * get all the students enrolled in a given course
 * courseid is to be treated as invite_code
 */
router.get('/courses/:courseid/students', async function(req, res) {
	try{
		const courseId = req.params.courseid;
		//const db = await dbconn();
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

/**
 * @todo /courses/:courseid/students/:studentid is practically useless
 * This api endpoint is useless because we can get the student details from 
 * get /v1/users/:userid
 * and student is not existentially dependent on course
 */
router.get('/courses/:courseid/students/:studentid', async function (req, res) {
	const studentId = req.params.studentid;
	//const db = await dbconn();
	const userDetails = await db.collection('User').findOne({
		'_id': ObjectID(studentId)
	});
	return res.json(userDetails);
});

/**
 * Creates a new comment...
 * courseid same as invite_code
 */
router.post('/courses/:courseid/posts/:postid/comments', async function (req, res) {
	//const db = await dbconn();
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

/**
 * Returns all post corresponding to a course
 * courseid is to be treated as invite_code
 */
router.get('/courses/:courseid/posts', async function (req, res) {
	try{
		const courseId = req.params.courseid;
		//const db = await dbconn();
		const postIDs = await db.collection('Course').find({
			'invite_code': courseId
		})
		.project({
			"posts": 1,
			"_id": 0
		})
		.limit(1)
		.toArray();

		return res.json({"posts": postIDs[0]["posts"]})
	}catch(e){
		console.log(e)
		return res.json(errorOccuredResponse)
	}
})

/**
 * Retrieve a particular post corresponding to a particualr post id 
 */
router.get('/courses/:courseid/posts/:postid', async function(req, res) {
	//const db = await dbconn();
	const postId = req.params.postid;
	const postDetails = await db.collection('Post').findOne({
		"_id": ObjectID(postId)
	})
	return res.json(postDetails);
})

/**
 *	Delete a particular post given the post ID
 */

router.delete('/courses/:courseid/posts/:postid', async function(req, res) {
	const postId = req.params.postid;
	await db.collection('Post').deleteOne({
		"_id": ObjectID(postId)
	})
	await db.collection('Course').update(
	{
		"invite_code": req.params.courseid
	},
	{
		"$pull": {"posts": postId}
	}
	)
	return res.json({"statuscode": 200});
})


/**
 * Unenroll a student from a particular course
 * Returns: statusCode of 200 
 */
router.delete('/courses/:courseid/students/:studentid', async function(req, res) {
	const courseId = req.params.courseid;
	const studentId = req.params.studentid;
	
	try {
		await db.collection('User').update(
		{
			"_id": ObjectID(studentId)
		},
		{
			"$pull": {"courses": courseId}
		});
		
		return res.json({"statuscode": 200});
	} catch(e) {
		console.log(e);
		return res.json(errorOccuredResponse);
	}
})
module.exports = router;
