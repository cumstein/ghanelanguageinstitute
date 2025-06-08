import EditStudentForm from '@/components/students/EditStudentForm';
import { Student } from '@/types/student';

export default async function EditStudentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/students/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('دانش‌آموز پیدا نشد');
  }

  const student: Student = await res.json();

  return <EditStudentForm initialData={student} />;
}