import { NextRequest, NextResponse } from "next/server";
import { MessageType } from "@/lib/prism-types";
import { prisma } from "@/lib/prisma";

interface IdType {
  id: string;
}

interface Params {
  params: IdType;
}

const GET = async (req: NextRequest, { params }: Params) => {
  try {
    await prisma.$connect();
    const id = Number(params.id);

    if (!id) {
      return NextResponse.json({ error: "Id is not find" }, { status: 404 });
    }

    let messages = await prisma.message.findMany({
      where: {
        OR: [{ senderId: id }, { receiverId: id }],
      },
    });

    return NextResponse.json({ msg: "here are the messages", messages });
  } catch (error) {
    console.log("error while fetching messages > ", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  } finally {
    prisma.$disconnect();
  }
};

const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let message = await req.json();
  } catch (error) {
    console.log("error while fetching messages > ", error);
    return NextResponse.json(
      { error: "internal server error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

export { GET };
