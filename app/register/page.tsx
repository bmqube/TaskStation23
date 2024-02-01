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
import Cookies from "js-cookie";
import { EyeSlashFilledIcon, EyeFilledIcon } from "@/components/icons";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState("");
  const [success, setSuccess] = useState("");

  const myCookie = Cookies.get("auth-token");

  if (myCookie) {
    window.location.href = "/";
  }

  function validatePassword(password: string): boolean {
    const re =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!username || !password || !confirmPassword || !email) {
      setErrors("Please fill in all fields");
      return;
    }

    if (!termsAndConditions) {
      setErrors("You must agree to the terms and conditions");
      return;
    }

    if (!validatePassword(password)) {
      setErrors(
        "Password must be at least 8 characters long, contain at least one uppercase letter, one lowercase letter, one number, and one special character"
      );
      return;
    }

    if (password !== confirmPassword) {
      setErrors("Passwords do not match");
      return;
    }

    try {
      const data = {
        username,
        password,
        email,
      };

      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const resData = await res.json();
      if (res.ok) {
        setSuccess(resData.message);
      } else {
        setErrors(resData.message);
      }
    } catch (err: any) {
      console.log(err);
      setErrors("Something went wrong, please try again");
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
        <CardBody className="gap-5 mt-5" onClick={() => setErrors("")}>
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
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            label="Confirm Password"
            variant="faded"
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={() => setIsVisible2(!isVisible2)}
              >
                {isVisible2 ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible2 ? "text" : "password"}
          />
          <Checkbox
            color="success"
            isSelected={termsAndConditions}
            onValueChange={setTermsAndConditions}
          >
            I agree to the Terms and Conditions
          </Checkbox>

          {errors && (
            <div
              className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Error:</strong>
              <span className="block sm:inline ms-2">{errors}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setErrors("")}
              >
                <svg
                  className="fill-current h-6 w-6 text-red-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          {success && (
            <div
              className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative"
              role="alert"
            >
              <strong className="font-bold">Success:</strong>
              <span className="block sm:inline ms-2">{success}</span>
              <span
                className="absolute top-0 bottom-0 right-0 px-4 py-3"
                onClick={() => setSuccess("")}
              >
                <svg
                  className="fill-current h-6 w-6 text-green-500"
                  role="button"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                >
                  <title>Close</title>
                  <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                </svg>
              </span>
            </div>
          )}

          <div className="grid grid-cols-1 gap-4 mt-5">
            <Button
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
