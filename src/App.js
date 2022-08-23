import React, {useEffect, useState} from 'react';
import './App.scss';
import COLORS_ARRAY from "./colorsArray"


let quotesDBUrl = 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'

function App() {
  const [quote, setQuote] = useState('Everything you’ve ever wanted is on the other side of fear.')
  const [author, setAuthor] = useState('- George Addair')

  
  const [randomNumber, setRandomNumber] = useState(0)
  
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')

  const fetchQuotes = async (Url) =>{
    const response = await fetch(Url)
    const parsedJSOn = await response.json()
    setQuotesArray(parsedJSOn.quotes)
   }

  useEffect(() => {
  fetchQuotes(quotesDBUrl)
  }, [quotesDBUrl])
  

  const getRandomQuote = ()=>{
    let randomInteger = Math.floor(quotesArray.length* Math.random())
    setRandomNumber(randomInteger)
    setAccentColor(COLORS_ARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
    
  }

  // const ourQuotesArray = [{quote:'Everything you’ve ever wanted is on the other side of fear.', author:'- George Addair'},{quote:'Either write something worth reading or do something worth writing.', author:'- Benjamin Franklin'},{quote:'If you’re offered a seat on a rocket ship, don’t ask what seat! Just get on.', author:'- Sheryl Sandberg'},{quote:'I have been impressed with the urgency of doing. Knowing is not enough; we must apply. Being willing is not enough; we must do.', author:'- Leonardo da Vinci'}]

  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor:accentColor, color:accentColor}}>

        <div id="quote-box" style={{color:accentColor}}>
        {/* <h1>Random number: {randomNumber}</h1> */}
        
        
        <p id="text">
          "{quote}"
        </p>
        <p id="author">
          - {author}
        </p>

        <div className='buttons'>
        <div className='button'>
        <a id="tweet-quote" href={encodeURI(`https://twitter.com/intent/tweet?text=${quote} ${author}`)} target="blank" style={{backgroundColor:accentColor}}><i class="fa-brands fa-twitter"></i></a>
        </div>
        
        <button id="new-quote" onClick={()=> getRandomQuote()} style={{backgroundColor:accentColor}}>Generate a random quote</button>

        </div>
        

        </div>
       
        
      </header>
    </div>
  );
}

export default App;
