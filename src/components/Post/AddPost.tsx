import { useContext, useState } from "react";
import AppContext from "../../store/data-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { z } from "zod";
import useInput from "../../hooks/use-input";

//validation schemas
const TitleSchema = z.string().min(3);
const BodySchema = z.string().min(3);

//validation functions
const validateTitle = (name: string) => {
  const result = TitleSchema.safeParse(name);
  return result.success;
};

const validateBody = (name: string) => {
  const result = BodySchema.safeParse(name);
  return result.success;
};

interface IAddPostProps {
  userId: number;
  showPostsList: () => void;
}

const AddPost: React.FC<IAddPostProps> = ({ userId, showPostsList }) => {
  const titleState = useInput(validateTitle, "Please enter a valid title");
  const bodyState = useInput(validateBody, "Please enter a valid body");
  const appContext = useContext(AppContext);

  const {
    value: enteredTitle,
    isValid: enteredTitleIsValid,
    reset: resetTitleInput,
  } = titleState;

  const {
    value: enteredBody,
    isValid: enteredBodyIsValid,
    reset: resetBodyInput,
  } = bodyState;

  const isFormValid = enteredTitleIsValid && enteredBodyIsValid;

  /* Handlers */
  const addPostHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const postData = {
      title: enteredTitle,
      body: enteredBody,
      userId: userId,
    };
    //validate the user data
    if (isFormValid) {
      appContext.addPost(postData);
      resetTitleInput();
      showPostsList();
    } else return;
  };

  return (
    <>
      <h1>New Todo - User {userId}</h1>
      <Card className="card">
        <form onSubmit={addPostHandler}>
          <Input
            label="Title"
            state={titleState}
            input={{
              type: "text",
              id: "title",
              value: enteredTitle,
            }}
          />
          <Input
            label="Body"
            state={bodyState}
            input={{
              type: "text",
              id: "body",
              value: enteredBody,
            }}
          />

          <div className="actions">
            <Button button={{ type: "button", onClick: showPostsList }}>
              Cancel
            </Button>
            <Button button={{ type: "submit" }}>Add</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddPost;
