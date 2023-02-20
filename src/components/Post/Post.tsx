import { InsertedPostType, PostType } from "../../store/types";
import Card from "../UI/Card";

const Post: React.FC<InsertedPostType> = ({ title, body }) => {
  return (
    <Card className="post">
      <h1>title: {title}</h1>
      <p>body: {body}</p>
    </Card>
  );
};

export default Post;
