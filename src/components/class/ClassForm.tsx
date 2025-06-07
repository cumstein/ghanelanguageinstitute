"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import JalaliDatePicker from "./DatePicker";

const classSchema = z.object({
  name: z.string().min(2, "نام کلاس الزامی است"),
  schedule: z.string().min(2, "زمان کلاس الزامی است"),
  startDate: z.date({ required_error: "تاریخ شروع الزامی است" }),
  endDate: z.date({ required_error: "تاریخ پایان الزامی است" }),
  teacherId: z.string().min(1, "انتخاب معلم الزامی است"),
});

type ClassFormInput = z.infer<typeof classSchema>;

type Props = {
  mode?: "create" | "edit";
  initialData?: Partial<ClassFormInput> & { id?: string };
};

export default function ClassForm({ mode = "create", initialData }: Props) {
  const router = useRouter();
  const [teachers, setTeachers] = useState<
    { id: string; firstName: string; lastName: string }[]
  >([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<ClassFormInput>({
    resolver: zodResolver(classSchema),
    defaultValues: {
      name: initialData?.name || "",
      schedule: initialData?.schedule || "",
      startDate: initialData?.startDate
        ? new Date(initialData.startDate)
        : undefined,
      endDate: initialData?.endDate ? new Date(initialData.endDate) : undefined,
      teacherId: initialData?.teacherId || "",
    },
  });

  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await fetch("/api/teachers");
      const data = await res.json();
      setTeachers(data);
    };
    fetchTeachers();
  }, []);

  const onSubmit = async (data: ClassFormInput) => {
    const payload = {
      ...data,
      startDate: data.startDate.toISOString(),
      endDate: data.endDate.toISOString(),
    };

    const res = await fetch(
      mode === "edit" ? `/api/classes/${initialData?.id}` : "/api/classes",
      {
        method: mode === "edit" ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );

    if (res.ok) {
      router.push("/admin/classes");
    } else {
      alert(
        mode === "edit"
          ? "ویرایش کلاس با خطا مواجه شد"
          : "ایجاد کلاس با خطا مواجه شد"
      );
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div>
        <Label>نام کلاس</Label>
        <Input {...register("name")} />
        {errors.name && (
          <p className="text-sm text-red-500">{errors.name.message}</p>
        )}
      </div>

      <div>
        <Label>برنامه زمانی کلاس</Label>
        <Input
          placeholder="مثلاً: شنبه و دوشنبه ساعت ۶ تا ۸"
          {...register("schedule")}
        />
        {errors.schedule && (
          <p className="text-sm text-red-500">{errors.schedule.message}</p>
        )}
      </div>

      <div>
        <Label>تاریخ شروع</Label>
        <JalaliDatePicker
          value={watch("startDate")}
          onChange={(date) => date && setValue("startDate", date.toDate())}
        />
      </div>

      <div>
        <Label>تاریخ پایان</Label>

        <JalaliDatePicker
          value={watch("endDate")}
          onChange={(date) => date && setValue("endDate", date  .toDate())}
        />
      </div>

      <div>
        <Label>انتخاب معلم</Label>
        <select
          {...register("teacherId")}
          className="w-full border rounded p-2"
          onChange={(e) => setValue("teacherId", e.target.value)}
        >
          <option value="">-- انتخاب معلم --</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.firstName} {t.lastName}
            </option>
          ))}
        </select>
        {errors.teacherId && (
          <p className="text-sm text-red-500">{errors.teacherId.message}</p>
        )}
      </div>

      <Button type="submit">
        {mode === "edit" ? "ویرایش کلاس" : "ایجاد کلاس"}
      </Button>
    </motion.form>
  );
}
