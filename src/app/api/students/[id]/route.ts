import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

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