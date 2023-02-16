import { useContext, useState } from "react";
import AppContext from "../../store/app-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { z } from "zod";
import useInput from "../../hooks/use-input";

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

interface IAddUserProps {
  afterSendHandler: () => void;
}

const AddUser: React.FC<IAddUserProps> = ({ afterSendHandler }) => {
  const nameState = useInput(validateName, "Please enter a valid name");
  const emailState = useInput(validateEmail, "Please enter a valid email");
  const appContext = useContext(AppContext);

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

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  /* Handlers */
  const addUserHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = {
      name: enteredName,
      email: enteredEmail,
    };
    //validate the user data
    if (formIsValid) {
      appContext.addUser(userData);
      resetNameInput();
      resetEmailInput();
      afterSendHandler();
    } else return;
  };

  return (
    <>
      <h1>Add User</h1>
      <Card className="card">
        <form onSubmit={addUserHandler}>
          <Input
            label="Name"
            state={nameState}
            input={{
              type: "text",
              id: "name",
              value: enteredName,
            }}
          />
          <Input
            label="Email"
            state={emailState}
            input={{
              type: "email",
              id: "email",
              value: enteredEmail,
            }}
          />

          <div className="form-actions">
            <Button button={{ type: "submit" }}>Add User</Button>
            <Button button={{ type: "button" }}>Cancel</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
