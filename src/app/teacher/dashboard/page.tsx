import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth-options";
import Link from "next/link";
import { ArrowRight, School } from "lucide-react";

const themes = [
  { iconColor: "text-blue-500", bgColor: "bg-blue-50" },
  { iconColor: "text-green-500", bgColor: "bg-green-50" },
  { iconColor: "text-purple-500", bgColor: "bg-purple-50" },
  { iconColor: "text-yellow-500", bgColor: "bg-yellow-50" },
  { iconColor: "text-pink-500", bgColor: "bg-pink-50" },
  { iconColor: "text-red-500", bgColor: "bg-red-50" },
];

export default async function TeacherDashboard() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "TEACHER") {
    return redirect("/");
  }

  const teacher = await prisma.teacher.findUnique({
    where: { userId: session.user.id },
    include: { classes: true },
  });

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">کلاس‌های من</h1>

      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {teacher?.classes.map((cls, index) => {
          const theme = themes[index % themes.length];
          return (
            <li
              key={cls.id}
              className={`aspect-square rounded-2xl shadow-md border p-6 flex flex-col justify-between items-center text-center ${theme.bgColor}`}
            >
              <School size={64} className={theme.iconColor} />

              <div>
                <h2 className="text-lg font-semibold mt-4">{cls.name}</h2>
                <p className="text-sm text-muted-foreground">{cls.schedule}</p>
              </div>

              <Link
                href={`/teacher/dashboard/class/${cls.id}`}
                className="mt-4 flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition"
              >
                ورود به کلاس
                <ArrowRight size={18} />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}