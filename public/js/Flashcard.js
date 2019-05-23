var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// class Cards extends React.Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {text: ""}
// 		this.onChange = this.onChange.bind(this);
// 	}

// 	onChange(event) {
// 		this.setState({text: event.target.value})
// 	}


// 	render() {
// 		return(
// 			<div className="cards">
// 				<div className="textCard">
// 					<textarea id="input" onKeyPress={keyListener}></textarea> 
// 					{/* <input onChange={this.onChange} type="text" value={this.state.text}/>
// 					{this.state.text} */}
// 				</div>
// 				<div className="textCard">
// 					<p id="output"></p>
// 				</div>
// 			</div>
// 		);
// 	}
// }

// class Top extends React.Component{
// 	render(){
// 		return(
// 			<div className="top">
// 				<button onClick={goReview}>Start Review</button>
// 				<h1 id = "logo">"Lango!"</h1>
// 			</div>
// 		);
// 	}
// }

// class Save extends React.Component{
// 	render(){
// 		return(
// 			<div className="save">
// 				<button onClick={saveToDB}>Save</button>
// 			</div>
// 		);
// 	}
// }

var Footnote = function (_React$Component) {
	_inherits(Footnote, _React$Component);

	function Footnote() {
		_classCallCheck(this, Footnote);

		return _possibleConstructorReturn(this, (Footnote.__proto__ || Object.getPrototypeOf(Footnote)).apply(this, arguments));
	}

	_createClass(Footnote, [{
		key: "render",
		value: function render() {
			return React.createElement(
				"div",
				{ className: "footnote" },
				React.createElement(
					"h1",
					null,
					"UserName"
				)
			);
		}
	}]);

	return Footnote;
}(React.Component);

var Main = function (_React$Component2) {
	_inherits(Main, _React$Component2);

	function Main(props) {
		_classCallCheck(this, Main);

		var _this2 = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

		_this2.state = { text: "", value: "" };
		_this2.onClick = _this2.onClick.bind(_this2);
		_this2.onChange = _this2.onChange.bind(_this2);
		return _this2;
	}

	_createClass(Main, [{
		key: "onClick",
		value: function onClick(event) {
			var _this3 = this;

			this.setState({ text: " ", value: " " }, function () {
				console.log(_this3.state.text, "setstate");
			});
			saveToDB();
		}
	}, {
		key: "onChange",
		value: function onChange(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: "render",
		value: function render() {
			return React.createElement(
				"main",
				null,
				React.createElement(
					"div",
					{ className: "top" },
					React.createElement(
						"button",
						{ onClick: goReview },
						"Start Review"
					),
					React.createElement(
						"h1",
						{ id: "logo" },
						"\"Lango!\""
					)
				),
				React.createElement(
					"div",
					{ className: "cards" },
					React.createElement(
						"div",
						{ className: "textCard" },
						React.createElement("textarea", { id: "input", onChange: this.onChange, onKeyPress: keyListener, value: this.state.value })
					),
					React.createElement(
						"div",
						{ className: "textCard" },
						React.createElement(
							"p",
							{ id: "output" },
							this.state.text
						)
					)
				),
				React.createElement(
					"div",
					{ className: "save" },
					React.createElement(
						"button",
						{ onClick: this.onClick },
						"Save"
					)
				),
				React.createElement(Footnote, null)
			);
		}
	}]);

	return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));
function keyListener(event) {
	var ENTER_KEY = 13;
	if (event.key == "Enter") {
		checkReturn();
	}
}

function goReview(event) {
	console.log("go Review");
}
function checkReturn(event) {
	console.log("making request");
	var english = document.getElementById("input").value;
	console.log(english);
	var url = "translate?english=" + english;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	if (!xhr) {
		alert('UNABLE TO translate');
		return;
	}

	// Load some functions into response handlers.
	xhr.onload = function () {
		var responseStr = xhr.responseText; // get the JSON string 
		var object = JSON.parse(responseStr); // turn it into an object
		console.log(object);
		document.getElementById("output").textContent = object.Spanish;
	};

	xhr.onerror = function (err) {

		alert(err + 'Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();

	//console.log(event.charCode);
}
function saveToDB(event) {
	console.log("Going to Save");
	var input = document.getElementById("input").value;
	var output = document.getElementById("output").textContent;
	console.log(input + ' ' + output);
	var url = "save?input=" + input + "&output=" + output;
	var xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);
	if (!xhr) {
		alert('UNABLE TO STORE DB');
		return;
	}

	// Load some functions into response handlers.
	xhr.onload = function () {
		var responseStr = xhr.responseText; // get the JSON string 
		console.log(responseStr);
		var object = JSON.parse(responseStr); // turn it into an object
		// let result = JSON.stringify(object, undefined, 2);
	};

	xhr.onerror = function () {
		alert('Woops, there was an error making the request.');
	};

	// Actually send request to server
	xhr.send();
}