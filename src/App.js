import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Link } from "react-router-dom";
import Weather from "./Weather";

function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Game</Link>
          </li>
          <li>
            <Link to="/weather">Weather</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/unknown">Bad link</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/weather">
          <Weather />
        </Route>
        <Route exact path="/">
          <Game />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Router>
  );
}

function NotFound() {
  return "Bad page";
}

function About() {
  return "About Us";
}

function Game() {
  const [history, setHistory] = useState([]);
  const [gameState, setGameState] = useState({
    guesses: 0,
    number: Math.floor(Math.random() * 101),
    wonGame: false,
    hint: "Guess a number between 0 and 100",
  });
  const [currentGuess, setGuess] = useState("");

  useEffect(() => {
    if (gameState.guesses > 2) {
      alert("Get better at guessing");
    }

    return () => {
      if (gameState.guesses > 5) {
        alert("giving up already?");
      }
    };
  }, [gameState.guesses]);

  const handleSubmit = () => {
    if (gameState.number === +currentGuess) {
      // winner
      setGameState((current) => ({
        ...current,
        guesses: current.guesses + 1,
        wonGame: true,
      }));
    } else {
      // wrong
      let hint = "";
      if (currentGuess > gameState.number) {
        hint = "guess a lower number";
      } else {
        hint = "guess a higher number";
      }
      setGameState((current) => ({
        ...current,
        guesses: current.guesses + 1,
        hint,
      }));
    }
  };

  const restartGame = () => {
    setHistory((history) => history.push(gameState));
    setGameState({
      guesses: 0,
      number: Math.floor(Math.random() * 101),
      wonGame: false,
      hint: "Guess a number between 0 and 100",
    });
    setGuess("");
  };

  if (gameState.wonGame) {
    return (
      <>
        <History history={history} />
        <h1>
          It took you {gameState.guesses} guesses to find {gameState.number}
        </h1>
        <button onClick={restartGame}>Restart Game</button>
      </>
    );
  } else {
    return (
      <div className="App">
        <History history={history} />
        <h3>Guesses: {gameState.guesses}</h3>
        <h3>{gameState.hint}</h3>
        <input
          type="text"
          name="guess"
          value={currentGuess}
          onChange={(evt) => setGuess(evt.target.value)}
        ></input>
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    );
  }
}

/*
/victory
<App>
  <History>
  You Win
</App>

/new game
<App>
  <History />
  <Game />
</App>
*/

function History({ history }) {
  return <h2>You've played {history.length} games</h2>;
}

export default App;
