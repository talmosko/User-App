import classes from "./Card.module.css";
interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}
const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`${classes.card} ${props.className}`}
      onClick={props.onClick}
    >
      {props.children}
    </div>
  );
};

export default Card;
