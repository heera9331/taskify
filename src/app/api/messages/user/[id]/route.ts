// /api/messages/user/2
import { NextRequest, NextResponse } from "next/server";
import { EmployeeType } from "@/lib/prism-types";
import { prisma } from "@/lib/prisma";

const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  try {
    await prisma.$connect();
    const user = JSON.parse(req.cookies.get("user")?.value || "{}");
    const senderId = Number(params.userId);
    const receiverId = user.id;

    let messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: 1 }, { receiverId }],
      },
    });

    return NextResponse.json({ messages });
  } catch (error) {
    console.log("/api/message/user/id => error > ", error);
    return NextResponse.json({ error: "internal server error" });
  }
};

const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    await prisma.$connect();
    const { content } = await req.json();
    const mediaUrl = null;
    console.log(req.cookies);
    const user: EmployeeType = JSON.parse(req.cookies.get("user")?.value || "");
    const senderId = user.id;
    const receiverId = parseInt(params.id);

    console.log("got request /api/message/user/[id]");

    let msgRes = await prisma.message.create({
      data: {
        senderId,
        receiverId,
        content,
        mediaUrl,
      },
    });

    console.log(msgRes);

    if (!msgRes) {
      return NextResponse.json(
        { error: "internal server error" },
        { status: 500 }
      );
    }

    return NextResponse.json({ msg: "msg sent", msgRes }, { status: 201 });
  } catch (error) {
    console.log(
      "POST /api/messages/user/id => error while saving message > ",
      error
    );
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { GET, POST };
