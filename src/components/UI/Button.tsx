import classes from "./Button.module.css";
interface ButtonProps {
  children?: React.ReactNode;
  button?: {
    type?: "button" | "submit" | "reset";
    className?: "other-data__button";
    onMouseOver?: () => void;
    onClick?: () => void;
  };
}
const Button: React.FC<ButtonProps> = ({ children, button }) => {
  return (
    <button
      {...button}
      className={button && button.className && classes[button.className]}
    >
      {children}
    </button>
  );
};

export default Button;
