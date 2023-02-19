import { useContext } from "react";
import DataContext from "../../store/data-context";
import Button from "../UI/Button";
import Card from "../UI/Card";

type TodoProps = {
  id: number;
  title: string;
  userId: number;
  completed: boolean;
};

const Todo: React.FC<TodoProps> = ({ id, title, userId, completed }) => {
  const dataContext = useContext(DataContext);

  const markCompleted = () => {
    dataContext.markCompletedTodo(id);
  };

  return (
    <Card className="todo">
      <div className="todo__details">
        Title: {title}
        <br />
        Completed: {completed.toString()}
      </div>
      <div className="actions">
        {!completed && (
          <Button button={{ type: "button", onClick: markCompleted }}>
            Mark Completed
          </Button>
        )}
      </div>
    </Card>
  );
};

export default Todo;
