import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await prisma.$connect();

  let user = JSON.parse(cookies().get("user")?.value || "");

  let taskBoards = await prisma.taskBoard.findMany({
    where: { id: params.id },
  });

  return NextResponse.json({ taskBoards });
};

export { GET };
