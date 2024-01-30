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
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

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
            Welcome to TaskStation23
          </h1>
          <p className="text-default-500">
            Create an account to start managing your tasks
          </p>
        </CardHeader>
        <CardBody className="gap-5 mt-5">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            label="Email"
            variant="faded"
            type="email"
          />
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
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            label="Confirm Password"
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
            isSelected={termsAndConditions}
            onValueChange={setTermsAndConditions}
          >
            I agree to the Terms and Conditions
          </Checkbox>

          <div className="grid grid-cols-1 gap-4 mt-5">
            <Button
              disabled={loading}
              onClick={handleSubmit}
              color="success"
              className="p-7 rounded-full text-lg"
            >
              Register
            </Button>
          </div>
          <div className="flex mt-5 strong justify-center text-lg">
            Already have an account?
            <Link className="ms-2" color="success" href="/login">
              Login
            </Link>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}
