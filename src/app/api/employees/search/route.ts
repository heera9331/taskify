import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  await prisma.$connect();

  // Get query parameters
  const { searchParams } = new URL(req.url);
  const orgId = searchParams.get("orgId") || 0;
  const order = searchParams.get("order") || "asc";
  const limit = parseInt(searchParams.get("limit") || "50", 10);

  // todo
  /**
   * order and last active will implemented
   */
  try {
    // Fetch employees based on query parameters
    const employees = await prisma.employee.findMany({
      where: {
        organizationId: orgId !== 0 ? Number(orgId) : undefined,
      },
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json({ users: employees });
  } catch (error) {
    console.error("Error fetching employees:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
