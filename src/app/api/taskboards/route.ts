import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const POST = async (req: NextRequest) => {
  await prisma.$connect();

  let { name, projectId } = await req.json();
  if (!name || !projectId) {
    return NextResponse.json(
      { error: "Task board details are missing" },
      { status: 404 }
    );
  }

  let user = JSON.parse(cookies().get("user")?.value || "");

  let taskBoard = await prisma.taskBoard.create({
    data: { name, projectId, creatorId: user.id },
  });
  return NextResponse.json({ msg: "Taskboard create successfyll", taskBoard });
  prisma.$disconnect();
};

const GET = async () => {
  await prisma.$connect();
  let user = JSON.parse(cookies().get("user")?.value || "");

  let taskBoards = await prisma.taskBoard.findMany({
    where: {
      creatorId: user.id,
    },
  });
  return NextResponse.json({ taskBoards });
};

export { GET, POST };
