import Style from "./Button.module.css";
const Button = ({ bntName, handleClick, classStyle }) => {
  return (
    <button className={Style.button} type="button" onClick={handleClick}>
      {bntName}
    </button>
  );
};

export default Button;
