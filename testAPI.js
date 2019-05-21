"use strict"
// stuff for browser interact with server
const express = require('express')
const port = 51296

// server interact wiht apis
const root = "./public/";

const APIrequest = require('request');
const http = require('http');
const APIkey = "AIzaSyC5jj2sM_3VyipWCB6iTnPv1EtuXsVckVw";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey
const sqlite3 = require("sqlite3").verbose();  // use sqlite
const fs = require("fs"); // file system
const dbFileName = "Flashcards.db";
// makes the object that represents the database in our code
const db = new sqlite3.Database(dbFileName);  // object, not database.
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
// Initialize table.
// If the table already exists, causes an error.
// Fix the error by removing or renaming Flashcards.db
const cmdStr = `CREATE TABLE flashcards (
					ID INTEGER PRIMARY KEY AUTOINCREMENT, 
					sourceText TEXT,
					translateText TEXT,
					numShown INT,
					numCorrect INT
					)`
db.run(cmdStr,tableCreationCallback);
// An object containing the data expressing the query to the
// translate API. 
// Below, gets stringified and put into the body of an HTTP PUT request.
let requestObject = 
{
	"source": "en",
	"target": "es",
	"q": [
		"example phrase"
	]
}


// Always use the callback for database operations and print out any
// error messages you get.
// This database stuff is hard to debug, give yourself a fighting chance.
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");
	db.close();
    }
}
function saveDB(req, res, next){
	let qobj2 = req.query;
	console.log("my object");
	//console.log(qObj);
	if(req.query.input != undefined){//TODO: double check the condition
        let english = req.query.input;
        let translate = req.query.output;
        console.log("translate");
        console.log(english + translate);
        const inStr = `INSERT INTO flashcards (
					sourceText,
					translateText,
					numShown,
					numCorrect
					) VALUES
					(@0, @1, 0, 0)`;
		//console.log(inStr);
		db.run(inStr, english, translate, tableInsertionCallback);
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

				
				//res.json( {"translation":translate});
				//res.statusCode = 200;
			}
		}
	} // end callback function
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

function tableInsertionCallback(err) {
    if (err) {
	console.log("Table insertion error",err);
    } else {
	console.log("entry inserted");
    }
}
function tableCreationCallback(err) {
    if (err) {
	console.log("Table creation error",err);
    } else {
	console.log("Database created");

    }
}
function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}

// put together the server pipeline
const app = express()
app.use(express.static(root,{index:'lango.html'}));  // can I find a static file? 
app.get('/translate', queryHandler );   // if not, is it a valid query?
app.get('/save', saveDB);
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )