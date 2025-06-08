import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const students = await prisma.student.findMany({
    include: { class: { select: { name: true,id:true } } },
    orderBy: { lastName: "asc" },
  });

  return NextResponse.json(students);
}