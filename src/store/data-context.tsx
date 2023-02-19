import React from "react";
import {
  InsertedPostType,
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
export interface IDataContext {
  updateError: Error | undefined;
  updateMessage: String | undefined;
  getAllUsers: () => UserType[];
  updateUser: (user: UserType) => void;
  deleteUser: (id: number) => void;
  addUser(user: InsertedUserType): void;
  addTodo: (todo: InsertedTodoType) => void;
  markCompletedTodo: (id: number) => void;
  getTodosForUser: (userId: number) => TodoType[];
  addPost: (post: InsertedPostType) => void;
  getPostsForUser: (userId: number) => PostType[];
}

const DataContext: React.Context<IDataContext> = React.createContext({
  updateError: undefined,
  updateMessage: undefined,
  getAllUsers: () => {
    return [];
  },
  updateUser: (user: UserType) => {},
  deleteUser: (id: number) => {},
  addUser: (user: InsertedUserType) => {},
  addTodo: (todo: InsertedTodoType) => {},
  markCompletedTodo: (id: number) => {},
  getTodosForUser: (userId: number) => {
    return [];
  },
  addPost: (post: InsertedPostType) => {},
  getPostsForUser: (userId: number) => {
    return [];
  },
} as IDataContext);

export default DataContext;
