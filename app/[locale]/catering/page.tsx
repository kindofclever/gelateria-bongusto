import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import PageHeader from "@/components/ui/PageHeader";

export default function CateringPage() {
  const t = useTranslations("catering_page");

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container mx-auto px-6 max-w-3xl py-12">
        <div className="skeleton w-full h-64 rounded-xl mb-8" />
        <p className="text-lg text-base-content/70 leading-relaxed mb-10">{t("text")}</p>
        <Link href="/kontakt" className="btn btn-primary">{t("cta")}</Link>
      </div>
    </main>
  );
}
