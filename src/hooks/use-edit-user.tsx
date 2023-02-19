import { z } from "zod";
import useInput from "./use-input";

//validation schemas
const nameSchema = z.string().min(3).max(20);
const emailSchema = z.string().email();

//validation functions
const validateName = (name: string) => {
  const result = nameSchema.safeParse(name);
  return result.success;
};
const validateEmail = (email: string) => {
  const result = emailSchema.safeParse(email);
  return result.success;
};

const useEditUser = (initialName: string = "", initialEmail: string = "") => {
  const nameState = useInput(
    initialName,
    validateName,
    "Please enter a valid name"
  );
  const emailState = useInput(
    initialEmail,
    validateEmail,
    "Please enter a valid email"
  );

  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    reset: resetNameInput,
  } = nameState;

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    reset: resetEmailInput,
  } = emailState;

  const isFormValid = enteredNameIsValid && enteredEmailIsValid;

  return {
    nameState,
    emailState,
    isFormValid,
  };
};

export default useEditUser;
