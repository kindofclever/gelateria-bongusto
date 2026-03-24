import { useTranslations } from "next-intl";
import PageHeader from "@/components/ui/PageHeader";

export default function ContactPage() {
  const t = useTranslations("contact_page");

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container mx-auto px-6 max-w-4xl py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form className="space-y-5">
            <div>
              <label className="label font-medium">{t("name")}</label>
              <input type="text" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label font-medium">{t("email")}</label>
              <input type="email" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label font-medium">{t("subject")}</label>
              <input type="text" className="input input-bordered w-full" required />
            </div>
            <div>
              <label className="label font-medium">{t("message")}</label>
              <textarea className="textarea textarea-bordered w-full" rows={5} required />
            </div>
            <button type="submit" className="btn btn-accent">{t("send")}</button>
          </form>
          <div className="space-y-8">
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <h3 className="card-title font-[family-name:var(--font-fredoka)] text-accent">Abtwil</h3>
                <p className="text-base-content/70">Sanitätspark, St. Gallen</p>
              </div>
            </div>
            <div className="card bg-base-200 border border-base-300">
              <div className="card-body">
                <h3 className="card-title font-[family-name:var(--font-fredoka)] text-accent">Rorschach</h3>
                <p className="text-base-content/70">Rorschach, Bodensee</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
