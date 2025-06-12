import { Card, CardContent } from "@/components/ui/card";
import Head from "next/head";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Head>
        <title>موسسه زبان قانع | آموزش زبان در شهریار</title>
        <meta
          name="description"
          content="آموزش زبان انگلیسی برای کودکان، نوجوانان و بزرگسالان توسط اساتید حرفه‌ای در موسسه زبان‌های خارجی قانع در شهریار."
        />
        <meta
          name="keywords"
          content="آموزش زبان شهریار, موسسه زبان قانع, زبان انگلیسی کودکان, آیلتس, آموزشگاه زبان شهریار"
        />
        <meta
          property="og:title"
          content="موسسه زبان قانع | آموزش تخصصی زبان در شهریار"
        />
        <meta
          property="og:description"
          content="بهترین دوره‌های آموزش زبان انگلیسی برای تمامی سنین در شهریار"
        />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="fa_IR" />
      </Head>
      <main className="min-h-screen bg-gradient-to-tr from-purple-100 via-white to-purple-200 p-4 flex items-center justify-center">
        <Card className="w-full max-w-4xl shadow-2xl border-0 rounded-2xl bg-white/80 backdrop-blur-md">
          <CardContent className="p-6 md:p-10 space-y-10 text-gray-800">
            <header className="text-center space-y-3">
              <div className="flex justify-center">
          <Image
            src="/logo.png" 
            alt="Ghane Language Institute Logo"
            width={100}
            height={100}
            className="rounded-full shadow-md"
            style={{height:"auto"}}
          />
        </div>
              <h1 className="text-3xl md:text-5xl font-extrabold text-purple-800">
                Ghane Language Institute
              </h1>
              <p className="text-gray-600 text-base md:text-lg">
                موسسه زبان‌های خارجی قانع
              </p>
              <p className="text-lg leading-relaxed max-w-xl mx-auto">
                به وب‌سایت رسمی موسسه زبان‌های خارجی قانع خوش آمدید. ما در اینجا
                بهترین دوره‌های زبان را برای شما فراهم می‌کنیم.
              </p>
            </header>

            <section className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Info label="تلفن" value="021-65271021 - 021-65274349" />
              <Info label="ایمیل" value="maryamghane@gmail.com" />
              <Info
                label="آدرس"
                value="تهران، شهریار، خیابان انقلاب، ساختمان شباهنگ، طبقه سوم"
              />
              <Info
                label="ساعات کاری"
                value="شنبه تا چهارشنبه: ۸:۳۰ تا ۱۴ و ۱۵ تا ۲۰ | پنج‌شنبه‌ها: ۹ تا ۱۴"
              />
            </section>

            <section className="bg-purple-50 p-5 rounded-2xl shadow-inner">
              <h2 className="text-2xl font-bold text-purple-700 text-center mb-4">
                مدیر و موسس
              </h2>
              <ul className="text-gray-700 leading-relaxed space-y-2 list-disc list-inside text-right">
                <li>مریم قانع، دارای کارشناسی ارشد آموزش زبان انگلیسی</li>
                <li>دارای دیپلم مدیریت کلاسی از دانشگاه کمبریج انگلستان</li>
                <li>مدرس در جهاد دانشگاهی دانشگاه تهران</li>
                <li>
                  دبیر رسمی در دبیرستان استعدادهای درخشان (تیزهوشان) و مدارس
                  نمونه دولتی
                </li>
                <li>سرگروه زبان انگلیسی در اداره آموزش و پرورش شهریار</li>
              </ul>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold text-center text-purple-700">
                دوره‌های آموزشی ما
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <CategoryBox
                  title="بزرگسالان"
                  description="دوره‌های تخصصی مکالمه، آیلتس و زبان تجاری برای بزرگسالان با اساتید حرفه‌ای"
                />
                <CategoryBox
                  title="نوجوانان"
                  description="دوره‌های جذاب و کاربردی برای نوجوانان با تمرکز بر مکالمه و سرگرمی"
                />
                <CategoryBox
                  title="کودکان"
                  description="آموزش زبان از طریق بازی، موسیقی و داستان برای کودکان ۴ تا ۹ سال"
                />
              </div>
            </section>

            <footer className="text-center font-bold text-purple-600 pt-6">
              ما منتظر دیدار شما هستیم!
            </footer>
          </CardContent>
        </Card>
      </main>
    </>
  );
}

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col bg-purple-100 p-4 rounded-xl shadow-sm">
      <span className="text-purple-800 font-semibold">{label}</span>
      <span className="text-gray-700">{value}</span>
    </div>
  );
}
function CategoryBox({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <article className="bg-white border border-purple-200 p-5 rounded-2xl shadow-md text-center">
      <h3 className="text-xl font-bold text-purple-700 mb-2">{title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </article>
  );
}
