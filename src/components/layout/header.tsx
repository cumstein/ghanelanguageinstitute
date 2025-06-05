"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="bg-white shadow-md py-4 sticky top-0 z-50">
      <div className="container flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-emerald-600 pr-4">
          آموزشگاه قانع
        </Link>
        <Link href="/login" className="pl-4">
          <Button variant="outline">ورود</Button>
        </Link>
      </div>
    </header>
  );
}