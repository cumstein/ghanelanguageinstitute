"use client"

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  UserPlus,
  Users,
  LayoutGrid,
  School,
  GraduationCap
} from "lucide-react";
import { motion } from "framer-motion";

const cards = [
  {
    title: "ایجاد کاربر",
    icon: <UserPlus className="w-8 h-8" />,
    href: "/users/new",
  },
  {
    title: "ایجاد کلاس",
    icon: <School className="w-8 h-8" />,
    href: "/classes/new",
  },
  {
    title: "دانش آموزان",
    icon: <Users className="w-8 h-8" />,
    href: "/users/students",
  },
  {
    title: "کلاس ها",
    icon: <LayoutGrid className="w-8 h-8" />,
    href: "/classes",
  },
  {
    title: "معلمان",
    icon: <GraduationCap className="w-8 h-8" />,
    href: "/users/teachers",
  },
];

export default function AdminDashboard() {
  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cards.map((card, index) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
        >
          <Card className="p-6 shadow-lg hover:shadow-2xl transition-all duration-300 rounded-2xl">
            <CardContent className="flex flex-col items-center gap-4 text-center">
              <div className="text-primary">{card.icon}</div>
              <h3 className="text-lg font-semibold">{card.title}</h3>
              <Button asChild className="mt-2 w-full">
                <Link href={card.href}>برو</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
