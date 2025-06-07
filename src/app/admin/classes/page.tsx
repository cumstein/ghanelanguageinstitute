"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ClassWithTeacher } from "@/types/class";
import { formatJalali } from "@/lib/utils";

export default function ClassesPage() {
  const [classes, setClasses] = useState<ClassWithTeacher[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch("/api/classes");
        if (!res.ok) throw new Error("مشکلی در دریافت اطلاعات پیش آمد.");
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("خطای ناشناخته");
        }
      } finally {
        setLoading(false);
      }
    };
    fetchClasses();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">لیست کلاس‌ها</h1>
        <Link href="/admin/classes/new">
          <Button>ایجاد کلاس جدید</Button>
        </Link>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <p className="text-center text-destructive">{error}</p>
      ) : classes.length === 0 ? (
        <p className="text-center text-muted-foreground">
          هیچ کلاسی ثبت نشده است.
        </p>
      ) : (
        <ul className="space-y-4">
          {classes.map((cls) => (
            <li
              key={cls.id}
              className="bg-white p-4 sm:p-6 rounded-2xl shadow-md border space-y-3"
            >
              <div className="space-y-1">
                <h2 className="text-xl font-semibold text-primary">
                  {cls.name}
                </h2>
                <p>برنامه: {cls.schedule}</p>
                <p>
                  معلم: {cls.teacher?.firstName} {cls.teacher?.lastName}
                </p>
                <p>از تاریخ: {formatJalali(new Date(cls.startDate))}</p>
                <p>تا تاریخ: {formatJalali(new Date(cls.endDate))}</p>
              </div>

              <div className="flex flex-col sm:flex-row gap-2 pt-2">
                <Link href={`/admin/classes/${cls.id}`}>
                  <Button variant="secondary" className="w-full sm:w-auto">
                    مشاهده کلاس
                  </Button>
                </Link>
                <Link href={`/admin/classes/${cls.id}/edit`}>
                  <Button className="w-full sm:w-auto">ویرایش</Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
