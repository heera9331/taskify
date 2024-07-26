import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const secret = process.env.JWT_SECRET || "";

const GET = async (req: NextResponse) => {
  await prisma.$connect();
  const user = JSON.parse(cookies().get("user")?.value || "");
  console.log("user is => ", user);


  let projects = await prisma.project.findMany({where: {
    organizationId: user.organizationId
  }});

  return NextResponse.json({ projects });
};
