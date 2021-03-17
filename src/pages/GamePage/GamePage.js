import GameBoard from '../../components/GameBoard/GameBoard';
import ColorPicker from '../../components/ColorPicker/ColorPicker';
import GameTimer from '../../components/GameTimer/GameTimer';
import NewGameButton from '../../components/NewGameButton/NewGameButton';
import NavBar from '../../components/NavBar/NavBar';
import HowTo from '../../components/HowTo/HowTo';
import { getUser } from '../../services/userService';

import { Link } from 'react-router-dom';

import './GamePage.css';

const GamePage = (props) => {
    return (
      <div className="GamePage">
        <NavBar user={props.user} handleLogout={props.handleLogout} />
        <div className="flex-h align-flex-end">
          <GameBoard 
            colors={props.colors} 
            guesses={props.guesses}
            handleScoreClick={props.handleScoreClick} 
            handlePegClick={props.handlePegClick}
          />
          <div className="GamePage-controls">
            <ColorPicker 
              colors={props.colors} 
              selColorIdx={props.selColorIdx} 
              setColorIdx={props.setColorIdx}
            />
            <GameTimer 
              elapsedTime={props.elapsedTime}
              isTiming={props.isTiming}
              handleTimerUpdate={props.handleTimerUpdate}
            />
            {
              getUser()
              && <Link 
                style={{ marginBottom: 10 }} 
                className="btn btn-default" 
                to="/high-scores">
                  High Scores
              </Link>
            }
            <Link 
              style={{ marginBottom: 10 }} 
              className="btn btn-default" 
              to="/settings">
                Difficulty
            </Link>
            <NewGameButton handleNewGameClick={props.handleNewGameClick} />
          </div>
        </div>
        <footer className="header-footer">{props.winTries ? `You Won in ${props.winTries} Guesses!` : 'Good Luck!'}</footer>
        <HowTo />
      </div>
    );
};
  
export default GamePage;