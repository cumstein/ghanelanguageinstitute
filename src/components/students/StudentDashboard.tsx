'use client';

import { FiUser, FiBookOpen, FiCheckCircle } from "react-icons/fi";
import { motion } from "framer-motion";
import { Prisma } from "@prisma/client";
type StudentWithDetails = Prisma.StudentGetPayload<{
  include: {
    user: true;
    class: { include: { teacher: true } };
    enrollment: true;
  };
}>;

export default function StudentDashboardClient({ student }: { student: StudentWithDetails }) {
  const studentClass = student.class;
  const enrollment = student.enrollment;

  return (
    <motion.div
      className="max-w-3xl mx-auto p-6 space-y-6"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <h1 className="text-3xl font-black text-indigo-700 mb-2 flex justify-center items-center gap-2">
          <FiUser className="text-2xl" />
          خوش آمدید، {student.firstName} {student.lastName}
        </h1>
        <p className="text-gray-600">
          <FiBookOpen className="inline-block me-1" /> کلاس:{" "}
          <span className="font-semibold">{studentClass?.name}</span> <br />
          <FiUser className="inline-block me-1" /> مدرس:{" "}
          <span className="font-semibold">
            {studentClass?.teacher?.firstName} {studentClass?.teacher?.lastName}
          </span>
        </p>
      </motion.div>

      <motion.div
        className="bg-gradient-to-tr from-indigo-100 to-white shadow-lg rounded-xl p-6"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          <FiCheckCircle className="text-green-500" /> نمرات شما
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          <GradeItem label="فعالیت کلاسی" value={enrollment?.participation} />
          <GradeItem label="میان‌ترم" value={enrollment?.midterm} />
          <GradeItem label="پایان‌ترم" value={enrollment?.final} />
          <GradeItem label="نمره نهایی" value={enrollment?.total} highlight />
        </div>
      </motion.div>
    </motion.div>
  );
}

function GradeItem({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | null | undefined;
  highlight?: boolean;
}) {
  return (
    <motion.div
      className={`text-center p-4 rounded-lg shadow-md ${
        highlight ? "bg-yellow-100" : "bg-white"
      }`}
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <div className="text-sm text-gray-500 mb-1">{label}</div>
      <div
        className={`text-xl font-bold ${
          highlight ? "text-yellow-700" : "text-indigo-700"
        }`}
      >
        {value !== null && value !== undefined ? value : "—"}
      </div>
    </motion.div>
  );
}