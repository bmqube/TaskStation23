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
    });

    let tasks;

    if (user.role === "USER") {
      tasks = await prisma.task.findMany({
        where: {
          userId: user.id,
        },
        select: {
          id: true,
          title: true,
          description: true,
          status: true,
        },
      });
    } else {
      tasks = await prisma.task.findMany();
    }

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        message: "Your data has been fetched",
        data: tasks,
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
    const { title, description, status } = await req.json();

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
    });

    const newTask = await prisma.task.create({
      data: {
        title,
        description,
        status,
        userId: user.id,
      },
    });

    await prisma.$disconnect();

    return new Response(
      JSON.stringify({
        message: "Your task has been added",
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
