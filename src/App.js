import React, { Component} from "react";
import "./App.css";

class App extends Component{
  constructor(props){
    super(props);
    this.state={
      tweets:[]
    }
    this.fetchquote = this.fetchquote.bind(this)
    this.getRandomQuote = this.getRandomQuote.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount(){
    this.fetchquote();
  }
  
  fetchquote(){
    if (this.state.tweets && this.state.tweets.length ) {
      return;
    }
    
    
  fetch('https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json')
    .then(response => response.json())
    .then(parsedJSON =>{
      this.setState({
        tweets: parsedJSON.quotes
      })
    });
  }
  
  getRandomQuote(){
    //get quotes from state
    // let tweets = this.state.tweets; 
    const { tweets } = this.state;
    //get random quote
    return tweets[Math.floor(Math.random() * tweets.length)];
  }
 
  handleClick(e) {
    this.fetchquote();
    this.setState({});
  }
  
  render(){
    
    const quote = this.getRandomQuote() || {
      quote: 'Searching...',
      author: ''
    };
    
    
        
    return( 
      
     <div id='quote-box' class="mx-auto shadow-lg rounded p-3 mb-5">
        <p id="text">{quote.quote}</p>
        <p id="author">{quote.author}</p>
        <button class="btn btn-primary ml-" id="new-quote" onClick={this.handleClick}>
          New quote?</button>
        <button class="btn btn-primary ml-3">
          <a id="tweet-quote" href="twitter.com/intent/tweet" target="_blank">Tweet me!</a>
        </button>
      </div>
    );
  }
}

export default App;