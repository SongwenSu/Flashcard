'use strict';

// An element to go into the DOM


// A component - function that returns some elements 

function FirstCard() {
	return React.createElement(
		"div",
		{ className: "textCard"},
		React.createElement(
			"p",
			 {id:"output"},
			"\"Hello, world!\""
		)
	);
}

// Another component
function FirstInputCard() {
	return React.createElement("div", { className: "textCard" }, 
			React.createElement("textarea", {id:"input", onKeyPress:keyListener})
		);
}

function Top() {
	return React.createElement("div", { className: "top" }, 
				React.createElement("button", { onClick:function(){
					console.log("go to review");
				}}, "Start Review"), 
				React.createElement("h1", { id: "logo" }, "Lango!")
			);
}

function Cards(){
	return React.createElement("div", { className: "cards" }, 
			React.createElement(FirstInputCard, null), 
			React.createElement(FirstCard, null)
		);
}

function Save(){
	return React.createElement("div", { className: "save" }, 
			React.createElement("button", { onClick:saveToDB}, "Save") 
		);
}

function Footnote(){
	return React.createElement("div", { className: "footnote" }, 
			React.createElement("h1", {}, "UserName") 
		);
}
// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
var main = React.createElement("main", null, 
			React.createElement(Top, null), 
			React.createElement(Cards, null),
			React.createElement(Save, null),
			React.createElement(Footnote, null)
		);

ReactDOM.render(main, document.getElementById('root'));

function keyListener(event){
	const ENTER_KEY = 13;
	if(event.key == "Enter"){
		checkReturn();
	}
}

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
	console.log("making request");
	let english = document.getElementById("input").value;
	console.log(english);
	let url = "translate?english="+english;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	if (!xhr ) {
	alert('UNABLE TO translate');
	return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		let object = JSON.parse(responseStr);  // turn it into an object
		console.log(object);
		document.getElementById("output").textContent = object.Spanish;
	};

	xhr.onerror = function(err) {

		alert(err+'Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();

	//console.log(event.charCode);
}



function saveToDB(event){
	console.log("Going to Save");
	let input = document.getElementById("input").value;
	let output = document.getElementById("output").textContent;
	console.log(input + ' ' + output);	
	let url = "save?input="+input+"&output="+output;
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	if (!xhr ) {
	alert('UNABLE TO STORE DB');
	return;
	}

	// Load some functions into response handlers.
	xhr.onload = function() {
		let responseStr = xhr.responseText;  // get the JSON string 
		console.log(responseStr);
		let object = JSON.parse(responseStr);  // turn it into an object
		// let result = JSON.stringify(object, undefined, 2);
	};

	xhr.onerror = function() {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();

}