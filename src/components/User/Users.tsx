import { useContext, useState } from "react";
import useUsersAction from "../../hooks/use-users-action";
import AppContext from "../../store/data-context";
import AddTodo from "../Todo/AddTodo";
import Button from "../UI/Button";
import AddUser from "./AddUser";
import User from "./User";
import classes from "./Users.module.css";
const Users: React.FC = () => {
  const {
    chosenUserId,
    isAddUserAction,
    chooseUserHandler,
    promptAddUserHandler,
    resetHandler,
  } = useUsersAction();

  const appContext = useContext(AppContext);
  const usersCards = appContext.users.map((user) => {
    return (
      <User
        key={user.id}
        userData={user}
        updateHandler={appContext.updateUser}
        deleteHandler={(id: number) => {
          appContext.deleteUser(id);
          resetHandler();
        }}
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
                !isAddUserAction ? promptAddUserHandler() : resetHandler(),
            }}
          >
            Add User
          </Button>
        </div>
        {usersCards}
      </div>
      <div className={classes["users__actions"]}>
        {isAddUserAction && <AddUser resetHandler={resetHandler} />}
        {!isAddUserAction && chosenUserId !== -1 && (
          <AddTodo userId={chosenUserId} resetHandler={() => resetHandler} />
        )}
      </div>
    </div>
  );
};

export default Users;
