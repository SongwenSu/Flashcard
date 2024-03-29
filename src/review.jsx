class CardFront extends React.Component {
  render(props) {
    return(
      <div className='card-side side-front'>
         <div className='card-side-container'>
              <h2 id='trans'>{this.props.text}</h2>
        </div>
      </div>
    )
  }
}

class CardBack extends React.Component {
  render(props) {
    return(
      <div className='card-side side-back'>
         <div className='card-side-container'>
              <h2 id='congrats'>{this.props.text}</h2>
              <img className='card-side correct hidden' src="js/correct.JPG"/>
        </div>
      </div>
    )
  }
}
class Review extends React.Component {
	constructor(props) {
		super(props);
		this.state = {data:"", redirect: false, src:"",cardID:"", input:""};
        this.goMain = this.goMain.bind(this);
		this.nextCard = this.nextCard.bind(this);
		this.onChange = this.onChange.bind(this);
		this.makeRequest = this.makeRequest.bind(this);
		this.keyListener = this.keyListener.bind(this);
		this.onFlip = this.onFlip.bind(this);
    }   
    goMain(){
		console.log("go back to main");
		window.location.href = "main.html";
    }
    nextCard(){
		fetch(`/updateShown?id=${this.state.cardID}`)
		.then(res=> res.text())
		.then(res=>{ console.log(JSON.parse(res));});
		fetch('/getCards')
		.then(res=> res.text())
		.then(res=>{
			let rows = JSON.parse(res);
			let n = Object.keys(rows).length;
			let scoreTable = []
			for(index in n){
				let numShown, numCorrect = rows[Math.floor(Math.random()*n)];
				scoreTable[index] = numCorrect + numShown;
			}
			let real = scoreTable.indexOf(Math.min(scoreTable), 0);
			console.log("real is" + real);
			let display = rows[Math.floor(real)];
			display = rows[Math.floor(Math.random()*n)];
			console.log("entry is " + display);
			this.setState({data: display.translateText, src: display.sourceText, cardID:display.id});
			document.querySelector(".correct").classList.remove("visible");
			document.querySelector(".correct").classList.add("hidden");
		});
		this.setState({input:""});
	}
	onChange(event) {
		console.log("changing input");
		this.setState({input: event.target.value});
	}
	
	keyListener(event) {
		const ENTER_KEY = 13;
		if(event.key == "Enter"){	
			this.makeRequest(event.target.value);
			this.setState({input:""});
		}
		
	}

	onFlip(){
		document.querySelector(".card-container").classList.toggle("flip");
	}

	makeRequest(word) {
		console.log(word);
		let flag = 0;
		this.state.src == word ? flag = 1:document.querySelector(".card-container").classList.toggle("flip");
		flag ? fetch(`/updateCorrect?id=${this.state.cardID}`)
		.then(res=> res.text())
		.then(res=>{ console.log(JSON.parse(res));
				document.querySelector(".correct").classList.remove("hidden");
				document.querySelector(".correct").classList.add("visible");
				document.querySelector(".card-container").classList.toggle("flip");
		}): console.log("incorrect");

	}

	componentDidMount(){
		fetch('/getCards')
		.then(res=> res.text())
		.then(res=>{
			let rows = JSON.parse(res);
			let n = Object.keys(rows).length;
			let display = rows[Math.floor(Math.random()*n)];
			this.setState({data: display.translateText, src: display.sourceText, cardID:display.id});

		});
		fetch('/getUser')
		.then(res=> res.text())
		.then(res=> {
			let profile = JSON.parse(res);
			this.setState({user:profile.firstName});
		});
	}

	render() {
		return(
			<main>
				<div className="top">
					<button onClick={this.goMain}>Add</button>
					<h1 id = "logo">Lango!</h1>
				</div>

				<div className="cards">
						<div className='card-container'>
							<div onClick={this.onFlip} className='card-body'>
								<CardFront text={this.state.data} />
								<CardBack text={this.state.src} />
							</div>
						</div>
					<div className="inputTextCard">				
						<textarea id="myinput" onChange={this.onChange} onKeyPress={this.keyListener} value={this.state.input}></textarea> 
					</div>
				</div>
				<div className="next">
					<button onClick={this.nextCard}>Next</button>
				</div> 
				<div className="footnote">
					<h1>{this.state.user}</h1>
				</div>
			</main>
		);
	}

}


ReactDOM.render(<Review />, document.getElementById('root'));
