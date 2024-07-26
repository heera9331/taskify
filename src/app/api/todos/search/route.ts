import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const GET = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let todos = await prisma.todo.findMany();
    return NextResponse.json({ todos });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { GET };
