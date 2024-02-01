"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { EditIcon, DeleteIcon } from "@/components/icons";
// import { columns, users } from "./data";
import TaskForm from "@/components/TaskForm";
import { log } from "console";

export default function App() {
  const [tasks, setTasks] = React.useState([]);
  const [columns, setColumns] = React.useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetch("/api/tasks");
      const data = await tasksFromServer.json();
      console.log(data);

      setTasks(data.data);
      setColumns(Object.keys(data.data[0]));
    };

    getTasks();
  }, []);

  return (
    <div className="container mx-auto">
      <Table aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Title</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Status</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody>
          {tasks.length > 0 &&
            tasks.map((task, index) => (
              <TableRow key={index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>
                  <div className="flex">
                    <Tooltip content="Edit task">
                      <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                        <EditIcon />
                      </span>
                    </Tooltip>
                    <Tooltip color="danger" content="Delete task">
                      <span className="ms-2 text-lg text-danger cursor-pointer active:opacity-50">
                        <DeleteIcon />
                      </span>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
