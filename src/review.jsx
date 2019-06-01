class Review extends React.Component {
	constructor(props) {
        super(props);
        this.goMain = this.goMain.bind(this);
        this.nextCard = this.nextCard.bind(this);
    }   
    goMain(){
        console.log("go back to main");
    }
    nextCard(){
        console.log("display next cards");
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
						<p id="output"></p>
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