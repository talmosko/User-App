import { useContext } from "react";
import AppContext from "../../store/app-context";
import Button from "../UI/Button";
import AddUser from "./AddUser";
import User from "./User";
import classes from "./Users.module.css";
const Users: React.FC = () => {
  const appContext = useContext(AppContext);
  //for each user

  return (
    <div className={classes["users__main-grid"]}>
      <div className={classes["users__details"]}>
        <div className="main-actions"></div>
        <User
          userData={appContext.users[0]}
          updateHandler={appContext.updateUser}
          deleteHandler={appContext.deleteUser}
        />
      </div>
      <div className={classes["users__actions"]}>
        <AddUser />
      </div>
    </div>
  );
};

export default Users;
