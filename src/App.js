/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import './App.css';

import GamePage from './pages/GamePage/GamePage';
import SettingsPage from './pages/SettingsPage/SettingsPage';
import HighScoresPage from './pages/HighScoresPage/HighScoresPage';
import SignupPage from './pages/SignupPage/SignupPage';
import LoginPage from './pages/LoginPage/LoginPage';

import { Route, Switch, Redirect } from 'react-router-dom';

import { fetchScoreData, addScoreData } from './services/scoresService';
import { getUser, logout } from './services/userService';

function App(props) {

    /* local variables */

    const colors = {
      Easy: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD'],
      Moderate: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968'],
      Difficult: ['#7CCCE5', '#FDE47F', '#E04644', '#B576AD', '#B7D968', '#555E7B']
    };

    /* hooks */

    const [selColorIdx, setColorIdx] = useState(0);
    const [gameState, setGameState] = useState(getInitialState());
    const [scores, setScores] = useState([]);
    const [userState, setUserState] = useState({ user: getUser() });
    
    useEffect(() => {
      if(userState.user) {
        getScores()
      }
    }, [userState.user]);

    /* helper functions */

    function handleLogout () {
      logout();
      setUserState({user: null});
    };

    function handleSignupOrLogin() {
      setUserState({ user: getUser() });
    };

    /* gameState related functions */ 
   function getInitialState(numColors = 4, difficulty = 'Easy') {
      return {
        guesses: [getNewGuess()],
        code: genCode(numColors),
        difficulty,
        elapsedTime: 0,
        isTiming: true
      };
    }

    function genCode(numColors) {
      return new Array(4).fill().map(() => Math.floor(Math.random() * numColors));
    }

    function getNewGuess() {
      return {
        code: [null, null, null, null],
        score: {
          perfect: 0,
          almost: 0
        }
      };
    }

    function handleNewGameClick() {
      const difficulty = gameState.difficulty;
      const numColors = colors[difficulty].length;
      setGameState(getInitialState(numColors, difficulty));
    }

    function handlePegClick(pegIdx) {
      const gameStateCopy = {...gameState};
      const currentGuessIdx = gameStateCopy.guesses.length - 1;
      gameStateCopy.guesses[currentGuessIdx].code[pegIdx] = selColorIdx;
      setGameState(gameStateCopy);
    }

    function handleDifficultyChange(level) {
      const numColors = colors[level].length;
      setGameState(getInitialState(numColors, level))
    }

    function handleTimerUpdate() {
      setGameState(prevGameState => ({
        ...prevGameState,
        elapsedTime: prevGameState.elapsedTime + 1
      }))
    }

    function handleScoreClick() {
      const gameStateCopy = {...gameState};
      const currentGuessIdx = gameStateCopy.guesses.length - 1; 
      const currentGuess = gameState.guesses[currentGuessIdx];
      const guessesCopy = gameState.guesses;

      const guessCodeCopy = [...currentGuess.code];
      const secretCodeCopy = [...gameStateCopy.code];
  
      let perfect = 0, almost = 0;
  
      guessCodeCopy.forEach((code, idx) => {
        if (secretCodeCopy[idx] === code) {
          perfect++;
          guessCodeCopy[idx] = secretCodeCopy[idx] = null;
        }
      });
      guessCodeCopy.forEach((code, idx) => {
        if (code === null) return;
        let foundIdx = secretCodeCopy.indexOf(code);
        if (foundIdx > -1) {
          almost++;
          secretCodeCopy[foundIdx] = null;
        }
      });

      currentGuess.score.perfect = perfect;
      currentGuess.score.almost = almost;
  
  
      if (perfect === 4) {
        const elapsedTime = gameState.elapsedTime;
        gameStateCopy.isTiming = false;

          if ((scores.length < 20 || isHighScore(guessesCopy, elapsedTime))) {
            const initials = prompt('Congrats you have a top-20 score! Enter your initials: ').substr(0, 3);
            createScore({ initials, numGuesses: guessesCopy.length, seconds: elapsedTime });
            props.history.push('/high-scores');
          }        
      } else {
        gameStateCopy.guesses.push(getNewGuess());
      }
      setGameState(gameStateCopy);
    }

    /* scores-related functions */

    async function getScores() {
      const data = await fetchScoreData();
      setScores(data);
    }
    
    async function createScore(score) {
      const data = await addScoreData(score);
      setScores(data);
    }

    function isHighScore(guessesCopy, elapsedTime) {
      let lastScore = scores[scores.length - 1];
      return (guessesCopy.length < lastScore.numGuesses || (
        guessesCopy.length === lastScore.numGuesses &&
        elapsedTime < lastScore.seconds
      ));
    }

    /* other UI-related helpers */

    function getWinTries() {
      let lastGuess = gameState.guesses.length - 1;
      return gameState.guesses[lastGuess].score.perfect === 4 ? lastGuess + 1 : 0;
    }
    
    const winTries = getWinTries();

    return (
      <div className="App">
        <header className='header-footer'>R E A C T &nbsp;&nbsp;&nbsp;M A S T E R M I N D</header>
        <Switch>
          <Route exact path='/' render={() =>
            <GamePage
              user={userState.user}
              handleLogout={handleLogout}
              winTries={winTries}
              colors={colors[gameState.difficulty]}
              selColorIdx={selColorIdx}
              guesses={gameState.guesses}
              setColorIdx={setColorIdx}
              handleNewGameClick={handleNewGameClick}
              handlePegClick={handlePegClick}
              handleScoreClick={handleScoreClick}
              handleTimerUpdate={handleTimerUpdate}
              elapsedTime={gameState.elapsedTime}
              isTiming={gameState.isTiming}
            />
          } />
          <Route exact path="/settings" render={props => 
            <SettingsPage 
              {...props}
              colorsLookup={colors}
              difficulty={gameState.difficulty} 
              handleDifficultyChange={handleDifficultyChange}
            />
          }/>
          <Route exact path="/high-scores" render={props => 
            getUser()
            ? <HighScoresPage {...props} scores={scores} />
            : <Redirect to="/login" />
          }/>
          <Route exact path="/signup" render={props => 
            <SignupPage {...props} handleSignupOrLogin={handleSignupOrLogin} />
          }/>
          <Route exact path="/login" render={props => 
            <LoginPage {...props} handleSignupOrLogin={handleSignupOrLogin} />
          }/>
        </Switch>
      </div>
    );
}

export default App;