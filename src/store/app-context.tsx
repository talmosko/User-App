import React from "react";
import { IReducerState } from "./AppProvider";
import { PostType, TodoType, UserType } from "./types";

export interface IAppContext extends IReducerState {
  updateUser: (user: UserType) => void;
  deleteUser: (id: number) => void;
  closeModal: () => void;
  setModalMessage: (message: string) => void;
}

const AppContext: React.Context<IAppContext> = React.createContext({
  users: [],
  todos: [],
  posts: [],
  updateError: undefined,
  modalMessage: undefined,
  updateUser: (user: UserType) => {},
  deleteUser: (id: number) => {},
  closeModal: () => {},
  setModalMessage: (message: string) => {},
} as IAppContext);

export default AppContext;
