'use strict';

// An element to go into the DOM


// A component - function that returns some elements 
function FirstCard() {
	return(<div className="textCard">
			<p>"Hello, world!"</p>
		</div>
	);
}

// Another component
function FirstInputCard() {
	return React.createElement(
		"div", { className: "textCard" },
		React.createElement("textarea", { onKeyPress: checkReturn })
	);
}

function Top() {
	return React.createElement(
		"div",
		{className:"top"},
		React.createElement("button", { id: "startReiview" },"Start Review"),
		React.createElement("h1",{ id: "logo" },"Lango!")
	);
}

// An element with some contents, including a variable
// that has to be evaluated to get an element, and some
// functions that have to be run to get elements. 
var main = React.createElement(
	"main",
	null,
	React.createElement(Top,null),
	React.createElement(FirstInputCard, null),
	React.createElement(FirstCard, null)
);

ReactDOM.render(main, document.getElementById('root'));

// onKeyPress function for the textarea element
// When the charCode is 13, the user has hit the return key
function checkReturn(event) {
	console.log(event.charCode);
}