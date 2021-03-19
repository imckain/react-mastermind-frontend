import styles from './HowTo.module.css';

function HowTo(props) {


    return(
        <div className={styles.HowTo}>
            <h1>How To Play: </h1>
            <div className={styles.HowToWrapper}>
                <h3>Object of the Game</h3>
                <p>To outsmart the computer with a clever code or great guesswork.</p> 
                <h3>Game Play</h3>
                <ul>
                    <li>The code can be made up of any combination of the colored pegs.</li>
                    <li>Try to duplicate the exact colors and positions of the hidden Code pegs.</li>
                    <li>Each guess is made by placing a row of colored pegs.</li>
                    <li>How a guess is scored:
                        <ul>
                            <li>The box to the right of each guess will use black, white, or gray pegs</li>
                            <li>A white peg indicates a correct color but wrong position.</li>
                            <li>A black peg indicates correct color and position.</li>
                            <li>A grey peg indicates neither are true.</li>
                            <li>Position of pegs in score box are NOT position specific</li>
                        </ul>
                    </li>
                    <li>Once the code is guessed, the timer will stop and, if logged in, your highscore will be registered.</li>
                    <li>Have Fun & Thanks for Playing!</li>
                </ul>
                </div>
        </div>
    )
}

export default HowTo