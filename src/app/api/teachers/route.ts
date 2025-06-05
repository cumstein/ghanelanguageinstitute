import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    return NextResponse.json(teachers);
  } catch (error) {
    console.error('[TEACHERS_GET_ERROR]', error);
    return NextResponse.json({ error: 'خطا در دریافت معلم‌ها' }, { status: 500 });
  }
}