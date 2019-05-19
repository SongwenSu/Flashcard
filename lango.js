'use strict';

// An element to go into the DOM


// A component - function that returns some elements 

function FirstCard() {
	return React.createElement(
		"div",
		{ className: "textCard" },
		React.createElement(
			"p",
			null,
			"\"Hello, world!\""
		)
	);
}

// Another component
function FirstInputCard() {
	return React.createElement("div", { className: "textCard" }, 
			React.createElement("textarea", { onKeyPress: checkReturn })
		);
}

function Top() {
	return React.createElement("div", { className: "top" }, 
				React.createElement("button", { onClick:function(){
					console.log("go to reiview");
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
			React.createElement("button", { onClick:function(){
					console.log("go to reiview");}}, "Save") 
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

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
	console.log(event.charCode);
}

