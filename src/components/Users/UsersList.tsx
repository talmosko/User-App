import { useContext, useState } from "react";
import useUsersAction from "../../hooks/use-users-action";
import AppContext from "../../store/data-context";
import Button from "../UI/Button";
import ActionsForUser from "./ActionsForUser";
import AddUser from "./User/AddUser";
import User from "./User/User";
import classes from "./Users.module.css";
const UsersList: React.FC = () => {
  const {
    chosenUserId,
    isAddUserAction,
    chooseUserHandler,
    promptAddUserHandler,
    resetHandler: resetAddUserHandler,
  } = useUsersAction();

  const appContext = useContext(AppContext);
  const usersCards = appContext.getAllUsers().map((user) => {
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
    <div className={classes["users__main-grid"]}>
      <div className={classes["users__details"]}>
        <div className="main-actions">
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
