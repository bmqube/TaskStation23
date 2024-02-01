import { PrismaClient } from "@prisma/client";
import { validateEmail } from "@/helpers/utils";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export const GET = async (req: any, res: any) => {
  try {
    const authToken = cookies().get("auth-token")?.value;

    if (!authToken) {
      return new Response(
        JSON.stringify({
          message: "Please login to access this page",
        }),
        {
          status: 401,
        }
      );
    }

    const decoded: any = jwt.verify(authToken, "VGFza1N0YXRpb24yMw==");

    if (!decoded) {
      return new Response(
        JSON.stringify({
          message: "Invalid token",
        }),
        {
          status: 401,
        }
      );
    }

    const prisma = new PrismaClient();

    const user = await prisma.user.findFirst({
      where: {
        username: decoded.username,
      },
      select: {
        tasks: true,
      },
    });

    return new Response(
      JSON.stringify({
        message: "Your data has been fetched",
        // data: tasks,
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch data", {
      status: 500,
    });
  }
};

export const POST = async (req: any, res: any) => {
  try {
    const authToken = cookies().get("auth-token")?.value;

    if (!authToken) {
      return new Response(
        JSON.stringify({
          message: "Please login to access this page",
        }),
        {
          status: 401,
        }
      );
    }

    const decoded: any = jwt.verify(authToken, "VGFza1N0YXRpb24yMw==");

    if (!decoded) {
      return new Response(
        JSON.stringify({
          message: "Invalid token",
        }),
        {
          status: 401,
        }
      );
    }

    const prisma = new PrismaClient();

    const tasks = await prisma.user.findFirst({
      where: {
        username: decoded.username,
      },
      select: {
        tasks: true,
      },
    });

    const prisma = new PrismaClient();
    const existingUser = await prisma.user.findFirst({
      where: {
        username,
      },
    });

    if (existingUser) {
      return new Response(
        JSON.stringify({
          message: "Username already exists",
        }),
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        message: "Your account has been created",
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to insert data", {
      status: 500,
    });
  }
};
