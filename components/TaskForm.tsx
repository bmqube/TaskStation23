import { useEffect, useState } from "react";
import { Input, Select, Button, Textarea, SelectItem } from "@nextui-org/react";

const TaskForm = (props: any) => {
  const [id, setId] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (props.task) {
      setId(props.task.id);
      setTitle(props.task.title);
      setDescription(props.task.description);
      setStatus(props.task.status);
    }
  }, []);

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    console.log(title, description, status);

    try {
      if (!title || !description || !status) {
        alert("Please fill in all fields");
        return;
      }

      if (id) {
      } else {
        const newTask = {
          title,
          description,
          status,
        };

        const res = await fetch("/api/tasks", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newTask),
        });

        const resData = await res.json();
        console.log(resData);
      }
    } catch (error) {
      console.log(error);
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
        label="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        onChange={(e) => {
          console.log(e);
          setStatus(e.target.value);
        }}
        label="Status: "
        className="mt-4"
      >
        <SelectItem key={69} value="Moew">
          Moew
        </SelectItem>
      </Select>
      <Button
        onClick={handleSubmit}
        className="mt-4 w-full"
        type="submit"
        color="success"
      >
        Submit
      </Button>
    </div>
  );
};

export default TaskForm;
