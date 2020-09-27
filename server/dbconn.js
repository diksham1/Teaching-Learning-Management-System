require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const username = process.env.USER_NAME;
const password = process.env.PASS;

// @todo: Username and password needs to be hidden. Store in Cloud
const uri = `mongodb+srv://${username}:${password}@tlms.1so97.mongodb.net/tlms?retryWrites=true&w=majority`;

const dbName = "tlms";

async function dbconn() {
	try {
		const client = new MongoClient(uri, { useNewUrlParser: true });
		await client.connect();
        const db = client.db(dbName);
		return db;
	} catch (err) {
		console.log(err.stack);
		return null;
	}
}

module.exports = dbconn
