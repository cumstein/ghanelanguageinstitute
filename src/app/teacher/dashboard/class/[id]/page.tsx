
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import GradeTable from "@/components/teacher/GradeTable";
import { Student } from "@/types/student";

export default async function TeacherClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const classData = await prisma.class.findUnique({
    where: { id: id },
    include: {
      students: {
        include: {
          user: true,
          enrollment: true,
        },
      },
    },
  });

  if (!classData) return notFound();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">کلاس: {classData.name}</h1>
      <p className="text-sm mb-6 text-muted-foreground">
        برنامه: {classData.schedule} | از {new Date(classData.startDate).toLocaleDateString()} تا {new Date(classData.endDate).toLocaleDateString()}
      </p>

      <GradeTable students={classData.students as Student[]} classId={id} />
    </div>
  );
}