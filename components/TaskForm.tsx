import { useEffect, useState } from "react";
import { Input, Select, Button, Textarea, SelectItem } from "@nextui-org/react";

const TaskForm = (props: any) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [details, setDetails] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (props.task) {
      setId(props.task.id);
      setTitle(props.task.title);
      setDetails(props.task.details);
      setStatus(props.task.status);
    }
  }, []);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!title || !details || !status) {
      alert("Please fill in all fields");
      return;
    }

    if (id) {
    } else {
      const newTask = {
        title,
        details,
        status,
      };
    }
  };

  return (
    <div className="gap-5">
      <Input
        className="mt-4"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        className="mt-4"
        label="Details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
      <Select label="Status: " className="mt-4">
        <SelectItem key={1} value={"Moew"}>
          Moew
        </SelectItem>
      </Select>
      <Button className="mt-4 w-full" type="submit" color="success">
        Submit
      </Button>
    </div>
  );
};

export default TaskForm;
