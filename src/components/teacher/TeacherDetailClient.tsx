'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { TeacherWithClasses } from '@/types/teacher';
import { ClassType } from '@/types/class';

export default function TeacherDetailClient({ teacher }: { teacher: TeacherWithClasses }) {
  const router = useRouter();

  const handleDelete = async () => {
    const confirmed = confirm('آیا از حذف معلم مطمئن هستید؟');
    if (!confirmed) return;

    const res = await fetch(`/api/teachers/${teacher.id}`, {
      method: 'DELETE',
    });

    if (res.ok) {
      toast.success('معلم حذف شد');
      router.push('/teachers');
    } else {
      toast.error('خطا در حذف معلم');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <Card>
        <CardContent className="space-y-2 p-6">
          <h2 className="text-xl font-bold">
            {teacher.firstName} {teacher.lastName}
          </h2>
          <p>یوزرنیم: {teacher.username}</p>

          <div className="mt-4 space-y-2">
            <h3 className="font-semibold">کلاس‌ها:</h3>
            {teacher.classes.length === 0 ? (
              <p className="text-sm text-muted-foreground">کلاسی ثبت نشده</p>
            ) : (
              <ul className="list-disc list-inside text-sm space-y-1">
                {teacher.classes.map((cls: ClassType) => (
                  <li key={cls.id}>
                    {cls.name} ({cls.schedule})
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="flex gap-2 mt-6">
            <Link href={`/admin/users/teachers/${teacher.id}/edit`}>
              <Button variant="secondary">ویرایش</Button>
            </Link>
            <Button variant="destructive" onClick={handleDelete}>حذف</Button>
            <Button variant="outline" onClick={() => router.push('/admin/users/teachers')}>بازگشت</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}