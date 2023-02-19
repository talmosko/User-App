import { useState } from "react";

const useUsersAction = () => {
  const [isAddUserAction, setIsAddUserAction] = useState(false);
  const [chosenUserId, setChosenUserId] = useState(-1);

  const reset = () => {
    setIsAddUserAction(false);
    setChosenUserId(-1);
  };

  const chooseUserHandler = (userId: number) => {
    setChosenUserId(userId);
    setIsAddUserAction(false);
  };

  const promptAddUserHandler = () => {
    setIsAddUserAction(true);
    setChosenUserId(-1);
  };

  return {
    chosenUserId: chosenUserId,
    isAddUserAction: isAddUserAction,
    chooseUserHandler: chooseUserHandler,
    promptAddUserHandler: promptAddUserHandler,
    resetHandler: reset,
  };
};

export default useUsersAction;
