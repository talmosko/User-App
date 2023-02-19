import { Dispatch, useReducer, useState } from "react";

export type UseInputState = {
  value: string;
  isValid: boolean;
  hasError: boolean;
  errorMessage: string;
  valueChangeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void;
  inputBlurHandler: (event: React.FocusEvent<HTMLInputElement>) => void;
  reset: () => void;
};

const useInput = (
  initialValue: string,
  validateValue: (val: string) => boolean,
  errorMessage: string
) => {
  const [isTouched, setIsTouched] = useState(false);
  const [value, setValue] = useState(initialValue);

  const valueIsValid = validateValue(value);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const inputBlurHandler = (event: React.FocusEvent<HTMLInputElement>) => {
    setIsTouched(true);
  };

  const reset = () => {
    setIsTouched(false);
    setValue("");
  };

  return {
    value: value,
    isValid: valueIsValid,
    hasError,
    errorMessage,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
