import React, { useContext, useRef, useState } from "react";
import Button from "../../UI/Button";
import Card from "../../UI/Card";
import Input from "../../UI/Input";
import classes from "./User.module.css";
import { UserType } from "../../../store/types";
import useEditUser from "../../../hooks/use-edit-user";
import DataContext from "../../../store/data-context";
interface IUserProps {
  userData: UserType;
  chooseUserHandler: () => void;
  resetAddUserHandler: () => void;
  isChosen: boolean;
}

const User: React.FC<IUserProps> = ({
  userData,
  chooseUserHandler,
  resetAddUserHandler,
  isChosen,
}) => {
  const dataContext = useContext(DataContext);
  const [presentOtherData, setPresentOtherData] = useState(false);

  const { nameState, emailState, isFormValid } = useEditUser(
    userData.name,
    userData.email
  );
  const [addressFields, setAddressFields] = useState({ ...userData.address });

  const updateUserHandler = (event: React.FormEvent) => {
    event.preventDefault();
    //get the updated user data from refs
    const updatedUserData = {
      ...userData,
      name: nameState.value,
      email: emailState.value,
      address: {
        ...addressFields,
      },
    };
    //update the context
    dataContext.updateUser(updatedUserData);
  };

  const deleteUserHandler = (e: React.MouseEvent) => {
    e.preventDefault();
    dataContext.deleteUser(userData.id);
    resetAddUserHandler();
  };
  const UserOtherData = (
    <Card>
      <Input
        label="Street"
        input={{
          type: "text",
          id: "Street",
          value: addressFields.street,
          onChange: (e) => {
            setAddressFields({ ...addressFields, street: e.target.value });
          },
        }}
      />
      <Input
        label="City"
        input={{
          type: "text",
          id: "City",
          defaultValue: addressFields.city,
          onChange: (e) => {
            setAddressFields({ ...addressFields, city: e.target.value });
          },
        }}
      />
      <Input
        label="Zip Code"
        input={{
          type: "text",
          id: "Zip Code",
          defaultValue: addressFields.zipcode,
          onChange: (e) => {
            setAddressFields({ ...addressFields, zipcode: e.target.value });
          },
        }}
      />
    </Card>
  );

  const className = `${classes["user-card"]} ${
    userData.hasUncompletedTodos ? classes["user-card--uncompleted"] : ""
  } ${isChosen ? classes["user-card--chosen"] : ""}`;

  return (
    <Card className={className}>
      <form className={classes["user__form"]} onSubmit={updateUserHandler}>
        <div className="user__data" onClick={chooseUserHandler}>
          <p> ID: {userData.id}</p>

          <Input
            label="Name"
            state={nameState}
            input={{ type: "text", id: "Name", value: nameState.value }}
          />
          <Input
            label="Email"
            state={emailState}
            input={{ type: "text", id: "Email", value: emailState.value }}
          />
        </div>
        <div className="user__other-data" onClick={chooseUserHandler}>
          <Button
            button={{
              className: "button--other-data",
              onMouseOver: (e) => {
                e.preventDefault;
                setPresentOtherData(true);
              },
              onClick: (e) => {
                e.preventDefault();
                setPresentOtherData(false);
              },
            }}
          >
            Other Data
          </Button>
          {presentOtherData && UserOtherData}
        </div>
        <div className={"actions"} onClick={() => {}}>
          <Button button={{ type: "submit" }}>Update</Button>
          <Button button={{ onClick: deleteUserHandler }}>Delete</Button>
        </div>
      </form>
    </Card>
  );
};

export default User;
