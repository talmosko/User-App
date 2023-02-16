import { Dispatch, useReducer } from "react";

const initialInputState = {
  value: "",
  isTouched: false,
};

export type UseInputState = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  errorMessage: string;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
};

type InputState = typeof initialInputState;
type InputAction =
  | { type: "INPUT"; value: string }
  | { type: "BLUR" }
  | { type: "RESET" };

const inputStateReducer = (state: InputState, action: InputAction) => {
  if (action.type === "INPUT") {
    return { value: action.value, isTouched: state.isTouched };
  }
  if (action.type === "BLUR") {
    return { isTouched: true, value: state.value };
  }
  if (action.type === "RESET") {
    return { isTouched: false, value: "" };
  }
  return state;
};

const useInput = (
  validateValue: (val: string) => boolean,
  errorMessage: string
) => {
  const [inputState, dispatch]: [InputState, Dispatch<InputAction>] =
    useReducer(inputStateReducer, initialInputState);

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({ type: "INPUT", value: event.target.value });
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    errorMessage,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
