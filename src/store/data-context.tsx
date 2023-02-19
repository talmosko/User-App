import React from "react";
import {
  InsertedTodoType,
  InsertedUserType,
  PostType,
  TodoType,
  UserType,
} from "./types";

export interface IDataReducerState {
  users: UserType[];
  todos: TodoType[];
  posts: PostType[];
  updateError: Error | undefined;
  updateMessage: String | undefined;
}
export interface IDataContext extends IDataReducerState {
  updateUser: (user: UserType) => void;
  deleteUser: (id: number) => void;
  addUser(user: InsertedUserType): void;
  addTodo: (todo: InsertedTodoType) => void;
}

const DataContext: React.Context<IDataContext> = React.createContext({
  users: [],
  todos: [],
  posts: [],
  updateError: undefined,
  updateMessage: undefined,
  updateUser: (user: UserType) => {},
  deleteUser: (id: number) => {},
  addUser: (user: InsertedUserType) => {},
  addTodo: (todo: InsertedTodoType) => {},
} as IDataContext);

export default DataContext;
