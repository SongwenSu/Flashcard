class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data:""};
        this.goMain = this.goMain.bind(this);
        this.nextCard = this.nextCard.bind(this);
    }   
    goMain(){
        console.log("go back to main");
    }
    nextCard(){
        console.log("display next cards");
    }
	componentDidMount(){
		fetch('/getCards')
		.then(res=> res.text())
		.then(res=>{
			let rows = JSON.parse(res);
			let n = Object.keys(rows).length;
			let display = rows[Math.floor(Math.random()*n)];
			console.log(rows);
			console.log(display.translateText);
			this.setState({data: display.translateText});
		});
	}
	render() {
		return(
			<main>
				<div className="top">
					<button onClick={this.goMain}>Add</button>
					<h1 id = "logo">"Lango!"</h1>
				</div>
				<div className="cards">
					<div className="textCard">
						<textarea id="input" ></textarea> 
					</div>
					<div className="textCard">
						<p id="output">{this.state.data}</p>
					</div>
				</div>
				<div className="next">
					<button onClick={this.nextCard}>Next</button>
				</div>
				<div className="footnote">
					<h1>UserName</h1>
				</div>
			</main>
		);
	}

}


ReactDOM.render(<Review />, document.getElementById('root'));