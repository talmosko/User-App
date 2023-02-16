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

export type TodoType = {};

export type PostType = {};
