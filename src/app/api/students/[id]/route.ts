import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { hash } from 'bcryptjs';

export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing STUDENT ID", { status: 400 });
  }
  try {
    await prisma.student.delete({
      where: {
        id: id,
      },
    });

    return new NextResponse("حذف شد", { status: 200 });
  } catch (error) {
    console.error(error);
    return new NextResponse("خطا در حذف", { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();

  if (!id) {
    return new NextResponse("Missing student ID", { status: 400 });
  }

  try {
    const body = await request.json();
    const { firstName, lastName, fatherName, username, password } = body;

    const student = await prisma.student.findUnique({
      where: { id: id },
      include: { user: true },
    });

    if (!student) {
      return NextResponse.json({ error: "Student not found" }, { status: 404 });
    }

    await prisma.student.update({
      where: { id: id },
      data: { firstName, lastName, fatherName },
    });

    await prisma.user.update({
      where: { id: student.userId },
      data: {
        username,
        ...(password && {
          password: await hash(password, 10),
          mustChangePassword: false,
        }),
      },
    });

    return NextResponse.json({ message: "Student updated successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 500 }
    );
  }
}
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing STUDENT ID", { status: 400 });
  }
 try {
  const student = await prisma.student.findUnique({
    where: { id },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      fatherName: true,
      user: {
        select: {
          username: true,
        },
      },
    },
  });

    if (!student) {
      return new Response(JSON.stringify({ error: 'دانش‌آموز پیدا نشد' }), { status: 404 });
    }

    return new Response(JSON.stringify(student));
  } catch (error) {
    console.log(error)
    return new Response(JSON.stringify({ error: 'خطا در دریافت اطلاعات' }), { status: 500 });
  }
}
