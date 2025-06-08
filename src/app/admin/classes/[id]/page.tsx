import { prisma } from "@/lib/prisma";
import StudentsList from "@/components/class/StudentsList";
import { ClassWithLiteStudents } from "@/types/types";
import { notFound } from "next/navigation";

export default async function ClassDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const classData = await prisma.class.findUnique({
    where: { id },
    include: {
      teacher: true,
      students: true,
    },
  });

  if (!classData) return notFound();

  const classInfo: ClassWithLiteStudents = {
    id: classData.id,
    name: classData.name,
    teacher: {
      id: classData?.teacher?.id as string,
      firstName: classData?.teacher?.firstName as string,
      lastName: classData?.teacher?.lastName as string,
    },
    students: classData.students.map((s) => ({
      id: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      fatherName: s.fatherName,
    })),
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">کلاس: {classInfo.name}</h1>
      <p className="text-gray-700 mb-6">معلم: {classInfo.teacher.firstName} {classInfo.teacher.lastName}</p>

      <StudentsList classId={classInfo.id} students={classInfo.students} />
    </div>
  );
}