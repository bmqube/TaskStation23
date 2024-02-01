"use client";
import { useState, useEffect } from "react";
import {
  Navbar as NavbarNextUI,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import Cookies from "js-cookie";

export default function Navbar() {
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
          <NavbarItem>
            <Button
              color="success"
              onClick={() => {
                Cookies.remove("auth-token");
                setIsLogged(false);
              }}
              variant="flat"
            >
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
