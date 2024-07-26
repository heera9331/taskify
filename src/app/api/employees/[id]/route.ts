/**
 * @author Heera Singh
 * @date 15-07-2024
 * @desc API route for /api/users/1
 */

import { NextRequest, NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  await prisma.$connect();

  let employee = await prisma.employee.findFirst({
    where: { email: params.id },
  });

  return NextResponse.json({ employee });

  prisma.$disconnect();
};
