import ClassForm from "@/components/class/ClassForm";


export default function NewClassPage() {
  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">ایجاد کلاس جدید</h1>
      <ClassForm />
    </div>
  );
}