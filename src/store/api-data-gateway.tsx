import axios from "axios";
import { PostType, TodoType, UserType } from "./types";

const getAll = (url: string) => axios.get(url);

const getAllUsersFromAPI = async (): Promise<UserType[]> => {
  const res = await getAll("https://jsonplaceholder.typicode.com/users");
  const data = await res.data;
  return data.map((user: any) => {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      address: {
        street: user.address.street,
        city: user.address.city,
        zipcode: user.address.zipcode,
      },
    } as UserType;
  });
};
const getAllTodosFromAPI = async (): Promise<TodoType[]> => {
  const res = await getAll("https://jsonplaceholder.typicode.com/todos");
  const data = await res.data;
  return data.map((todo: any) => {
    return {
      id: todo.id,
      title: todo.title,
      completed: todo.completed,
      userId: todo.userId,
    } as TodoType;
  });
};
const getAllPostsFromAPI = async (): Promise<PostType[]> => {
  const res = await getAll("https://jsonplaceholder.typicode.com/posts");
  const data = await res.data;
  return data.map((post: any) => {
    return {
      id: post.id,
      title: post.title,
      body: post.body,
      userId: post.userId,
    } as PostType;
  });
};

export { getAllUsersFromAPI, getAllTodosFromAPI, getAllPostsFromAPI };
