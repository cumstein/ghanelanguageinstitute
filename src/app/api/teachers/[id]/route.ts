import { prisma } from "@/lib/prisma";
import { NextResponse, NextRequest } from "next/server";
import { hash } from "bcryptjs";

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing TEACHER ID", { status: 400 });
  }
  try {
    const teacher = await prisma.teacher.findUnique({
      where: {
        id: id,
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        classes: {
          select: {
            id: true,
            name: true,
            schedule: true,
            startDate: true,
            endDate: true,
          },
        },
      },
    });

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: teacher.id,
      firstName: teacher.firstName,
      lastName: teacher.lastName,
      username: teacher.user.username,
      userId: teacher.userId,
      classes: teacher.classes,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing class ID", { status: 400 });
  }
  try {
    const body = await request.json();
    const { firstName, lastName, username, password } = body;

    const teacher = await prisma.teacher.findUnique({
      where: { id: id },
      include: { user: true },
    });

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    await prisma.teacher.update({
      where: { id: id },
      data: { firstName, lastName },
    });

    await prisma.user.update({
      where: { id: teacher.userId },
      data: {
        username,
        ...(password && {
          password: await hash(password, 10),
          mustChangePassword: false,
        }),
      },
    });

    return NextResponse.json({ message: "Teacher updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing TEACHER ID", { status: 400 });
  }
  try {
    const teacher = await prisma.teacher.findUnique({
      where: { id: id },
    });

    if (!teacher) {
      return NextResponse.json({ error: "Teacher not found" }, { status: 404 });
    }

    await prisma.teacher.delete({
      where: { id: id },
    });

    await prisma.user.delete({
      where: { id: teacher.userId },
    });

    return NextResponse.json({
      message: "Teacher and related user deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
