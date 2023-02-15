import React from "react";
import classes from "./Input.module.css";

interface IInputProps {
  label: string;
  input: {
    id: string;
    type: string;
    defaultValue?: string;
  };
}
const Input: React.ForwardRefExoticComponent<
  IInputProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef((props, ref) => {
  return (
    <div className={classes.input}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input ref={ref} {...props.input} />
    </div>
  );
});

export default Input;
