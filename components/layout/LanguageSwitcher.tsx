"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";

const languageLabels: Record<string, string> = {
  de: "Deutsch",
  it: "Italiano",
  en: "English",
  fr: "Français",
};

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function handleChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  const t = useTranslations("configurator");

  return (
    <div className="dropdown dropdown-end tooltip tooltip-bottom" data-tip={t("choose_language")}>
      <div
        tabIndex={0}
        role="button"
        className="btn btn-sm btn-circle font-bold text-sm border-0"
        style={{ backgroundColor: "oklch(82% 0.11 162)", color: "#0e1111" }}
      >
        {locale.toUpperCase()}
      </div>
      <ul
        tabIndex={0}
        className="dropdown-content menu rounded-box z-50 mt-2 w-48 p-2 shadow-xl border border-base-300"
        style={{ backgroundColor: "#0e1111" }}
      >
        {routing.locales.map((loc) => (
          <li key={loc}>
            <button
              onClick={() => handleChange(loc)}
              className={`flex items-center gap-3 rounded-lg transition-colors ${
                loc === locale
                  ? "font-semibold"
                  : "text-neutral-content/70 hover:text-neutral-content"
              }`}
              style={
                loc === locale
                  ? { backgroundColor: "oklch(82% 0.11 162)", color: "#0e1111" }
                  : undefined
              }
            >
              <span className="font-mono font-bold text-xs w-6">{loc.toUpperCase()}</span>
              {languageLabels[loc]}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
