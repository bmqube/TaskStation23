import { PrismaClient } from "@prisma/client";
import { validateEmail } from "@/helpers/utils";
import bcrypt from "bcrypt";

export const POST = async (req: any, res: any) => {
  try {
    const { username, email, password } = await req.json();

    if (!username || !email || !password) {
      return new Response(
        JSON.stringify({
          message: "Please fill all fields",
        }),
        {
          status: 400,
        }
      );
    }

    if (!validateEmail(email)) {
      return new Response(
        JSON.stringify({
          message: "Please enter a valid email address",
        }),
        {
          status: 400,
        }
      );
    }

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
