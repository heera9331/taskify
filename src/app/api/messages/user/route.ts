// /api/messages/user
import { NextRequest, NextResponse } from "next/server";
import { EmployeeType } from "@/lib/prism-types";
import { prisma } from "@/lib/prisma";

const GET = async (req: NextRequest) => {
  await prisma.$connect();

  const user = JSON.parse(req.cookies.get("user")?.value || "{}");

  let employees = await prisma.message.findMany({
    where: {
      senderId: user.id,
    },
  });

  return NextResponse.json({ employees });
};

export { GET };
