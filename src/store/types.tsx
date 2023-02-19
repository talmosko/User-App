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
export interface TodoType extends InsertedTodoType {
  id: number;
  completed: boolean;
}

export interface InsertedPostType {
  title: string;
  body: string;
  userId: number;
}
export interface PostType extends InsertedPostType {
  id: number;
}
