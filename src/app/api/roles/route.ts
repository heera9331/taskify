import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

const GET = async (req: NextRequest) => {
  await prisma.$connect();
  let roles = await prisma.role.findMany({});
  return NextResponse.json(roles);
};

const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let { role } = await req.json();
    if (!role) {
      return NextResponse.json({ error: "role is not found" }, { status: 404 });
    }

    let newRole = await prisma.role.create({
      data: {
        name: role,
      },
    });

    return NextResponse.json({
      msg: "role create successfully",
      role: newRole,
    });
  } catch (error) {
    console.log("error is => ", error);
    return NextResponse.json({ error, msg: "internal server error" });
  }
};

export { GET, POST };
