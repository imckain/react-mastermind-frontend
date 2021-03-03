import { useEffect, useRef } from 'react';
import styles from './GameTimer.module.css';
import { formatTime } from '../../services/utilities';

const GameTimer = (props) => {
  
  const callbackRef = useRef()

  function handleTick() {
    props.handleTimerUpdate();
  }
  
  useEffect(() => {
    callbackRef.current = handleTick
  });
  
  useEffect(() => {
    if(props.isTiming) {
      const timerId = setInterval(callbackRef.current, 1000);
      return () => {
        clearInterval(timerId)
      };
    }
  }, [props.isTiming]);

  return (
    <div className={styles.GameTimer}>
      {formatTime(props.elapsedTime)}
    </div>
  )
};

export default GameTimer;
