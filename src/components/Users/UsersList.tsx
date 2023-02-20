import { useContext, useEffect, useState } from "react";
import { useSearch } from "../../hooks/use-search";
import useUsersAction from "../../hooks/use-users-action";
import AppContext from "../../store/data-context";
import { UserType } from "../../store/types";
import Button from "../UI/Button";
import Input from "../UI/Input";
import ActionsForUser from "./ActionsForUser";
import AddUser from "./User/AddUser";
import User from "./User/User";
import classes from "./UsersList.module.css";
const UsersList: React.FC = () => {
  const {
    chosenUserId,
    isAddUserAction,
    chooseUserHandler,
    promptAddUserHandler,
    resetHandler: resetAddUserHandler,
  } = useUsersAction();

  const appContext = useContext(AppContext);
  useEffect(() => {
    appContext.getAllDataFromAPI();
  }, []);

  const {
    onChange: onSearchChange,
    search: searchTerm,
    filtered: filteredUsers,
  } = useSearch<UserType>(["name", "email"], appContext.getAllUsers());

  const usersCards = filteredUsers.map((user) => {
    return (
      <User
        key={user.id}
        userData={user}
        resetAddUserHandler={resetAddUserHandler}
        chooseUserHandler={chooseUserHandler.bind(null, user.id)}
        isChosen={chosenUserId === user.id}
      />
    );
  });

  return (
    <div className={classes["users-list__main-grid"]}>
      <div className={classes["users-list__details"]}>
        <div className="header">
          <Input
            label="Search"
            input={{
              type: "text",
              id: "search",
              value: searchTerm,
              onChange: onSearchChange,
            }}
          />
          <Button
            button={{
              onClick: () =>
                !isAddUserAction
                  ? promptAddUserHandler()
                  : resetAddUserHandler(),
            }}
          >
            Add User
          </Button>
        </div>
        {usersCards}
      </div>
      <div className={classes["users__actions"]}>
        {isAddUserAction && (
          <AddUser resetAddUserHandler={resetAddUserHandler} />
        )}
        {!isAddUserAction && chosenUserId !== -1 && (
          <ActionsForUser userId={chosenUserId} />
        )}
      </div>
    </div>
  );
};

export default UsersList;
