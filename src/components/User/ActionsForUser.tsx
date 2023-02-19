import { useContext, useState } from "react";
import DataContext from "../../store/data-context";
import AddPost from "../Post/AddPost";
import Post from "../Post/Post";
import AddTodo from "../Todo/AddTodo";
import Todo from "../Todo/Todo";
import Button from "../UI/Button";
import classes from "./ActionsForUser.module.css";

type ActionsForUserProps = {
  userId: number;
};

const ActionsForUser: React.FC<ActionsForUserProps> = ({ userId }) => {
  const [isAddTodoAction, setIsAddTodoAction] = useState<boolean>(false);
  const [isAddPostAction, setIsAddPostAction] = useState<boolean>(false);

  const dataProvider = useContext(DataContext);
  const todosForUser = dataProvider.getTodosForUser(userId);
  const postsForUser = dataProvider.getPostsForUser(userId);

  const showTodoList = () => {
    setIsAddTodoAction(false);
  };

  const showAddTodo = () => {
    setIsAddTodoAction(true);
  };

  const showPostsList = () => {
    setIsAddPostAction(false);
  };

  const showAddPost = () => {
    setIsAddPostAction(true);
  };

  return (
    <div className={classes["user-actions"]}>
      <div className="user-todos">
        {!isAddTodoAction && (
          <div className="user-todos__list">
            <div className="header">
              <h1>Todos - User {userId}</h1>
              <Button button={{ type: "button", onClick: showAddTodo }}>
                Add
              </Button>
            </div>
            {todosForUser.map((todo) => {
              return <Todo key={todo.id} {...todo} />;
            })}
          </div>
        )}
        {isAddTodoAction && (
          <AddTodo userId={userId} showTodoList={showTodoList}></AddTodo>
        )}
      </div>

      <div className={classes["user-posts"]}>
        {!isAddPostAction && (
          <div className="user-posts__list">
            <div className="header">
              <h1>Posts - User {userId}</h1>
              <Button button={{ type: "button", onClick: showAddPost }}>
                Add
              </Button>
            </div>
            {postsForUser.map((post) => {
              return <Post key={post.id} {...post} />;
            })}
          </div>
        )}
        {isAddPostAction && (
          <AddPost userId={userId} showPostsList={showPostsList}></AddPost>
        )}
      </div>
    </div>
  );
};

export default ActionsForUser;
