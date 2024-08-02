/**
 * @author Heera Singh
 * @date 15-07-2024
 * @desc API route for /api/users/1
 */

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.$connect();
    let id = Number(params.id);

    if (!id) {
      return NextResponse.json({ error: "id not found" }, { status: 404 });
    }

    let employee = await prisma.employee.findUnique({
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        lastActive: true,
        email: true,
      },
    });

    console.log("id > ", id);
    console.log("employee> ", employee);

    return NextResponse.json({ employee });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  } finally {
    prisma.$disconnect();
  }
};
