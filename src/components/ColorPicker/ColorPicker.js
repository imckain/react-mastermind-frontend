import styles from './ColorPicker.module.css';

const ColorPicker = (props) => (
  <div className={styles.ColorPicker}>
    {props.colors.map((color, idx)=> 
      <button 
        key={color} 
        className={styles.button}
        style={{
          backgroundColor: idx === props.selColorIdx ? 'white' : color,
          borderColor: color
        }} 
        onClick={() => props.setColorIdx(idx)}
        />
      )}
  </div>
);

export default ColorPicker;
