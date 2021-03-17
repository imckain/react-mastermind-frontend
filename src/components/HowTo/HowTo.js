import styles from './HowTo.module.css';

function HowTo(props) {


    return(
        <div className={styles.HowTo}>
            <h1>How To Play: </h1>
            <h3>Object of the Game</h3>
            <p>To outsmart the computer with a clever code or great guesswork.</p> 
            <h3>Game Play</h3>
            <ul>
                <li>The code can be made up of any combination of the colored pegs.</li>
                <li>Try to duplicate the exact colors and positions of the hidden Code pegs.</li>
                <li>Each guess is made by placing a row of colored pegs.</li>
                <li>The box to the right of each guess will use the white pegs, which indicate each peg that is a correct color but wrong position.</li>
                <li>A black peg to indicate each peg is in a correct position and a right color. </li>
                <li>If neither are true, then the peg spot will be grey. </li>
                <li>The pegs will be placed in any order in the peg spots arranged in the square pattern next to the guess line.</li>
                <li>Once the code is guessed, the timer will stop and, if logged in, your highscore will be registered.</li>
                <li>Have Fun & Thanks for Playing!</li>
            </ul>
        </div>
    )
}

export default HowTo