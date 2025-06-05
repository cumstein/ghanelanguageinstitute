'use client';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function ChangePasswordPage() {
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const router = useRouter();

  useEffect(() => {
  console.log(session);
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await fetch('/api/change-password', {
      method: 'POST',
      body: JSON.stringify({ newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (res.ok) {
      router.push('/dashboard');
    } else {
      alert('خطا در تغییر رمز. لطفا دوباره امتحان کنید.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4 text-center">تغییر رمز عبور</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="password"
          placeholder="رمز جدید"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" disabled={loading} className="bg-green-600 text-white w-full p-2 rounded">
          {loading ? 'در حال تغییر رمز...' : 'ثبت رمز جدید'}
        </button>
      </form>
    </div>
  );
}