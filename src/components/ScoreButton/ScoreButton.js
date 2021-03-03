import styles from './ScoreButton.module.css';

const ScoreButton = (props) => (
  <button 
    className={`btn btn-default ${styles.button}`}
    onClick={props.handleScoreClick}
    disabled={props.disabled}>
    ✔️
  </button>
);

export default ScoreButton;
