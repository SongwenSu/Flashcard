class Main extends React.Component {
	constructor(props) {
		super(props);
		
		this.state = {output:"", value:""};

		this.onClick = this.onClick.bind(this);
		this.onChange = this.onChange.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
		this.keyListener = this.keyListener.bind(this);
		this.saveToDB = this.saveToDB.bind(this);
		this.goReview = this.goReview.bind(this);
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
		console.log("go review"); //TODO
		window.location.href = "review.html";
		
	}
	render() {
		return(
			<main>
				<div className="top">
					<button onClick={this.goReview}>Start Review</button>
					<h1 id = "logo">Lango!</h1>
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


ReactDOM.render(<Main />, document.getElementById('root'));