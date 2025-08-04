import "./globals.css";
import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";
import { SessionProviderWrapper } from "@/components/providers/SessionProviderWrapper";
import { Toaster } from "sonner";

export const metadata = {
  title: "موسسه زبان های خارجی قانع",
  description: "سایت رسمی موسسه زبان های خارجی قانع",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
        <meta
          name="google-site-verification"
          content="W1y_vByg7henNnWwnwccPsomFe2BiJ-niADi9k343O4"
        />
        <meta
          name="description"
          content="آموزش زبان انگلیسی در شهریار با اساتید حرفه‌ای در زبان های خارجی قانع. ثبت‌ نام ترم جدید آغاز شد!"
        />
        <meta name="robots" content="index, follow" />
      </head>
      <body className={"bg-muted min-h-screen flex flex-col"}>
        <SessionProviderWrapper>
          <Header />
          <main className="flex-1 container py-6">
            {children}
            <Toaster richColors />
          </main>
          <Footer />
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
