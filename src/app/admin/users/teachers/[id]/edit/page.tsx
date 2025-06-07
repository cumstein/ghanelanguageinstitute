import EditTeacherForm from "@/components/teacher/TeacherEditForm";
import { notFound } from "next/navigation";

export default async function TeacherDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/teachers/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) notFound();

  const data = await res.json();

  return <EditTeacherForm initialData={data} />;
}
