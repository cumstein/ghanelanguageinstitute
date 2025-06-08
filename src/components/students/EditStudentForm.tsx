'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Student } from '@/types/student';

export default function EditStudentForm({ initialData }: { initialData: Student }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [student, setStudent] = useState({
    firstName: initialData.firstName || '',
    lastName: initialData.lastName || '',
    fatherName: initialData.fatherName || '',
    username: initialData.user?.username || '',
  });
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/students/${initialData.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...student,
        ...(password ? { password } : {}),
      }),
    });

    if (res.ok) {
      toast.success('اطلاعات با موفقیت ذخیره شد');
      router.push("/admin/users/students");
    } else {
      toast.error('خطا در ذخیره اطلاعات');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">ویرایش اطلاعات دانش‌آموز</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>نام</Label>
          <Input
            value={student.firstName}
            onChange={(e) => setStudent({ ...student, firstName: e.target.value })}
          />
        </div>
        <div>
          <Label>نام خانوادگی</Label>
          <Input
            value={student.lastName}
            onChange={(e) => setStudent({ ...student, lastName: e.target.value })}
          />
        </div>
        <div>
          <Label>نام پدر</Label>
          <Input
            value={student.fatherName}
            onChange={(e) => setStudent({ ...student, fatherName: e.target.value })}
          />
        </div>
        <div>
          <Label>یوزرنیم</Label>
          <Input
            value={student.username}
            onChange={(e) => setStudent({ ...student, username: e.target.value })}
          />
        </div>
        <div>
          <Label>رمز جدید (اختیاری)</Label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <Button type="submit" disabled={loading}>
          {loading ? 'در حال ذخیره...' : 'ذخیره تغییرات'}
        </Button>
      </form>
    </div>
  );
}