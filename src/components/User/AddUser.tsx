import Button from "../UI/Button";
import Card from "../UI/Card";
import Input from "../UI/Input";

const AddUser = () => {
  return (
    <>
      <h1>Add User</h1>
      <Card>
        <form action="">
          <Input label="Name" input={{ type: "text", id: "name" }} />
          <Input label="Email" input={{ type: "email", id: "email" }} />

          <div>
            <Button button={{ type: "submit" }}>Add User</Button>
            <Button button={{ type: "button" }}>Cancel</Button>
          </div>
        </form>
      </Card>
    </>
  );
};

export default AddUser;
