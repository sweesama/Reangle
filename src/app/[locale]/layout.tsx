import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import "../globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Reangle - AI Multi-Angle Image Generator | Mzu",
  description: "Transform your images from any angle with AI. Professional multi-angle photo generation for e-commerce, design, and content creation.",
  keywords: ["AI image generator", "multi-angle photos", "product photography", "image editing", "Mzu"],
  authors: [{ name: "Mzu" }],
  openGraph: {
    title: "Reangle - AI Multi-Angle Image Generator",
    description: "Transform your images from any angle with AI",
    type: "website",
  },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Next.js 15 需要 await params
  const { locale } = await params;
  
  // 验证语言
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // 获取翻译消息
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className={inter.className}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
