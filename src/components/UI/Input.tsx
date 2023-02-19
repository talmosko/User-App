import React, { ChangeEvent, ChangeEventHandler, SetStateAction } from "react";
import { ZodError } from "zod";
import { UseInputState } from "../../hooks/use-input";
import classes from "./Input.module.css";

interface IInputProps {
  label: string;
  state?: UseInputState;
  input: {
    id: string;
    type: string;
    defaultValue?: string;
    value?: string;
    onChange?: ChangeEventHandler<HTMLInputElement>;
  };
}
const Input: React.ForwardRefExoticComponent<
  IInputProps & React.RefAttributes<HTMLInputElement>
> = React.forwardRef((props, ref) => {
  const inputClasses =
    props.state && props.state.hasError
      ? `${classes["form-control"]} ${classes["invalid"]}`
      : classes["form-control"];

  return (
    <div className={inputClasses}>
      <label htmlFor={props.input.id}>{props.label}</label>
      <input
        ref={ref}
        onBlur={props.state && props.state.inputBlurHandler}
        onChange={props.state && props.state.valueChangeHandler}
        {...props.input}
      />

      {props.state && props.state.hasError && (
        <div className={classes["error-text"]}>
          <p>{props.state.errorMessage}</p>
        </div>
      )}
    </div>
  );
});

export default Input;
