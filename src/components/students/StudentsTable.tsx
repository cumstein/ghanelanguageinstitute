"use client";

import { useState, ChangeEvent } from "react";
import { Student } from "@/types/types";
import { Button } from "@/components/ui/button";

interface Props {
  initialStudents: Student[];
}

export default function StudentsTable({ initialStudents }: Props) {
  const [query, setQuery] = useState("");
  const [students, setStudents] = useState(initialStudents);

  const filtered = students.filter((s) =>
    s.lastName.toLowerCase().includes(query.toLowerCase())
  );

  const handleDelete = async (id: string) => {
    if (!confirm("آیا مطمئن هستید؟")) return;
    const res = await fetch(`/api/students/${id}`, { method: "DELETE" });
    if (res.ok) setStudents((prev) => prev.filter((s) => s.id !== id));
    else alert("خطا در حذف");
  };

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="جستجو بر اساس نام خانوادگی..."
        value={query}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setQuery(e.target.value)}
        className="w-full border px-4 py-2 rounded"
      />

      <div className="overflow-x-auto">
        <table className="w-full text-right text-sm border rounded">
          <thead className="bg-gray-100 font-semibold">
            <tr>
              <th className="px-4 py-2">نام</th>
              <th className="px-4 py-2">نام خانوادگی</th>
              <th className="px-4 py-2">نام پدر</th>
              <th className="px-4 py-2">کلاس</th>
              <th className="px-4 py-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((s, idx) => (
              <tr
                key={s.id}
                className={`${idx % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-gray-100`}
              >
                <td className="px-4 py-2">{s.firstName}</td>
                <td className="px-4 py-2">{s.lastName}</td>
                <td className="px-4 py-2">{s.fatherName}</td>
                <td className="px-4 py-2">{s.class?.name || "-"}</td>
                <td className="px-4 py-2 space-x-2">
                  <Button
                    size="sm"
                    onClick={() => window.location.assign(`/admin/users/students/${s.id}/edit`)}
                  >
                    ویرایش
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(s.id)}
                  >
                    حذف
                  </Button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-4">
                  موردی یافت نشد.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}