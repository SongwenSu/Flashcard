var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CardFront = function (_React$Component) {
	_inherits(CardFront, _React$Component);

	function CardFront() {
		_classCallCheck(this, CardFront);

		return _possibleConstructorReturn(this, (CardFront.__proto__ || Object.getPrototypeOf(CardFront)).apply(this, arguments));
	}

	_createClass(CardFront, [{
		key: 'render',
		value: function render(props) {
			return React.createElement(
				'div',
				{ className: 'card-side side-front' },
				React.createElement(
					'div',
					{ className: 'card-side-container' },
					React.createElement(
						'h2',
						{ id: 'trans' },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardFront;
}(React.Component);

var CardBack = function (_React$Component2) {
	_inherits(CardBack, _React$Component2);

	function CardBack() {
		_classCallCheck(this, CardBack);

		return _possibleConstructorReturn(this, (CardBack.__proto__ || Object.getPrototypeOf(CardBack)).apply(this, arguments));
	}

	_createClass(CardBack, [{
		key: 'render',
		value: function render(props) {
			return React.createElement(
				'div',
				{ className: 'card-side side-back' },
				React.createElement(
					'div',
					{ className: 'card-side-container' },
					React.createElement(
						'h2',
						{ id: 'congrats' },
						this.props.text
					)
				)
			);
		}
	}]);

	return CardBack;
}(React.Component);

var Review = function (_React$Component3) {
	_inherits(Review, _React$Component3);

	function Review(props) {
		_classCallCheck(this, Review);

		var _this3 = _possibleConstructorReturn(this, (Review.__proto__ || Object.getPrototypeOf(Review)).call(this, props));

		_this3.state = { data: "", redirect: false, src: "", cardID: "", input: "" };
		_this3.goMain = _this3.goMain.bind(_this3);
		_this3.nextCard = _this3.nextCard.bind(_this3);
		_this3.onChange = _this3.onChange.bind(_this3);
		_this3.makeRequest = _this3.makeRequest.bind(_this3);
		_this3.keyListener = _this3.keyListener.bind(_this3);
		return _this3;
	}

	_createClass(Review, [{
		key: 'goMain',
		value: function goMain() {
			console.log("go back to main");
			window.location.href = "main.html";
		}
	}, {
		key: 'nextCard',
		value: function nextCard() {
			var _this4 = this;

			fetch('/updateShown?id=' + this.state.cardID).then(function (res) {
				return res.text();
			}).then(function (res) {
				console.log(JSON.parse(res));
			});
			fetch('/getCards').then(function (res) {
				return res.text();
			}).then(function (res) {
				var rows = JSON.parse(res);
				var n = Object.keys(rows).length;
				var display = rows[Math.floor(Math.random() * n)];
				_this4.setState({ data: display.translateText, src: display.sourceText, cardID: display.id });
			});
			this.setState({ input: "" });
		}
	}, {
		key: 'onChange',
		value: function onChange(event) {
			console.log("changing input");
			this.setState({ input: event.target.value });
		}
	}, {
		key: 'keyListener',
		value: function keyListener(event) {
			var ENTER_KEY = 13;
			if (event.key == "Enter") {
				this.makeRequest(event.target.value);
				this.setState({ input: "" });
			}
		}
	}, {
		key: 'makeRequest',
		value: function makeRequest(word) {
			console.log(word);
			var flag = 0;
			this.state.src == word ? flag = 1 : console.log("wrong");
			flag ? fetch('/updateCorrect?id=' + this.state.cardID).then(function (res) {
				return res.text();
			}).then(function (res) {
				console.log(JSON.parse(res));
			}) : console.log("incorrect");
		}
	}, {
		key: 'componentDidMount',
		value: function componentDidMount() {
			var _this5 = this;

			fetch('/getCards').then(function (res) {
				return res.text();
			}).then(function (res) {
				var rows = JSON.parse(res);
				var n = Object.keys(rows).length;
				var display = rows[Math.floor(Math.random() * n)];
				_this5.setState({ data: display.translateText, src: display.sourceText, cardID: display.id });
			});
			fetch('/getUser').then(function (res) {
				return res.text();
			}).then(function (res) {
				var profile = JSON.parse(res);
				_this5.setState({ user: profile.firstName });
			});
		}
	}, {
		key: 'render',
		value: function render() {
			return React.createElement(
				'main',
				null,
				React.createElement(
					'div',
					{ className: 'top' },
					React.createElement(
						'button',
						{ onClick: this.goMain },
						'Add'
					),
					React.createElement(
						'h1',
						{ id: 'logo' },
						'Lango!'
					)
				),
				React.createElement(
					'div',
					{ className: 'cards' },
					React.createElement(
						'div',
						{ className: 'inputTextCard' },
						React.createElement('textarea', { id: 'myinput', onChange: this.onChange, onKeyPress: this.keyListener, value: this.state.input })
					),
					React.createElement(
						'div',
						{ className: 'card-container' },
						React.createElement(
							'div',
							{ className: 'card-body' },
							React.createElement(CardBack, { text: 'Correct!' }),
							React.createElement(CardFront, { text: 'Volare' })
						)
					)
				),
				React.createElement(
					'div',
					{ className: 'next' },
					React.createElement(
						'button',
						{ onClick: this.nextCard },
						'Next'
					)
				),
				React.createElement(
					'div',
					{ className: 'footnote' },
					React.createElement(
						'h1',
						null,
						this.state.user
					)
				)
			);
		}
	}]);

	return Review;
}(React.Component);

ReactDOM.render(React.createElement(Review, null), document.getElementById('root'));