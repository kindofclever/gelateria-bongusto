import { useTranslations } from "next-intl";
import PageHeader from "@/components/ui/PageHeader";

const cardColors = ["bg-primary/10", "bg-accent/10"];

export default function LocationsPage() {
  const t = useTranslations("locations_page");

  const locations = [
    { name: "Abtwil", address: "Sanitätspark\nSt. Gallen", phone: "+41 71 000 00 00" },
    { name: "Rorschach", address: "Rorschach\nBodensee", phone: "+41 71 000 00 01" },
  ];

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {locations.map((loc, i) => (
            <div key={loc.name} className={`card ${cardColors[i]} border border-base-300`}>
              <div className="card-body">
                <div className="skeleton w-full h-48 rounded-lg mb-4" />
                <h2 className="card-title text-2xl font-[family-name:var(--font-fredoka)]">{loc.name}</h2>
                <p className="text-base-content/70 whitespace-pre-line">{loc.address}</p>
                <p className="text-base-content/70">{loc.phone}</p>
                <div className="mt-4">
                  <h3 className="font-semibold mb-2">{t("opening_hours")}</h3>
                  <p className="text-base-content/60 text-sm">Mo–Fr: 11:00–19:00<br />Sa: 10:00–18:00<br />So: 12:00–17:00</p>
                </div>
                <div className="card-actions mt-4">
                  <a
                    href={`https://maps.google.com/?q=${encodeURIComponent(loc.name + " " + loc.address.replace("\n", " "))}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-primary btn-outline btn-sm"
                  >
                    {t("get_directions")}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
