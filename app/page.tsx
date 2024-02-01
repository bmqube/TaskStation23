"use client";
import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
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
            tasks.map((task: any, index) => (
              <TableRow key={index}>
                <TableCell>{task.id}</TableCell>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.status}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
}
