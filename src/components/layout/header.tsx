"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Header() {
  const { data: session, status } = useSession();

  const isLoggedIn = !!session?.user;
  const role = session?.user?.role;

  const getDashboardLink = () => {
    switch (role) {
      case "ADMIN":
        return "/admin/dashboard";
      case "TEACHER":
        return "/teacher/dashboard";
      case "STUDENT":
        return "/student/dashboard";
      default:
        return "/";
    }
  };

  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-600 pr-4">
          آموزشگاه قانع
        </Link>

        <div className="flex items-center gap-4 min-w-[160px] justify-end">
          {status === "loading" ? (
            <div className="w-[160px] h-9 rounded bg-gray-100 animate-pulse" />
          ) : isLoggedIn && role ? (
            <>
              <Link href={getDashboardLink()}>
                <Button variant="outline">داشبورد</Button>
              </Link>
              <Button
                className="ml-2"
                variant="destructive"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                خروج
              </Button>
            </>
          ) : (
            <Link href="/login" className="ml-4">
              <Button variant="outline">ورود</Button>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}