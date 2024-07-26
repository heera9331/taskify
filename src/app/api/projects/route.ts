import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";

const secret = process.env.JWT_SECRET || "";

const GET = async (req: NextResponse) => {
  await prisma.$connect();
  const user = JSON.parse(cookies().get("user")?.value || "");
  console.log("user is => ", user);
  let projects = await prisma.project.findMany();

  return NextResponse.json({ projects });
};

const POST = async (req: NextRequest) => {
  try {
    await prisma.$connect();
    const projectDetails = await req.json();
    console.log(projectDetails);
    const token = cookies().get("token")?.value || "";
    const user = JSON.parse(cookies().get("user")?.value || "");

    if (!user || !token) {
      return NextResponse.json({ msg: "unauthorized" }, { status: 401 });
    }

    if (!projectDetails) {
      return NextResponse.json(
        { msg: "project details are missing" },
        { status: 404 }
      );
    }

    let tmpProject = await prisma.project.findFirst({
      where: {
        name: projectDetails.projectTitle,
      },
    });

    if (tmpProject) {
      return NextResponse.json(
        { error: "project already exits" },
        { status: 500 }
      );
    }

    let project = await prisma.project.create({
      data: {
        name: projectDetails.projectTitle,
        description: projectDetails.projectDescription,
        organizationId: user.organizationId,
        creatorId: user.id,
      },
    });

    if (!project) {
      console.log("Project creation error");
      return NextResponse.json(
        { error: "Error while creating project " },
        { status: 500 }
      );
    }

    return NextResponse.json({ project, msg: "project successfully created" });
  } catch (error) {
    console.log("error while create project", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export { POST, GET };
