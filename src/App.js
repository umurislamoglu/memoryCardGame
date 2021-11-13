import "./App.css";
import { useEffect, useState } from "react";
import pokeball from "./images/pokeball.png";
import {
  Button,
} from "@material-ui/core";

const uniqueElementsArray = [
  {
    type: "Pikachu",
    image: require(`./images/Pikachu.png`),
  },
  {
    type: "ButterFree",
    image: require(`./images/ButterFree.png`),
  },
  {
    type: "Charmander",
    image: require(`./images/Charmander.png`),
  },
  {
    type: "Squirtle",
    image: require(`./images/Squirtle.png`),
  },
  {
    type: "Pidgetto",
    image: require(`./images/Pidgetto.png`),
  },
  {
    type: "Bulbasaur",
    image: require(`./images/Bulbasaur.png`),
  },
];
function shuffleCards(array) {
  const length = array.length;
  for (let i = length; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    const currentIndex = i - 1;
    const temp = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temp;
  }
  return array;
}

function App() {
  const [cards, setCards] = useState(
    shuffleCards.bind(null, uniqueElementsArray.concat(uniqueElementsArray))
  );
  const [openedCard, setOpenedCard] = useState([]);
  const [clearedCards,setClearedCards] = useState(0)
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0);
  const [bestScore, setBestScore] = useState(
    JSON.parse(localStorage.getItem("bestScore")) || Number.POSITIVE_INFINITY
  );

function flipCard(index) {
  setOpenedCard((opened)=> [...opened,index])

}
useEffect(()=>{

  if(openedCard<2) return;

  const firstCard = cards[openedCard[0]]
  const secondCard = cards[openedCard[1]]

  if(secondCard && firstCard.type === secondCard.type){
    setMatched([...matched,firstCard.type])
    setClearedCards(clearedCards+1)
  }

  if (openedCard.length === 2){ 
    setMoves(moves+1);
    setTimeout(() => setOpenedCard([]), 500)};


   
},[openedCard])

useEffect(() => {
  if(clearedCards === 6) {
    const highScore = Math.min(moves, bestScore);
    setBestScore(highScore);
    localStorage.setItem("bestScore", highScore);
  }
  console.log(clearedCards)
}, [clearedCards])



  const handleRestart = () => {
    setMoves(0)
    setCards(shuffleCards(uniqueElementsArray.concat(uniqueElementsArray)));
    setOpenedCard([])
    setMatched([])
    setClearedCards(0)
  };

  return (
    <div className="App ">
      <div className="cards">
        {cards.map((card, idx) => {


          let isFlipped = false;

          if (openedCard.includes(idx)) isFlipped = true;
          if (matched.includes(card.type)) isFlipped = true;

          return (
            <div key={idx} className={`pokemon-card ${isFlipped ? "flipped" : ""}` } onClick={() => flipCard(idx)}>
              <div className="inner">
                <div className="front">
                <img
                    src={card.image}
                    alt={card.type}
                    width="100"
                  />
                </div>
                <div className="back">
                 <img src={pokeball} style={{"width":"100px"}}/>

                </div>
              </div>
            </div>
          );
        })}
      </div>
      <footer className="footer">
        <div className="score">
          <div className="moves">
            <span className="bold">Moves:</span> {moves}
          </div>

          {localStorage.getItem("bestScore") && (
            <div className="high-score">
              <span className="bold">Best Score:</span> {bestScore}
            </div>
          )}
        </div>
        <div className="restart">
          <Button onClick={handleRestart} color="primary" variant="contained">
            Restart
          </Button>
        </div>
      </footer>
    
    </div>
  );
}

export default App;
