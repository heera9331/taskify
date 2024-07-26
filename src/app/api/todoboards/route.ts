import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { TodoBoardType } from "@/lib/prism-types";
import { cookies } from "next/headers";

const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let todoBoard: TodoBoardType = await req.json();
    console.log(todoBoard);
    if (!todoBoard) {
      return NextResponse.json(
        { error: "todo or todo details are missing" },
        { status: 500 }
      );
    }
    const user = JSON.parse(cookies().get("user")?.value || "");
    const date = new Date();
    const newBoard = await prisma.todoBoard.create({
      data: {
        name: todoBoard.name,
        creatorId: user.id,
        projectId: todoBoard.projectId,
      },
    });

    if (!newBoard) {
      return NextResponse.json(
        { error: "Error while creating todo" },
        { status: 500 }
      );
    }
    console.log("todo => ", newBoard);

    return NextResponse.json({ msg: "Successfully created", todoBoard });
  } catch (error) {
    console.log("error while creating todo => ", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

const GET = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let todoBoards = await prisma.todoBoard.findMany();

    return NextResponse.json({ msg: "get working", todoBoards });
  } catch (error) {
    console.log("error => ", error);

    return NextResponse.json({ error: "Internal server" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

export { GET, POST };
