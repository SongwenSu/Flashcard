"use strict"
// stuff for browser interact with server
const express = require('express')
const port = 51296

// server interact wiht apis
const APIrequest = require('request');
const http = require('http');

const APIkey = "AIzaSyC5jj2sM_3VyipWCB6iTnPv1EtuXsVckVw";  // ADD API KEY HERE
const url = "https://translation.googleapis.com/language/translate/v2?key="+APIkey

// An object containing the data expressing the query to the
// translate API. 
// Below, gets stringified and put into the body of an HTTP PUT request.
let requestObject = 
{
	"source": "en",
	"target": "ko",
	"q": [
		"example phrase"
	]
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
				// console.log("In Korean: ", 
				// 	APIresBody.data.translations[0].translatedText);
				// console.log("\n\nJSON was:");
				// console.log(JSON.stringify(APIresBody, undefined, 2));
				// print it out as a string, nicely formatted
				res.json({
					"English":qObj.english,
					"Korean": APIresBody.data.translations[0].translatedText
				});
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

function fileNotFound(req, res) {
    let url = req.url;
    res.type('text/plain');
    res.status(404);
    res.send('Cannot find '+url);
}

// put together the server pipeline
const app = express()
app.use(express.static('public'));  // can I find a static file? 
app.get('/translate', queryHandler );   // if not, is it a valid query?
app.use( fileNotFound );            // otherwise not found

app.listen(port, function (){console.log('Listening...');} )
