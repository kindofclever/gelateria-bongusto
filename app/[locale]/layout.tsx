import type { Metadata } from "next";
import { Fredoka, Nunito } from "next/font/google";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale, getMessages } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import NavSpacer from "@/components/layout/NavSpacer";
import SocialFab from "@/components/ui/SocialFab";
import JsonLd from "@/components/seo/JsonLd";

const fredoka = Fredoka({
  subsets: ["latin"],
  variable: "--font-fredoka",
  display: "swap",
});

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Bongusto — Gelateria",
    template: "%s | Bongusto",
  },
  description:
    "Handgemachtes italienisches Gelato mit Leidenschaft. Besuche uns in Abtwil oder Rorschach.",
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      data-theme="bongusto"
      className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content">
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          <Header />
          <NavSpacer />
          <div className="flex-1">{children}</div>
          <Footer />
          <SocialFab />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
