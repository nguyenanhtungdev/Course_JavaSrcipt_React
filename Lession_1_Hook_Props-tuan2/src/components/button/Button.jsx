import styles from "./Button.module.css";
// eslint-disable-next-line react/prop-types
const Button = ({ text, onClick, color = "blue" }) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.button ? styles.button : ""} ${
        styles[color] ? styles[color] : ""
      }`}
    >
      {text}
    </button>
  );
};

export default Button;
