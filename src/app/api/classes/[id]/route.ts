import { NextResponse, NextRequest } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";

const classUpdateSchema = z.object({
  name: z.string().min(2, "نام کلاس الزامی است"),
  schedule: z.string().min(2, "برنامه کلاس الزامی است"),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "تاریخ شروع نامعتبر است"),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), "تاریخ پایان نامعتبر است"),
  teacherId: z.string().min(1, "شناسه معلم الزامی است"),
});

export async function PATCH(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing class ID", { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = classUpdateSchema.parse(body);

    const updated = await prisma.class.update({
      where: { id },
      data: {
        name: parsed.name,
        schedule: parsed.schedule,
        startDate: new Date(parsed.startDate),
        endDate: new Date(parsed.endDate),
        teacherId: parsed.teacherId,
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { message: "Invalid data", errors: error.errors },
        { status: 400 }
      );
    }

    console.error("[PATCH CLASS]", error);
    return NextResponse.json({ message: "مشکلی پیش آمد" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing class ID", { status: 400 });
  }
  try {
    const classItem = await prisma.class.findUnique({
      where: { id },
      include: {
        teacher: true,
        students: true,
      },
    });

    if (!classItem) {
      return NextResponse.json({ error: "کلاس پیدا نشد" }, { status: 404 });
    }

    return NextResponse.json(classItem);
  } catch (error) {
    console.error("[CLASS_GET]", error);
    return NextResponse.json(
      { error: "خطا در دریافت اطلاعات کلاس" },
      { status: 500 }
    );
  }
}


export async function DELETE(request: NextRequest) {
  const url = new URL(request.url);
  const id = url.pathname.split("/").pop();
  if (!id) {
    return new NextResponse("Missing class ID", { status: 400 });
  }
  try {
    const classId = id;

    // قطع ارتباط دانش‌آموزها با کلاس
    await prisma.student.updateMany({
      where: { classId },
      data: { classId: null },
    });

    // قطع ارتباط معلم با کلاس
    await prisma.class.update({
      where: { id: classId },
      data: { teacherId: null },
    });

    // حذف کلاس
    await prisma.class.delete({
      where: { id: classId },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "حذف کلاس با خطا مواجه شد." },
      { status: 500 }
    );
  }
}