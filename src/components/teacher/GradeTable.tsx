"use client";
import { useState } from "react";
import { toast } from "sonner";

interface Student {
  id: string;
  firstName: string;
  lastName: string;
  enrollment?: {
    participation: number | null;
    midterm: number | null;
    final: number | null;
    total: number | null
  };
}

interface GradeInput {
  studentId: string;
  firstName: string;
  lastName: string;
  participation: number | "";
  midterm: number | "";
  final: number | "";
  total: number | "";
}

interface GradeTableProps {
  students: Student[];
  classId: string;
}

export default function GradeTable({ students, classId }: GradeTableProps) {
  const [grades, setGrades] = useState<GradeInput[]>(() =>
    students.map((s) => ({
      studentId: s.id,
      firstName: s.firstName,
      lastName: s.lastName,
      participation: s.enrollment?.participation ?? "",
      midterm: s.enrollment?.midterm ?? "",
      final: s.enrollment?.final ?? "",
      total: s.enrollment?.total ?? "",
    }))
  );

  const handleChange = (
    index: number,
    field: "participation" | "midterm" | "final" | "total",
    value: number | ""
  ) => {
    const updated = [...grades];
    updated[index][field] = value;
    setGrades(updated);
  };

  const handleSubmit = async () => {
  try {
    const cleanedGrades = grades.map((g) => ({
      studentId: g.studentId,
      participation: g.participation === "" ? null : g.participation,
      midterm: g.midterm === "" ? null : g.midterm,
      final: g.final === "" ? null : g.final,
      total: g.total === "" ? null : g.total,
    }));

    const res = await fetch("/api/teachers/grades", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ classId, grades: cleanedGrades }),
    });

    if (!res.ok) throw new Error("خطا در ثبت نمرات");
    toast.success("نمرات با موفقیت ذخیره شدند");
  } catch (err) {
    console.log(err);
    toast.error("خطا در ثبت نمرات");
  }
};

  return (
    <div className="overflow-x-auto">
      <table className="w-full border text-center">
        <thead>
          <tr className="bg-gray-100">
            <th>نام</th>
            <th>نام خانوادگی</th>
            <th>فعالیت کلاسی</th>
            <th>میان‌ترم</th>
            <th>پایان‌ترم</th>
            <th>کل</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((s, i) => (
            <tr key={s.studentId} className="border-t">
              <td>{s.firstName}</td>
              <td>{s.lastName}</td>
              <td>
                <input
                  type="number"
                  value={s.participation}
                  onChange={(e) =>
                    handleChange(i, "participation", parseFloatOrEmpty(e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={s.midterm}
                  onChange={(e) =>
                    handleChange(i, "midterm", parseFloatOrEmpty(e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={s.final}
                  onChange={(e) =>
                    handleChange(i, "final", parseFloatOrEmpty(e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
              <td>
                <input
                  type="number"
                  value={s.total}
                  onChange={(e) =>
                    handleChange(i, "total", parseFloatOrEmpty(e.target.value))
                  }
                  className="w-16 p-1 border rounded"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={handleSubmit}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        ثبت نمرات
      </button>
    </div>
  );
}

// کمک برای تبدیل رشته ورودی به عدد یا "" (برای پاک شدن فیلد)
function parseFloatOrEmpty(value: string): number | "" {
  const parsed = parseFloat(value);
  return isNaN(parsed) ? "" : parsed;
}