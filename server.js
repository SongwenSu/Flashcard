"use strict"
// stuff for browser interact with server
const express = require('express');
const passport = require('passport');
const cookieSession = require('cookie-session');
const GoogleStrategy = require('passport-google-oauth20');
const port = 51296

const googleLoginData = {
    clientID: '345177041735-u836nsbrfj3eof6tjaskb6u01q9stak1.apps.googleusercontent.com',
    clientSecret: 'Lq4vcbWYQKPooeP-pIDQU4Hj',
    callbackURL: '/auth/accepted'
};

passport.use( new GoogleStrategy(googleLoginData, gotProfile) );

// server interact wiht apis

const APIrequest = require('request');
const http = require('http');
const APIkey = "AIzaSyC5jj2sM_3VyipWCB6iTnPv1EtuXsVckVw";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
let requestObject = 
{
	"source": "en",
	"target": "es",
	"q": [
		"example phrase"
	]
}
const db = new sqlite3.Database(dbFileName);  // object, not database.

// print the database before closing it
process.on('SIGINT', function() {
	db.all ( 'SELECT * FROM flashcards', dataCallback);
    function dataCallback( err, data ) {
    	console.log("My datbase");
    	console.log(data);
    	db.close(); 
		console.log("database closed");
		process.exit(0);
    }
});
// initialize table
const flashcard_table = `CREATE TABLE IF NOT EXISTS flashcards (
						id INTEGER PRIMARY KEY AUTOINCREMENT, 
						sourceText TEXT,
						translateText TEXT,
						numShown INT,
						numCorrect INT,
						userID TEXT
						)`;

const user_table = `CREATE TABLE IF NOT EXISTS users (
					id TEXT PRIMARY KEY, 
					firstName TEXT,
					lastName TEXT)`;
db.run(flashcard_table, tableCreationCallback);
db.run(user_table, tableCreationCallback);



// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database loaded");
    }
}

function tableInsertionCallback(err) {
    if (err) {
	console.log("Table insertion error",err);
    } else {
	console.log("entry inserted");
    }
}
function saveDB(req, res, next){
	let qobj2 = req.query;
	if(req.query.input != undefined){//TODO: double check the condition
        let english = req.query.input;
        let translate = req.query.output;
        const inStr = `INSERT INTO flashcards (
					sourceText,
					translateText,
					numShown,
					numCorrect,
					userID
					) VALUES
					(@0, @1, 0, 0, @2)`;
		db.run(inStr, english, translate, req.user.google_id, tableInsertionCallback);
    	res.json({"status":"Good"});	
    }
    else {
		next();
    }

}

// server and browser
function queryHandler(req, res, next) {
    let qObj = req.query;
    
    // callback function, called when data is received from API
	function APIcallback(err, APIresHead, APIresBody) {
		// gets three objects as input
		if ((err) || (APIresHead.statusCode != 200)) {
			// API is not working
			console.log("Got API error");
			console.log(APIresBody);
		} else {
			if (APIresHead.error) {
			// API worked but is not giving you data
			console.log(APIresHead.error);
			} else {
				// print it out as a string, nicely formatted
				const english = qObj.english;
				const translate = APIresBody.data.translations[0].translatedText;
				res.json({
					"English":english,
					"Spanish": translate
				});	
			}
		}
	} 

  	if(qObj.english != undefined){
        requestObject.q[0] = qObj.english;
        // console.log(requestObject);
        APIrequest(
	        { // HTTP header stuff
				url: url,
				method: "POST",
				headers: {"content-type": "application/json"},
				// will turn the given object into JSON
				json: requestObject	
			},
			APIcallback);
    }
    else {
		next();
    }
   
}



function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}

// print the url of incoming HTTP request
function printURL (req, res, next) {
    console.log(req.url);
    next();
}

function checkTable(req, res){
	if(req.user){
		let sql = 'SELECT * FROM flashcards WHERE userID = ?'; 
		console.log(req.user.google_id);
		db.get(sql, [req.user.google_id], (err, rows) => {
			if (err) {
			throw err;
			}
			console.log("Check table", rows);
			if(rows) {
				res.redirect('/user/review.html'); // TODO: FIX ME
			} else {
				res.redirect('/user/main.html');
			}
		});
	}
	
}

function updateShown(req, res, next){
	if(req.query.id != undefined){
		console.log("card id" + req.query.id);
		let cardID = req.query.id;
		let shown = 0;
		const sql1 = 'SELECT * FROM flashcards WHERE id = ?';
		db.get(sql1, [cardID], (err, row)=>{
			if(err) {
				throw err;
			}
			if(row) {
				console.log("this is the row "+ row.numShown);
			}
			shown = row.numShown + 1;
			console.log("shown is " + shown);
			let sql = 'UPDATE flashcards SET numShown = ? WHERE id = ?';
			db.run(sql, [shown,cardID], (err, rows)=>{
			if(err) {
				throw err;
			}
			res.json("success for shown");});			
		});
	} else {
		console.log("id is undefined");
	}
}

