import { useTranslations } from "next-intl";
import PageHeader from "@/components/ui/PageHeader";

export default function AboutPage() {
  const t = useTranslations("about_page");

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container mx-auto px-6 max-w-3xl py-12">
        <div className="prose prose-lg max-w-none">
          <div className="skeleton w-full h-64 rounded-xl mb-8" />
          <p className="text-base-content/70 leading-relaxed">
            {t("text1")}
          </p>
          <p className="text-base-content/70 leading-relaxed">
            {t("text2")}
          </p>
        </div>
      </div>
    </main>
  );
}
