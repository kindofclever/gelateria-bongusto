import { useTranslations } from "next-intl";
import PageHeader from "@/components/ui/PageHeader";

export default function GalleryPage() {
  const t = useTranslations("gallery_page");

  const placeholderImages = Array.from({ length: 9 }, (_, i) => i + 1);

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {placeholderImages.map((i) => (
            <div
              key={i}
              className="skeleton aspect-square rounded-xl hover:shadow-lg transition-shadow"
            />
          ))}
        </div>
      </div>
    </main>
  );
}