function updateCorrect(req, res, next){
	if(req.query.id != undefined){
		console.log("card id" + req.query.id);
		let cardID = req.query.id;
		let correct = 0;
		const sql1 = 'SELECT * FROM flashcards WHERE id = ?';
		db.get(sql1, [cardID], (err, row)=>{
			if(err) {
				throw err;
			}
			if(row) {
				console.log("this is the row "+ row.numCorrect);
			}
			correct = row.numCorrect + 1;
			let sql = 'UPDATE flashcards SET numCorrect = ? WHERE id = ?';
			db.run(sql, [correct,cardID], (err, rows)=>{
			if(err) {
				throw err;
			}
			res.json("success for correct");});			
		});
	} else {
		console.log("id is undefined");
	}
}

function getCards(req, res){
	if(req.user){
		let sql = 'SELECT * FROM flashcards WHERE userID = ?'; 
		console.log(req.user.google_id);
		db.all(sql, [req.user.google_id], (err, rows) => {
			if (err) {
				throw err;
			}
			console.log(rows);
			res.json(rows);
		});
	}
}
function getUser(req, res)
{
	if(req.user){
		res.json(req.user);
	}
}

function isAuthenticated(req, res, next) {
    if (req.user) {
		// console.log("Req.session:",req.session);
		// console.log("Req.user:",req.user);
		next();
    } else {
		res.redirect('/lango.html');
    }
}
function loginAuthenticated(req, res, next){
	if(req.user) {
		console.log("logged in already");
		checkTable(req.user.google_id);
		res.redirect('/user/check');
	} else {
		console.log("havne't logged in");
		next();
	}
}
function gotProfile(accessToken, refreshToken, profile, done) {
	// console.log("Google profile",profile);
	// console.log("ID",profile.id);
	let google_id = profile.id
	let firstName = profile.name.familyName;
	let lastName = profile.name.givenName;
	const sql = 'SELECT * FROM users WHERE id = ?'; // TODO: unable to check properly
	db.get(sql, [google_id], (err, rows) => {
		if (err) {
		  throw err;
		}
		console.log("PROFILE", rows);
		if(!rows){
			const userInsert = `INSERT INTO users (
				id, 
				firstName,
				lastName
				) VALUES
				(@0, @1, @2)`;
			db.run(userInsert, google_id, firstName, lastName, tableInsertionCallback);
	
			console.log("inserting new users");
			let dbRowID = google_id;
			done(null, dbRowID); 
		}else{
			let dbRowID = google_id;
			done(null, dbRowID); 
		}
	});	

    // here is a good place to check if user is in DB,
    // and to store him in DB if not already there. 
    // Second arg to "done" will be passed into serializeUser,
    // should be key to get user out of database.

      // temporary! Should be the real unique
    // key for db Row for this user in DB table.
    // Note: cannot be zero, has to be something that evaluates to
    // True.  

    
}

passport.serializeUser((dbRowID, done) => {
    // console.log("SerializeUser. Input is",dbRowID);
    done(null, dbRowID);
});

passport.deserializeUser((dbRowID, done) => {
	const sql = 'SELECT * FROM users WHERE id = ?'; // TODO: unable to check properly
	db.get(sql, [dbRowID], (err, row) => {
		if (err) {
		  throw err;
		}
		if(row){
			console.log("inside deserializer",row);
			let userData = {
				google_id: row.id,
				firstName: row.firstName
			}
			
			console.log("inside deserializer",userData);
			done(null, userData)
		}
		// done(null, userData);
	});	
    // console.log("deserializeUser. Input is:", dbRowID);
    // here is a good place to look up user data in database using
    // dbRowID. Put whatever you want into an object. It ends up
    // as the property "user" of the "req" object. 

});

// put together the server pipeline
const app = express();
app.use('/', printURL);
app.use(cookieSession({
    maxAge: 6 * 60 * 60 * 1000, // Six hours in milliseconds
    // meaningless random string used by encryption
    keys: ['hanger waldo mercy dance']  
}));
// Initializes request object for further handling by passport
app.use(passport.initialize()); 
// If there is a valid cookie, will call deserializeUser()
app.use(passport.session()); 
// Public static files
app.get('/lango.html', loginAuthenticated); 
app.get('/*', express.static('public')); 
// handler for url that starts login with Google.
app.get('/auth/google',
	passport.authenticate('google',{ scope: ['profile'] }) );
app.get('/auth/accepted',
	// This will issue Server's own HTTPS request to Google
	// to access the user's profile information with the 
	// temporary key we got in the request. 
	passport.authenticate('google'),
	// then it will run the "gotProfile" callback function,
	// set up the cookie, call serialize, whose "done" 
	// will come back here to send back the response
	// ...with a cookie in it for the Browser! 
	function (req, res) {
		console.log('Logged in and using cookies!');
		
	    res.redirect('/user/check');
	});

app.get('/user/*', isAuthenticated, // only pass on to following function if
		// user is logged in 
		// serving files that start with /user from here gets them from ./
		express.static('.')
	   ); 
app.get('/user/check',isAuthenticated, checkTable);
app.get('/translate',isAuthenticated, queryHandler );  
app.get('/save', isAuthenticated, saveDB);
app.get('/getUser', isAuthenticated, getUser);
app.get('/getCards', isAuthenticated, getCards);
app.get('/updateShown', isAuthenticated,updateShown);
app.get('/updateCorrect', isAuthenticated,updateCorrect);
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
