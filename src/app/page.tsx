import { Card, CardContent } from "@/components/ui/card";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-sky-100 via-white to-emerald-100 p-6 flex items-center justify-center">
      <Card className="max-w-2xl w-full shadow-xl border-0 rounded-2xl bg-white/90 backdrop-blur-md">
        <CardContent className="p-8 space-y-4 text-gray-800">
          <h1 className="text-3xl md:text-4xl font-bold text-center text-emerald-700">
            آموزشگاه قانع
          </h1>
          <p className="text-center text-lg">
            به وب‌سایت رسمی آموزشگاه زبان قانع خوش آمدید. ما در اینجا بهترین
            دوره‌های زبان را برای شما فراهم کرده‌ایم.
          </p>
          <p className="text-center text-sm">
            برای اطلاعات بیشتر و ثبت‌نام در دوره‌ها، لطفاً با ما تماس بگیرید.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 text-sm">
            <Info label="تلفن" value="۰۲۱-۱۲۳۴۵۶۷۸" />
            <Info label="ایمیل" value="info@ghaneinstitute.com" />
            <Info label="آدرس" value="تهران، خیابان انقلاب، پلاک ۱۲۳" />
            <Info label="ساعات کاری" value="شنبه تا چهارشنبه، ۹ صبح تا ۵ عصر" />
          </div>
          <p className="text-center font-semibold text-emerald-600 pt-6">
            ما منتظر دیدار شما هستیم!
          </p>
        </CardContent>
      </Card>
    </main>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-emerald-50 p-3 rounded-xl shadow-sm">
      <span className="text-emerald-700 font-medium">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}