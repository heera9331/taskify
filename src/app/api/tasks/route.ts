import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

const POST = async (req: NextRequest) => {
  await prisma.$connect();
  const task = await req.json();
  const user = JSON.parse(cookies().get("user")?.value || "");

  return NextResponse.json({ msg: "working" });
};

const GET = async () => {};
