import ClassForm from '@/components/class/ClassForm'; 
import { notFound } from 'next/navigation';

export default async function EditClassPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/classes/${id}`, {
    cache: 'no-store',
  });

  if (!res.ok) return notFound();

  const classData = await res.json();

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">ویرایش کلاس</h1>
      <ClassForm mode="edit" initialData={classData} />
    </div>
  );
}