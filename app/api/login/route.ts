import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const POST = async (req: NextRequest, res: NextResponse) => {
  try {
    const { username, password } = await req.json();

    if (!username || !password) {
      return new Response(
        JSON.stringify({
          message: "Please fill all fields",
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

    if (!existingUser) {
      return new Response(
        JSON.stringify({
          message: "Invalid Username",
        }),
        {
          status: 400,
        }
      );
    }

    const validPassword = await bcrypt.compare(password, existingUser.password);

    if (!validPassword) {
      return new Response(
        JSON.stringify({
          message: "Invalid Password",
        }),
        {
          status: 400,
        }
      );
    }

    await prisma.$disconnect();

    // Generate token
    let token = jwt.sign(
      { username: existingUser.username },
      "VGFza1N0YXRpb24yMw==",
      {
        expiresIn: "30d", // expires in 1 month
      }
    );

    cookies().set({
      name: "auth-token",
      value: token,
      expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // expires in 1 month
    });

    // console.log("Token set as cookie", token);

    return new Response(
      JSON.stringify({
        message: "Login Successful",
      }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response("Failed to insert data", {
      status: 500,
    });
  }
};
