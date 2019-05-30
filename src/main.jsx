
class Main extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {output:"", value:""};

		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
		this.keyListener = this.keyListener.bind(this);
		this.saveToDB = this.saveToDB.bind(this);
	}

	makeRequest(word) {
		console.log(word);
		fetch('/translate?english='+ word)
		.then(res =>  res.text())
		.then(res => {
			const translation = JSON.parse(res);	
			console.log(translation);
			this.setState({output: translation.Spanish});
		});
	}

	saveToDB() {
		if(this.state.output == '') {
			console.log("here");
			alert("missing translated word");
		} else {
			fetch(`/save?input=${this.state.value}&output=${this.state.output}`)
			.then(res => res.text())
			.then(res => {
				console.log(res)
			});
		}
	}

	onClick(event) {
		this.setState({output:"", value:"" }, () => {
			console.log(this.state.output,"setstate");});
		this.saveToDB();
	}

	keyListener(event) {
		const ENTER_KEY = 13;
		if(event.key == "Enter"){
			// this.setState({value: event.target.value})
			this.makeRequest(event.target.value);
			// return false;
		}
	}

	onChange(event) {		
		this.setState({value: event.target.value});
	}

	goReview(event) {
		console.log("go review");
	}
	render() {
		return(
			<main>
				<div className="top">
					<button onClick={this.goReview}>Start Review</button>
					<h1 id = "logo">"Lango!"</h1>
				</div>
				<div className="cards">
					<div className="textCard">
						<textarea id="input" onChange={this.onChange} onKeyPress={this.keyListener} value={this.state.value}></textarea> 
					</div>
					<div className="textCard">
						{console.log("====>",this.state.output)}
						<p id="output">{this.state.output}</p>
					</div>
				</div>
				<div className="save">
					<button onClick={this.onClick}>Save</button>
				</div>
				<div className="footnote">
					<h1>UserName</h1>
				</div>
			</main>
		);
	}

}
ReactDOM.render(<Main/>, document.getElementById('root'));
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