// pages/api/organizations.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type Organization = {
  name: string;
};

type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect(); // Ensure Prisma client is connected

    // const { organization, user }: { organization: Organization; user: User } =
    //   await req.json();

    // // Create organization and user in the database
    // const createdOrganization = await prisma.organization.create({
    //   data: {
    //     name: organization.name,
    //   },
    // });

    // const createdUser = await prisma.user.create({
    //   data: {
    //     firstName: user.firstName,
    //     lastName: user.lastName,
    //     email: user.email,
    //     password: user.password,
    //   },
    // });

    // Return success response with created organization and user
    // return NextResponse.json({
    //   organization: createdOrganization,
    //   user: createdUser,
    // });

    let organization = "Madquick";
    let newOrg = await prisma.organization.create({
      data: { name: organization },
    });

    return NextResponse.json({ msg: "Created", organization: newOrg });
  } catch (error) {
    console.error("Error creating organization or user:", error);
    return NextResponse.json(
      { error: "Failed to create organization or user" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    let organizations = await prisma.organization.findMany({});
    return NextResponse.json({ organizations });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch organizations or users" },
      { status: 500 }
    );
  }
};
