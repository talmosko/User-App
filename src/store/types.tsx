export interface InsertedUserType {
  name: string;
  email: string;
}
export interface UserType extends InsertedUserType {
  id: number;
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
}

export interface InsertedTodoType {
  title: string;
  userId: number;
}
export type TodoType = {
  id: number;
  completed: boolean;
};

export type PostType = {};
