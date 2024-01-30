"use client";
import { useState } from "react";
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

export default function Navbar() {
  const [isLogged, setIsLogged] = useState(false);
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
          <NavbarItem>
            <Button as={Link} color="success" href="/register" variant="flat">
              Logout
            </Button>
          </NavbarItem>
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
    </NavbarNextUI>
  );
}
