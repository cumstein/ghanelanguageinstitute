'use client';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const res = await signIn('credentials', {
      username: e.currentTarget.username.value,
      password: e.currentTarget.password.value,
      redirect: false,
    });

    if (res?.ok) {
      const sessionRes = await fetch('/api/auth/session');
      const session = await sessionRes.json();

      if (session?.user?.mustChangePassword) {
        router.push('/change-password');
      } else {
        router.push('/dashboard');
      }
    } else {
      alert('اطلاعات ورود نادرست است.');
    }

    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-6 rounded-xl shadow">
      <h1 className="text-xl font-bold mb-4 text-center">ورود به سیستم</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input name="username" placeholder="نام کاربری" required className="w-full border p-2 rounded" />
        <input name="password" type="password" placeholder="رمز عبور" required className="w-full border p-2 rounded" />
        <button disabled={loading} className="bg-blue-600 text-white w-full p-2 rounded">
          {loading ? 'در حال ورود...' : 'ورود'}
        </button>
      </form>
    </div>
  );
}