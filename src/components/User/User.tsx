import { useContext, useRef, useState } from "react";
import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";
import classes from "./User.module.css";
import AppContext from "../../store/app-context";
import { UserType } from "../../store/types";

interface IUserProps {
  userData: UserType;
  updateHandler: (userData: UserType) => void;
  deleteHandler: (id: number) => void;
}
const User: React.FC<IUserProps> = ({
  userData,
  updateHandler,
  deleteHandler,
}) => {
  const [presentOtherData, setPresentOtherData] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const streetInputRef = useRef<HTMLInputElement>(null);
  const cityInputRef = useRef<HTMLInputElement>(null);
  const zipcodeInputRef = useRef<HTMLInputElement>(null);
  console.log(userData);

  const updateUserHandler = () => {
    //get the updated user data from refs
    const updatedUserData = {
      ...userData,
      name: nameInputRef.current!.value,
      email: emailInputRef.current!.value,
      address: {
        street: streetInputRef.current
          ? streetInputRef.current?.value
          : userData.address.street,
        city: cityInputRef.current
          ? cityInputRef.current?.value
          : userData.address.city,
        zipcode: zipcodeInputRef.current
          ? zipcodeInputRef.current?.value
          : userData.address.zipcode,
      },
    };
    //update the context
    updateHandler(updatedUserData);
  };

  const deleteUserHandler = () => {
    deleteHandler(userData.id);
  };
  const UserOtherData = (
    <Card>
      <Input
        ref={streetInputRef}
        label="Street"
        input={{
          type: "text",
          id: "Street",
          defaultValue: userData.address.street,
        }}
      />
      <Input
        ref={cityInputRef}
        label="City"
        input={{
          type: "text",
          id: "City",
          defaultValue: userData.address.city,
        }}
      />
      <Input
        ref={zipcodeInputRef}
        label="Zip Code"
        input={{
          type: "text",
          id: "Zip Code",
          defaultValue: userData.address.zipcode,
        }}
      />
    </Card>
  );

  return (
    <Card>
      <p> ID: {userData.id}</p>
      <Input
        ref={nameInputRef}
        label="Name"
        input={{ type: "text", id: "Name", defaultValue: userData.name }}
      />
      <Input
        ref={emailInputRef}
        label="Email"
        input={{ type: "text", id: "Email", defaultValue: userData.email }}
      />
      <Button
        button={{
          className: "other-data__button",
          onMouseOver: () => setPresentOtherData(true),
          onClick: () => setPresentOtherData(false),
        }}
      >
        {"Other Data"}
      </Button>
      {presentOtherData && UserOtherData}

      <div className={classes["user-actions"]}>
        <Button button={{ onClick: updateUserHandler }}>{"Update"}</Button>
        <Button button={{ onClick: deleteUserHandler }}>{"Delete"}</Button>
      </div>
    </Card>
  );
};

export default User;
