import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcryptjs';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return new Response('Unauthorized', { status: 401 });
  }

  const { newPassword } = await req.json();

  const hashed = await hash(newPassword, 10);

  await prisma.user.update({
    where: { id: session.user.id },
    data: {
      password: hashed,
      mustChangePassword: false,
    },
  });

  return new Response('Password updated');
}