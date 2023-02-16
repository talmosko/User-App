import { useContext, useState } from "react";
import AppContext from "../../store/app-context";
import Button from "../UI/Button";
import AddUser from "./AddUser";
import User from "./User";
import classes from "./Users.module.css";
const Users: React.FC = () => {
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const appContext = useContext(AppContext);
  const usersCards = appContext.users.map((user) => {
    return (
      <User
        key={user.id}
        userData={user}
        updateHandler={appContext.updateUser}
        deleteHandler={appContext.deleteUser}
      />
    );
  });

  return (
    <div className={classes["users__main-grid"]}>
      <div className={classes["users__details"]}>
        <div className="main-actions">
          <Button button={{ onClick: () => setShowAddUserForm(true) }}>
            Add User
          </Button>
        </div>
        {usersCards}
      </div>
      <div className={classes["users__actions"]}>
        {showAddUserForm && (
          <AddUser afterSendHandler={() => setShowAddUserForm(false)} />
        )}
        {/* <Todo />
        <Post /> */}
      </div>
    </div>
  );
};

export default Users;
