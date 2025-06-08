"use client"

import { useEffect, useState } from 'react';

type ClassItem = {
  id: string;
  name: string;
  teacher: {
    firstName: string;
    lastName: string;
  };
};
type User = {
  firstName: string,
  lastName: string,
  role: string,
  fatherName?: string,
  classId?: string
}

export default function CreateUserPage() {
  const [role, setRole] = useState('STUDENT');
  const [loading, setLoading] = useState(false);
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [selectedClassId, setSelectedClassId] = useState<string>('');
  const [generatedCredentials, setGeneratedCredentials] = useState<{ username: string; password: string } | null>(null);

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await fetch('/api/classes');
        const data = await res.json();
        setClasses(data);
      } catch (err) {
        console.error('خطا در گرفتن کلاس‌ها:', err);
      }
    };

    if (role === 'STUDENT') {
      fetchClasses();
    }
  }, [role]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;

    const data: User = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      role,
    };

    if (role === 'STUDENT') {
      data.fatherName = form.fatherName?.value;
      data.classId = form.classId?.value;
    }

    const res = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify(data),
    });

    if (res.ok) {
      const { username, password } = await res.json();
      setGeneratedCredentials({ username, password });
      form.reset();
      setSelectedClassId('');
    } else {
      alert('خطا در ساخت کاربر');
    }

    setLoading(false);
  };

  const selectedClass = classes.find((cls) => cls.id === selectedClassId);

  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-xl shadow-lg mt-8">
      <h1 className="text-xl font-bold mb-4">ساخت کاربر جدید</h1>

      {generatedCredentials ? (
        <div className="space-y-4">
          <div className="bg-green-100 p-4 rounded shadow">
            <p><strong>نام کاربری:</strong> {generatedCredentials.username}</p>
            <p><strong>رمز عبور:</strong> {generatedCredentials.password}</p>
            <p className="text-sm text-gray-600">این اطلاعات را ذخیره کنید. قابل مشاهده مجدد نیستند.</p>
          </div>
          <button
            onClick={() => setGeneratedCredentials(null)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            ساخت کاربر جدید
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block">نقش</label>
            <select value={role} onChange={(e) => setRole(e.target.value)} className="border p-2 rounded w-full">
              <option value="STUDENT">دانش‌آموز</option>
              <option value="TEACHER">معلم</option>
            </select>
          </div>

          <div>
            <label className="block">نام</label>
            <input name="firstName" required className="border p-2 rounded w-full" />
          </div>

          <div>
            <label className="block">نام خانوادگی</label>
            <input name="lastName" required className="border p-2 rounded w-full" />
          </div>

          {role === 'STUDENT' && (
            <>
              <div>
                <label className="block">نام پدر</label>
                <input name="fatherName" required className="border p-2 rounded w-full" />
              </div>

              <div>
                <label className="block">کلاس</label>
                <select
                  name="classId"
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  required
                  className="border p-2 rounded w-full"
                >
                  <option value="">انتخاب کلاس</option>
                  {classes.map((cls) => (
                    <option key={cls.id} value={cls.id}>
                      {cls.name} - معلم: {cls.teacher.firstName} {cls.teacher.lastName}
                    </option>
                  ))}
                </select>
              </div>

              {selectedClass && (
                <div className="text-sm text-gray-600">
                  <p>معلم این کلاس: <strong>{selectedClass.teacher.firstName} {selectedClass.teacher.lastName}</strong></p>
                </div>
              )}
            </>
          )}

          <button disabled={loading} type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            {loading ? 'در حال ساخت...' : 'ساخت کاربر'}
          </button>
        </form>
      )}
    </div>
  );
}