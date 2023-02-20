import { Dispatch } from "react";
import AppContext, { IDataContext, IDataReducerState } from "./data-context";
import { useReducer } from "react";
import {
  InsertedPostType,
  InsertedTodoType,
  InsertedUserType,
  PostType,
  TodoType,
  UserType,
} from "./types";
import {
  getAllPostsFromAPI,
  getAllTodosFromAPI,
  getAllUsersFromAPI,
} from "./api-data-gateway";

/* REDUCER */

type TDataReducerAction =
  | {
      type: "GET_DATA";
      users: UserType[];
      todos: TodoType[];
      posts: PostType[];
    }
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
  | { type: "ADD_TODO"; todo: InsertedTodoType }
  | { type: "COMPLETED_TODO"; todoId: number }
  | { type: "ADD_POST"; post: InsertedPostType };

const dataReducer = (
  state: IDataReducerState,
  action: TDataReducerAction
): IDataReducerState => {
  if (action.type === "GET_DATA") {
    const users = action.users.map((user) => {
      const hasUncompletedTodos = action.todos.some(
        (todo) => todo.userId === user.id && !todo.completed
      );
      return {
        ...user,
        hasUncompletedTodos,
      };
    });

    return {
      ...state,
      users: users,
      todos: action.todos,
      posts: action.posts,
    };
  }
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
    const updatedTodos = state.todos.filter(
      (todo) => todo.userId !== action.id
    );
    const updatedPosts = state.posts.filter(
      (post) => post.userId !== action.id
    );
    return {
      ...state,
      users: updatedUsers,
      todos: updatedTodos,
      posts: updatedPosts,
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
    const updatedUsers = state.users.map((user) => {
      if (user.id === action.todo.userId) {
        return { ...user, hasUncompletedTodos: true };
      }
      return user;
    });
    return {
      ...state,
      todos: [...state.todos, newTodo],
      users: updatedUsers,
      updateMessage: new String("Todo Added"),
    };
  }
  if (action.type === "COMPLETED_TODO") {
    const updatedTodos = state.todos.map((todo) => {
      if (todo.id === action.todoId) {
        return { ...todo, completed: true };
      }
      return todo;
    });
    const updatedUsers = state.users.map((user) => {
      const hasUncompletedTodos = updatedTodos.some(
        (todo) => todo.userId === user.id && !todo.completed
      );
      return { ...user, hasUncompletedTodos };
    });
    return {
      ...state,
      todos: updatedTodos,
      users: updatedUsers,
      updateMessage: new String("Todo Completed"),
    };
  }

  if (action.type === "ADD_POST") {
    const newPost: PostType = {
      ...action.post,
      id: state.posts.length + 1,
    };
    return {
      ...state,
      posts: [...state.posts, newPost],
      updateMessage: new String("Post Added"),
    };
  }

  return state;
};

/* PROVIDER */

const defaultState = {
  users: [],
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

  const getAllDataFromAPI = async () => {
    const users = await getAllUsersFromAPI();
    const todos = await getAllTodosFromAPI();
    const posts = await getAllPostsFromAPI();
    dispatchAction({ type: "GET_DATA", users, todos, posts });
  };

  const getAllUsers = () => {
    return currentState.users;
  };
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

  const markCompletedTodoHandler = (id: number) => {
    dispatchAction({ type: "COMPLETED_TODO", todoId: id });
  };

  const getTodosForUser = (userId: number) => {
    return currentState.todos.filter((todo) => todo.userId === userId);
  };

  const addPost = (post: InsertedPostType) => {
    dispatchAction({ type: "ADD_POST", post });
  };

  const getPostsForUser = (userId: number) => {
    return currentState.posts.filter((post) => post.userId === userId);
  };

  const appContext = {
    updateError: currentState.updateError,
    updateMessage: currentState.updateMessage,
    getAllDataFromAPI: getAllDataFromAPI,
    getAllUsers: getAllUsers,
    updateUser: updateUserHandler,
    deleteUser: deleteUserHandler,
    addUser: addUserHandler,
    addTodo: addTodoHandler,
    markCompletedTodo: markCompletedTodoHandler,
    getTodosForUser: getTodosForUser,
    addPost: addPost,
    getPostsForUser: getPostsForUser,
  };
  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default DataProvider;
