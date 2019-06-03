var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Review = function (_React$Component) {
	_inherits(Review, _React$Component);

	function Review(props) {
		_classCallCheck(this, Review);

		var _this = _possibleConstructorReturn(this, (Review.__proto__ || Object.getPrototypeOf(Review)).call(this, props));

		_this.state = { data: "" };
		_this.goMain = _this.goMain.bind(_this);
		_this.nextCard = _this.nextCard.bind(_this);
		return _this;
	}

	_createClass(Review, [{
		key: "goMain",
		value: function goMain() {
			console.log("go back to main");
			var path = 'user/main.html';
			this.props.history.push(path);
		}
	}, {
		key: "nextCard",
		value: function nextCard() {
			console.log("display next cards");
		}
	}, {
		key: "componentDidMount",
		value: function componentDidMount() {
			var _this2 = this;

			fetch('/getCards').then(function (res) {
				return res.text();
			}).then(function (res) {
				var rows = JSON.parse(res);
				var n = Object.keys(rows).length;
				var display = rows[Math.floor(Math.random() * n)];
				console.log(rows);
				console.log(display.translateText);
				_this2.setState({ data: display.translateText });
			});
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
						{ onClick: this.goMain },
						"Add"
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
						{ className: "inputTextCard" },
						React.createElement("textarea", { id: "input" })
					),
					React.createElement(
						"div",
						{ className: "displayTextCard" },
						React.createElement(
							"p",
							{ id: "output" },
							this.state.data
						)
					)
				),
				React.createElement(
					"div",
					{ className: "next" },
					React.createElement(
						"button",
						{ onClick: this.nextCard },
						"Next"
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

	return Review;
}(React.Component);

ReactDOM.render(React.createElement(Review, null), document.getElementById('root'));