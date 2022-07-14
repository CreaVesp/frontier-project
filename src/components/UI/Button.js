import classes from './Button.module.css';

const Button = props => {
  return (
    <button
      className={`${classes.button} ${props.classNameProp}`}
      onClick={props.onClick}
      type={props.type}>
      {props.text}
    </button>
  );
};

export default Button;
