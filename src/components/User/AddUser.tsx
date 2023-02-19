import { useContext, useState } from "react";
import AppContext from "../../store/data-context";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import { z } from "zod";
import useInput from "../../hooks/use-input";
import useEditUser from "../../hooks/use-edit-user";

interface IAddUserProps {
  resetAddUserHandler: () => void;
}

const AddUser: React.FC<IAddUserProps> = ({ resetAddUserHandler }) => {
  const { nameState, emailState, isFormValid } = useEditUser();
  const appContext = useContext(AppContext);

  /* Handlers */
  const addUserHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const userData = {
      name: nameState.value,
      email: emailState.value,
    };
    //validate the user data
    if (isFormValid) {
      appContext.addUser(userData);
      nameState.reset();
      emailState.reset();
      resetAddUserHandler();
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
              value: nameState.value,
            }}
          />
          <Input
            label="Email"
            state={emailState}
            input={{
              type: "email",
              id: "email",
              value: emailState.value,
            }}
          />

          <div className="actions">
            <Button button={{ type: "button", onClick: resetAddUserHandler }}>
              Cancel
            </Button>
            <Button button={{ type: "submit" }}>Add User</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
