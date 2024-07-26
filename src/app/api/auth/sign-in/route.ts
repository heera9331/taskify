"use server";
// import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let { email, password }: { email: string; password: string } =
      await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Fields are missing" },
        { status: 400 }
      );
    }

    console.log(email);
    console.log(password);

    let employee = await prisma.employee.findUnique({ where: { email } });

    if (!employee) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    let isPasswordValid = password === employee.password;

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    // Remove password before signing the JWT
    const { password: _, ...employeeWithoutPassword } = employee;

    const token = jwt.sign({ user: employeeWithoutPassword }, "secret", {
      expiresIn: "1h",
      algorithm: "HS256",
    });

    if (!token) {
      return NextResponse.json(
        { error: "Token generation error" },
        { status: 401 }
      );
    }

    cookies().set("token", token);
    cookies().set("user", JSON.stringify(employeeWithoutPassword));

    return NextResponse.json(
      { user: employeeWithoutPassword },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Database connection error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { POST };
