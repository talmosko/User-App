import { Dispatch } from "react";
import AppContext, { IAppContext } from "./app-context";
import { useReducer } from "react";
import { InsertedUserType, PostType, TodoType, UserType } from "./types";

/* REDUCER */
export interface IReducerState {
  users: UserType[];
  todos: TodoType[];
  posts: PostType[];
  updateError: Error | undefined;
  modalMessage: string | undefined;
}

type TReducerAction =
  | {
      type: "ADD_USER";
      user: InsertedUserType;
    }
  | {
      type: "UPDATE_USER";
      user: UserType;
    }
  | {
      type: "DELETE_USER";
      id: number;
    }
  | {
      type: "CLOSE_MODAL";
    }
  | { type: "MODAL_MESSAGE"; message: string };

const appReducer = (
  state: IReducerState,
  action: TReducerAction
): IReducerState => {
  if (action.type === "ADD_USER") {
    const newUser: UserType = {
      ...action.user,
      id: state.users.length + 1,
      address: {
        street: "",
        city: "",
        zipcode: "",
      },
    };
    return {
      ...state,
      users: [...state.users, newUser],
      modalMessage: "User Added",
    };
  }

  if (action.type === "UPDATE_USER") {
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.user.id) {
        return action.user;
      }
      return user;
    });
    return { ...state, users: updatedUsers, modalMessage: "User Updated" };
  }

  if (action.type === "DELETE_USER") {
    const updatedUsers = state.users.filter((user) => user.id !== action.id);
    return {
      ...state,
      users: updatedUsers,
      updateError: undefined,
      modalMessage: "User Deleted",
    };
  }
  if (action.type === "MODAL_MESSAGE") {
    return { ...state, modalMessage: action.message };
  }

  if (action.type === "CLOSE_MODAL") {
    return { ...state, updateError: undefined, modalMessage: undefined };
  }
  return state;
};

/* PROVIDER */

const defaultState = {
  users: [
    {
      id: 1,
      name: "Leanne Graham",
      email: "Sincere@april.biz",
      address: {
        street: "Kulas Light",
        city: "Gwenborough",
        zipcode: "92998-3874",
      },
    },
  ],
  todos: [],
  posts: [],
  updateError: undefined,
  modalMessage: undefined,
};

type AppProviderProps = {
  children: React.ReactNode;
};

const AppProvider: React.FC<AppProviderProps> = (props) => {
  const [currentState, dispatchAction]: [
    IReducerState,
    Dispatch<TReducerAction>
  ] = useReducer(appReducer, defaultState);

  const updateUserHandler = (user: UserType) => {
    dispatchAction({ type: "UPDATE_USER", user });
  };

  const deleteUserHandler = (id: number) => {
    dispatchAction({ type: "DELETE_USER", id });
  };

  const closeModalHandler = () => {
    dispatchAction({ type: "CLOSE_MODAL" });
  };

  const modalMessageHandler = (message: string) => {
    dispatchAction({ type: "MODAL_MESSAGE", message });
  };

  const addUserHandler = (user: InsertedUserType) => {
    dispatchAction({ type: "ADD_USER", user });
  };

  const appContext = {
    ...currentState,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler,
    closeModal: closeModalHandler,
    setModalMessage: modalMessageHandler,
    addUser: addUserHandler,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppProvider;
