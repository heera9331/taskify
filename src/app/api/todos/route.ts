import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

import { TodoType } from "@/lib/prism-types";
import { cookies } from "next/headers";

const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let todo: TodoType = await req.json();
    console.log(todo);
    if (!todo) {
      return NextResponse.json(
        { error: "todo or todo details are missing" },
        { status: 500 }
      );
    }
    const user = JSON.parse(cookies().get("user")?.value || "");
    const date = new Date();
    const newTodo = await prisma.todo.create({
      data: {
        title: todo.title,
        description: todo.description,
        dueDate: date.toISOString(),
        todoBoardId: 1,
        employeeId: user.id,
      },
    });

    if (!newTodo) {
      return NextResponse.json(
        { error: "Error while creating todo" },
        { status: 500 }
      );
    }

    console.log("todo => ", todo);
    return NextResponse.json({ msg: "Successfully created", todo });
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
    let todos = await prisma.todo.findMany();

    return NextResponse.json({ msg: "get working", todos });
  } catch (error) {
    console.log("error => ", error);
  } finally {
    await prisma.$disconnect();
  }
};

export { GET, POST };
