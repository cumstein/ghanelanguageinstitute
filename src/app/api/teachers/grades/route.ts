import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { classId, grades } = await req.json();

  try {
    for (const grade of grades) {
      await prisma.enrollment.upsert({
        where: {
          studentId: grade.studentId,
        },
        update: {
          participation: grade.participation,
          midterm: grade.midterm,
          final: grade.final,
          total: grade.total
            
        },
        create: {
          studentId: grade.studentId,
          classId,
          participation: grade.participation,
          midterm: grade.midterm,
          final: grade.final,
          total: grade.total
        },
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: "خطا در ثبت" }, { status: 500 });
  }
}