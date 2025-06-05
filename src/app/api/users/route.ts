import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { nanoid } from 'nanoid';

export async function POST(req: Request) {
  const body = await req.json();
  const { firstName, lastName, fatherName, age, role } = body;

  const username = `user_${nanoid(6)}`;
  const passwordRaw = nanoid(6);
  const password = await bcrypt.hash(passwordRaw, 10);

  const user = await prisma.user.create({
    data: {
      username,
      password,
      role,
      ...(role === 'STUDENT'
        ? {
            student: {
              create: {
                firstName,
                lastName,
                fatherName,
                age,
              },
            },
          }
        : {
            teacher: {
              create: {
                firstName,
                lastName,
              },
            },
          }),
    },
  });


  return NextResponse.json({user, username, password: passwordRaw });
}