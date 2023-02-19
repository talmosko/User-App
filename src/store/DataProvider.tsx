import { Dispatch } from "react";
import AppContext, { IDataContext, IDataReducerState } from "./data-context";
import { useReducer } from "react";
import {
  InsertedTodoType,
  InsertedUserType,
  PostType,
  TodoType,
  UserType,
} from "./types";

/* REDUCER */

type TDataReducerAction =
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
  | { type: "ADD_TODO"; todo: InsertedTodoType };

const dataReducer = (
  state: IDataReducerState,
  action: TDataReducerAction
): IDataReducerState => {
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
      updateMessage: new String("User Added"),
    };
  }

  if (action.type === "UPDATE_USER") {
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.user.id) {
        return action.user;
      }
      return user;
    });
    return {
      ...state,
      users: updatedUsers,
      updateMessage: new String("User Updated"),
    };
  }

  if (action.type === "DELETE_USER") {
    const updatedUsers = state.users.filter((user) => user.id !== action.id);
    return {
      ...state,
      users: updatedUsers,
      updateError: undefined,
      updateMessage: new String("User Deleted"),
    };
  }

  if (action.type === "ADD_TODO") {
    const newTodo: TodoType = {
      ...action.todo,
      id: state.todos.length + 1,
      completed: false,
    };
    return {
      ...state,
      todos: [...state.todos, newTodo],
      updateMessage: new String("Todo Added"),
    };
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
  updateMessage: undefined,
};

type DataProviderProps = {
  children: React.ReactNode;
};

const DataProvider: React.FC<DataProviderProps> = (props) => {
  const [currentState, dispatchAction]: [
    IDataReducerState,
    Dispatch<TDataReducerAction>
  ] = useReducer(dataReducer, defaultState);

  const updateUserHandler = (user: UserType) => {
    dispatchAction({ type: "UPDATE_USER", user });
  };

  const deleteUserHandler = (id: number) => {
    dispatchAction({ type: "DELETE_USER", id });
  };

  const addUserHandler = (user: InsertedUserType) => {
    dispatchAction({ type: "ADD_USER", user });
  };

  const addTodoHandler = (todo: InsertedTodoType) => {
    dispatchAction({ type: "ADD_TODO", todo });
  };
  const appContext = {
    ...currentState,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler,
    addUser: addUserHandler,
    addTodo: addTodoHandler,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default DataProvider;
