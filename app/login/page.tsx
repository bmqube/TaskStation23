"use client";
import {
  Card,
  CardBody,
  CardHeader,
  Input,
  Checkbox,
  Button,
  Link,
} from "@nextui-org/react";
import { useState } from "react";

import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({} as any);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      setTimeout(() => {
        console.log("username", username);
        setLoading(false);
      }, 2000);
    } catch (err: any) {
      setErrors(err.response.data);
    }
  };

  return (
    <div className="h-full flex justify-center items-center">
      <Card className="xl:w-1/3 lg:w-1/2 md:w-3/5 sm:w-4/5 w-full p-6">
        <CardHeader className="flex flex-col items-start">
          <h1 className="text-3xl mb-3 text-success font-bold">
            Welcome Back!
          </h1>
          <p className="text-default-500">Please login to your account.</p>
        </CardHeader>
        <CardBody className="gap-5 mt-5">
          <Input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            label="Username"
            variant="faded"
            type="text"
          />
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Password"
            variant="faded"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible(!isVisible)}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
          />
          <Checkbox
            color="success"
            isSelected={rememberMe}
            onValueChange={setRememberMe}
          >
            Remember Me
          </Checkbox>

          <div className="grid grid-cols-1 gap-4 mt-5">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              color="success"
              className="p-7 rounded-full text-lg"
            >
              Login
            </Button>
          </div>
          <div className="flex mt-5 strong justify-center text-lg">
            Don't have an account?
            <Link className="ms-2" color="success" href="/register">
              Register
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
