import Card from "../UI/Card";

type PostProps = {
  id: number;
  title: string;
  body: string;
  userId: number;
};

const Post: React.FC<PostProps> = ({ id, title, body, userId }) => {
  return (
    <Card className="post">
      <h1>{title}</h1>
      <p>{body}</p>
    </Card>
  );
};

export default Post;
