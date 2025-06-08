
import StudentsTable from "@/components/students/StudentsTable";
import { prisma } from "@/lib/prisma";

export default async function StudentsPage() {
  const students = await prisma.student.findMany({
    include: { class: { select: { name: true,id: true } } },
    orderBy: { lastName: "asc" },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">لیست دانش‌آموزان</h1>
      <StudentsTable initialStudents={students} />
    </div>
  );
}