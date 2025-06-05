'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

export default function EditTeacherForm({ initialData }: { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [teacher, setTeacher] = useState({
    firstName: initialData.firstName,
    lastName: initialData.lastName,
    username: initialData.username,
  });
  const [password, setPassword] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch(`/api/teachers/${initialData.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...teacher,
        ...(password ? { password } : {}),
      }),
    });

    if (res.ok) {
      toast.success('اطلاعات با موفقیت ذخیره شد');
      router.push(`/users/teachers/${initialData.id}`);
    } else {
      toast.error('خطا در ذخیره اطلاعات');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">ویرایش اطلاعات معلم</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>نام</Label>
          <Input
            value={teacher.firstName}
            onChange={(e) => setTeacher({ ...teacher, firstName: e.target.value })}
          />
        </div>
        <div>
          <Label>نام خانوادگی</Label>
          <Input
            value={teacher.lastName}
            onChange={(e) => setTeacher({ ...teacher, lastName: e.target.value })}
          />
        </div>
        <div>
          <Label>یوزرنیم</Label>
          <Input
            value={teacher.username}
            onChange={(e) => setTeacher({ ...teacher, username: e.target.value })}
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