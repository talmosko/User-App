import { useContext, useState } from "react";
import AppContext from "../../store/data-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { z } from "zod";
import useInput from "../../hooks/use-input";

//validation schemas
const TitleSchema = z.string().min(3);

//validation functions
const validateTitle = (name: string) => {
  const result = TitleSchema.safeParse(name);
  return result.success;
};

interface IAddTodoProps {
  resetHandler: () => void;
  userId: number;
}

const AddTodo: React.FC<IAddTodoProps> = ({ resetHandler, userId }) => {
  const titleState = useInput(validateTitle, "Please enter a valid title");
  const appContext = useContext(AppContext);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    reset: resetTitleInput,
  } = titleState;

  /* Handlers */
  const addTodoHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const todoData = {
      title: enteredTitle,
      userId: userId,
    };
    //validate the user data
    if (enteredTitleIsValid) {
      appContext.addTodo(todoData);
      resetTitleInput();
      resetHandler();
    } else return;
  };

  return (
    <>
      <h1>New Todo - User {userId}</h1>
      <Card className="card">
        <form onSubmit={addTodoHandler}>
          <Input
            label="Title"
            state={titleState}
            input={{
              type: "text",
              id: "title",
              value: enteredTitle,
            }}
          />

          <div className="form-actions">
            <Button button={{ type: "submit" }}>Add</Button>
            <Button button={{ type: "button" }}>Cancel</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddTodo;
