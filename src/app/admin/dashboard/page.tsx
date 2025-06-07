import { getServerSession } from "next-auth";

import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
import AdminDashboardClient from "@/components/admin/admin-dashboard-client";

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user.role !== "ADMIN") {
    redirect("/"); 
  }

  return <AdminDashboardClient />;
}