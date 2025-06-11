import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth-options";
import { prisma } from "@/lib/prisma";
import StudentDashboardClient from "@/components/students/StudentDashboard";


export default async function StudentDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "STUDENT") {
    return <div className="text-center text-red-500 mt-10">دسترسی غیرمجاز</div>;
  }

  const student = await prisma.student.findUnique({
    where: { userId: session.user.id },
    include: {
      user: true,
      class: { include: { teacher: true } },
      enrollment: true,
    },
  });

  if (!student || !student.enrollment) {
    return (
      <div className="text-center mt-10 text-gray-600">
        هنوز در هیچ کلاسی ثبت‌نام نکرده‌اید یا نمراتی ثبت نشده است.
      </div>
    );
  }

  return <StudentDashboardClient student={student} />;
}