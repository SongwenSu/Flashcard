var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Main = function (_React$Component) {
	_inherits(Main, _React$Component);

	function Main(props) {
		_classCallCheck(this, Main);

		var _this = _possibleConstructorReturn(this, (Main.__proto__ || Object.getPrototypeOf(Main)).call(this, props));

		_this.state = { output: "", value: "" };

		_this.onClick = _this.onClick.bind(_this);
		_this.onChange = _this.onChange.bind(_this);
		_this.makeRequest = _this.makeRequest.bind(_this);
		_this.keyListener = _this.keyListener.bind(_this);
		_this.saveToDB = _this.saveToDB.bind(_this);
		return _this;
	}

	_createClass(Main, [{
		key: "makeRequest",
		value: function makeRequest(word) {
			var _this2 = this;

			fetch('translate?english=' + word).then(function (res) {
				return res.text();
			}).then(function (res) {
				var translation = JSON.parse(res);
				console.log(translation);
				_this2.setState({ output: translation.Spanish });
			});
		}
	}, {
		key: "saveToDB",
		value: function saveToDB() {
			if (this.state.output == '') {
				console.log("here");
				alert("missing translated word");
			} else {
				fetch("save?input=" + this.state.value + "&output=" + this.state.output).then(function (res) {
					return res.text();
				}).then(function (res) {
					console.log(res);
				});
			}
		}
	}, {
		key: "onClick",
		value: function onClick(event) {
			var _this3 = this;

			this.setState({ output: "", value: "" }, function () {
				console.log(_this3.state.output, "setstate");
			});
			this.saveToDB();
		}
	}, {
		key: "keyListener",
		value: function keyListener(event) {
			var ENTER_KEY = 13;
			if (event.key == "Enter") {
				// this.setState({value: event.target.value})
				this.makeRequest(event.target.value);
				// return false;
			}
		}
	}, {
		key: "onChange",
		value: function onChange(event) {
			this.setState({ value: event.target.value });
		}
	}, {
		key: "goReview",
		value: function goReview(event) {
			console.log("go review");
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
						{ onClick: this.goReview },
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
						React.createElement("textarea", { id: "input", onChange: this.onChange, onKeyPress: this.keyListener, value: this.state.value })
					),
					React.createElement(
						"div",
						{ className: "textCard" },
						console.log("====>", this.state.output),
						React.createElement(
							"p",
							{ id: "output" },
							this.state.output
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
				React.createElement(
					"div",
					{ className: "footnote" },
					React.createElement(
						"h1",
						null,
						"UserName"
					)
				)
			);
		}
	}]);

	return Main;
}(React.Component);

ReactDOM.render(React.createElement(Main, null), document.getElementById('root'));
// function keyListener(event){
// 	const ENTER_KEY = 13;
// 	if(event.key == "Enter"){
// 		checkReturn();
// 	}
// }

// function goReview(event) {
// 	console.log("go Review");
// }

// function checkReturn(event) {
// 	console.log("making request");
// 	let english = document.getElementById("input").value;
// 	console.log(english);
// 	let url = "translate?english="+english;
// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', url, true);
// 	if (!xhr ) {
// 	alert('UNABLE TO translate');
// 	return;
// 	}

// 	// Load some functions into response handlers.
// 	xhr.onload = function() {
// 		let responseStr = xhr.responseText;  // get the JSON string 
// 		let object = JSON.parse(responseStr);  // turn it into an object
// 		console.log(object);
// 		document.getElementById("output").textContent = object.Spanish;
// 	};

// 	xhr.onerror = function(err) {

// 		alert(err+'Woops, there was an error making the request.');
// 	};

// 	// Actually send request to server
// 	xhr.send();

// 	//console.log(event.charCode);
// }
// function saveToDB(event){
// 	console.log("Going to Save");
// 	let input = document.getElementById("input").value;
// 	let output = document.getElementById("output").textContent;
// 	console.log(input + ' ' + output);	
// 	let url = "save?input="+input+"&output="+output;
// 	let xhr = new XMLHttpRequest();
// 	xhr.open('GET', url, true);
// 	if (!xhr ) {
// 	alert('UNABLE TO STORE DB');
// 	return;
// 	}

// 	// Load some functions into response handlers.
// 	xhr.onload = function() {
// 		let responseStr = xhr.responseText;  // get the JSON string 
// 		console.log(responseStr);
// 		let object = JSON.parse(responseStr);  // turn it into an object
// 		// document.getElementById("input").value = "";
// 		// document.getElementById("output").textContent = "";
// 		// let result = JSON.stringify(object, undefined, 2);
// 	};

// 	xhr.onerror = function() {
// 		alert('Woops, there was an error making the request.');
// 	};

// 	// Actually send request to server
// 	xhr.send();

// }