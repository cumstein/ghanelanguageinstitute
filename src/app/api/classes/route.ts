import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import type { CreateClassInput } from '@/types/class';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, schedule, startDate, endDate, teacherId } = body as CreateClassInput;

    if (!name || !schedule || !startDate || !endDate || !teacherId) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      );
    }

    const newClass = await prisma.class.create({
      data: {
        name,
        schedule,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
        teacher: {
          connect: { id: teacherId },
        },
      },
    });

    return NextResponse.json({
      message: 'Class created successfully',
      class: newClass,
    });
  } catch (error) {
    console.error('[CLASS_POST_ERROR]', error);
    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const classes = await prisma.class.findMany({
      include: {
        teacher: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        startDate: 'desc',
      },
    });

    return NextResponse.json(classes);
  } catch (error) {
    console.error('[CLASS_GET_ERROR]', error);
    return NextResponse.json(
      { error: 'Failed to fetch classes.' },
      { status: 500 }
    );
  }
}