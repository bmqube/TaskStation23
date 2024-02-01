"use client";
import { useState, useEffect } from "react";
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import TaskForm from "./TaskForm";

export default function Navbar() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const myCookie = Cookies.get("auth-token");

  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (myCookie) {
      setIsLogged(true);
    } else {
      setIsLogged(false);
    }
  }, [myCookie]);

  return (
    <NavbarNextUI>
      <NavbarBrand>
        <p className="font-bold text-inherit">
          <Link className="text-white" href="/">
            TaskStation23
          </Link>
        </p>
      </NavbarBrand>
      <NavbarContent justify="end">
        {isLogged ? (
          <>
            <NavbarItem>
              <Button color="success" onPress={onOpen}>
                Add New Task
              </Button>
            </NavbarItem>

            <NavbarItem>
              <Button
                color="warning"
                onClick={() => {
                  Cookies.remove("auth-token");
                  setIsLogged(false);
                }}
                variant="flat"
              >
                Logout
              </Button>
            </NavbarItem>
          </>
        ) : (
          <>
            <NavbarItem className="text-success">
              <Link className="text-success" href="/login">
                Login
              </Link>
            </NavbarItem>
            <NavbarItem>
              <Button as={Link} color="success" href="/register" variant="flat">
                Register
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent className="p-6">
          <ModalHeader className="text-success">Add New Task</ModalHeader>
          <ModalBody>
            <p className="text-default-500">
              Please fill out the form below to add a new task.
            </p>
          </ModalBody>
          <TaskForm />
        </ModalContent>
      </Modal>
    </NavbarNextUI>
  );
}
