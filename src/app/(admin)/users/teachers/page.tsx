'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { TeacherWithClasses } from '@/types/teacher';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<TeacherWithClasses[]>([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await fetch('/api/teachers');
      const data = await res.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = confirm('آیا مطمئنی می‌خواهی این معلم را حذف کنی؟');
    if (!confirmed) return;

    try {
      const res = await fetch(`/api/teachers/${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        toast.success('معلم با موفقیت حذف شد');
        setTeachers((prev) => prev.filter((t) => t.id !== id));
      } else {
        toast.error('خطا در حذف معلم');
      }
    } catch (error) {
      toast.error('مشکلی در ارتباط با سرور پیش آمد');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">لیست معلم‌ها</h1>
        <Link href="new">
          <Button>افزودن معلم جدید</Button>
        </Link>
      </div>

      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="p-4 shadow">
            <CardContent className="space-y-2">
              <h2 className="text-lg font-semibold">
                {teacher.firstName} {teacher.lastName}
              </h2>
              <div className="flex flex-wrap gap-2 mt-4">
                <Link href={`/users/teachers/${teacher.id}`}>
                  <Button variant="outline">مشاهده</Button>
                </Link>
                <Link href={`/users/teachers/${teacher.id}/edit`}>
                  <Button variant="secondary">ویرایش</Button>
                </Link>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(teacher.id)}
                >
                  حذف
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}