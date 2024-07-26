/**
 * @author Heera Singh
 * @date 15-07-2024
 * @desc API route for users
 */

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextResponse) => {
  await prisma.$connect();
  let employees = await prisma.employee.findMany({});
  return NextResponse.json({ employees });
};

export const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let user = await req.json();

    let { firstName, lastName, email, roleId, organizationId, password } = user;

    if (!firstName || !lastName || !email || !roleId || !organizationId) {
      return NextResponse.json(
        { error: "Required fields are missing" },
        { status: 404 }
      );
    }

    let newUser = await prisma.employee.create({
      data: {
        firstName,
        lastName,
        email,
        roleId,
        organizationId,
        password,
      },
    });

    let tmpEmp = await prisma.employee.findFirst({ where: { email } });
    if (tmpEmp) {
      return NextResponse.json(
        { error: "Employee already exists" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { msg: "User created", user: newUser },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { msg: "Error while posting user", error },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
};
