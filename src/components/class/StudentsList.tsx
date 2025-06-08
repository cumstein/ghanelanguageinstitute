"use client";

import { useState } from "react";
import { StudentLite } from "@/types/types";

type Props = {
  classId: string;
  students: StudentLite[]
};

export default function StudentsList({ students }: Props) {
  const [studentList, setStudentList] = useState(students);
  const [loading, setLoading] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    setLoading(id);
    const res = await fetch(`/api/students/${id}`, {
      method: "DELETE",
    });

    if (res.ok) {
      setStudentList((prev) => prev.filter((s) => s.id !== id));
    }

    setLoading(null);
  };

  if (studentList.length === 0) {
    return <p className="text-gray-600">دانش‌آموزی ثبت نشده است.</p>;
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
      <table className="min-w-full text-sm text-right text-gray-800">
        <thead className="bg-gray-100 text-gray-700 text-sm font-semibold">
          <tr>
            <th className="px-4 py-3 whitespace-nowrap w-1/4">نام</th>
            <th className="px-4 py-3 whitespace-nowrap w-1/4">نام خانوادگی</th>
            <th className="px-4 py-3 whitespace-nowrap w-1/4">نام پدر</th>
            <th className="px-4 py-3 text-center w-1/4">عملیات</th>
          </tr>
        </thead>
        <tbody>
          {studentList.map((student, index) => (
            <tr
              key={student.id}
              className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"} border-t`}
            >
              <td className="px-4 py-3">{student.firstName}</td>
              <td className="px-4 py-3">{student.lastName}</td>
              <td className="px-4 py-3">{student.fatherName}</td>
              <td className="px-4 py-3 text-center">
                <button
                  onClick={() => handleDelete(student.id)}
                  disabled={loading === student.id}
                  className="text-red-600 hover:underline disabled:opacity-50 transition"
                >
                  {loading === student.id ? "در حال حذف..." : "حذف"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}