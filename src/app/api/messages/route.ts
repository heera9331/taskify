import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

const GET = async () => {
  await prisma.$connect();
  let messages = await prisma.message.findMany({});
  return NextResponse.json({ messages });
};

const POST = async () => {
  await prisma.$connect();
  await prisma.$disconnect();
};

export { GET, POST };
