import { format } from 'date-fns-jalali';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ClassDetail } from '@/types/class';


export default async function ClassDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const data: ClassDetail = await res.json();

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow space-y-6">
      <h1 className="text-3xl font-bold text-center">{data.name}</h1>

      <div>
        <h2 className="font-semibold text-muted-foreground">برنامه زمانی:</h2>
        <p>{data.schedule}</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="font-semibold text-muted-foreground">تاریخ شروع:</h2>
          <p>{format(new Date(data.startDate), 'yyyy/MM/dd')}</p>
        </div>

        <div>
          <h2 className="font-semibold text-muted-foreground">تاریخ پایان:</h2>
          <p>{format(new Date(data.endDate), 'yyyy/MM/dd')}</p>
        </div>
      </div>

      <div>
        <h2 className="font-semibold text-muted-foreground">مدرس:</h2>
        <p>{data.teacher.firstName} {data.teacher.lastName}</p>
      </div>

      <div className="flex justify-between pt-4">
        <Link href={`/classes/${data.id}/edit`}>
          <Button variant="default">ویرایش کلاس</Button>
        </Link>

        <Link href="/classes">
          <Button variant="secondary">بازگشت به لیست کلاس‌ها</Button>
        </Link>
      </div>
    </div>
  );
}