import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Footer() {
  const t = useTranslations();
  const year = new Date().getFullYear();

  return (
    <footer
      className="text-neutral-content"
      style={{ backgroundColor: "#0e1111" }}
    >
      <div className="px-6 md:px-12 lg:px-20 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold font-[family-name:var(--font-fredoka)] text-primary mb-2">
              Bongusto
            </h3>
            <p className="text-neutral-content mb-2">{t("footer.tagline")}</p>
            <p className="text-sm text-neutral-content">
              &copy; {year} Bongusto Gelateria. {t("footer.rights")}.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/sorten"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.flavors")}
                </Link>
              </li>
              <li>
                <Link
                  href="/gelato-esagerato"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.configurator")}
                </Link>
              </li>
              <li>
                <Link
                  href="/catering"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.catering")}
                </Link>
              </li>
              <li>
                <Link
                  href="/ueber-uns"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.about")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Locations */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">{t("nav.locations")}</h4>
            <div className="space-y-4">
              <Link
                href="/standorte"
                className="block hover:text-primary transition-colors"
              >
                <p className="font-medium">Abtwil</p>
                <p className="text-sm text-neutral-content">
                  Sanitätspark, St. Gallen
                </p>
              </Link>
              <Link
                href="/standorte"
                className="block hover:text-primary transition-colors"
              >
                <p className="font-medium">Rorschach</p>
                <p className="text-sm text-neutral-content">
                  Rorschach, Bodensee
                </p>
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-lg">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/impressum"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.imprint")}
                </Link>
              </li>
              <li>
                <Link
                  href="/datenschutz"
                  className="hover:text-primary transition-colors"
                >
                  {t("footer.privacy")}
                </Link>
              </li>
              <li>
                <Link
                  href="/kontakt"
                  className="hover:text-primary transition-colors"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mt-5">
          <p className="text-sm text-neutral-content">
            &copy; {year} Bongusto Gelateria. {t("footer.rights")}.
          </p>
        </div> */}
      </div>
    </footer>
  );
}
