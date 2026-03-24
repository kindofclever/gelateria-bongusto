import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import Image from "next/image";
import heroImage from "@/public/images/Screenshot 2026-03-24 at 22.37.53.png";

export default function Home() {
  const t = useTranslations();

  return (
    <main className="flex-1">
      {/* Hero */}
      <div className="hero min-h-screen relative overflow-hidden">
        <Image
          src={heroImage}
          alt="Bongusto Gelato"
          fill
          className="object-cover object-center"
          priority
          placeholder="blur"
        />
        <div className="hero-overlay bg-black/20" />
        <div className="hero-content text-neutral-content w-full">
          <div className="ml-auto mr-4 md:mr-4 lg:mr-8 -mt-72 md:-mt-40 mb-auto text-right max-w-lg">
            <p className="text-3xl md:text-5xl font-semibold text-secondary mb-21tracking-[0.1em] uppercase">
              Gelateria
            </p>
            <h1 className="mb-5 text-7xl md:text-9xl font-bold font-[family-name:var(--font-fredoka)] text-primary">
              Bongusto
            </h1>
            <p className="mb-2 text-xl font-[family-name:var(--font-fredoka)]">
              {t("hero.title")}
            </p>
            <p className="mb-8 text-s">{t("hero.subtitle")}</p>
            <div className="flex flex-wrap justify-end gap-3">
              <Link
                href="/kontakt"
                className="btn btn-primary btn-sm md:btn-lg"
              >
                {t("nav.contact")}
              </Link>
              <Link
                href="/sorten"
                className="btn btn-ghost btn-sm md:btn-lg border-white/30 hover:bg-white/10"
              >
                {t("nav.flavors")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Gelato Esagerato — Builder Promo */}
      <section className="py-24 bg-secondary text-secondary-content relative overflow-hidden">
        <Image
          src="/images/AdobeStock_1825048282(1).png"
          alt=""
          fill
          className="object-cover opacity-[0.07] mix-blend-overlay pointer-events-none"
          aria-hidden
        />
        <div className="px-6 md:px-12 lg:px-20 relative z-10">
          <div className="text-center mb-16">
            <p className="text-sm font-semibold tracking-widest uppercase text-primary mb-4">
              {t("configurator.promo_label")}
            </p>
            <h2 className="text-5xl md:text-7xl font-bold font-[family-name:var(--font-fredoka)] text-neutral mb-6">
              {t("configurator.title")}
            </h2>
            <p className="text-xl text-secondary-content/70 max-w-2xl mx-auto">
              {t("configurator.subtitle")}
            </p>
          </div>

          {/* 3 Steps Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-primary mx-auto mb-5 flex items-center justify-center">
                <span className="text-3xl font-bold text-white font-[family-name:var(--font-fredoka)]">
                  1
                </span>
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-fredoka)] text-neutral mb-2">
                {t("configurator.step_size")}
              </h3>
              <p className="text-secondary-content/60">
                {t("configurator.step_size_desc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-warning mx-auto mb-5 flex items-center justify-center">
                <span className="text-3xl font-bold text-neutral font-[family-name:var(--font-fredoka)]">
                  2
                </span>
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-fredoka)] text-neutral mb-2">
                {t("configurator.step_flavors")}
              </h3>
              <p className="text-secondary-content/60">
                {t("configurator.step_flavors_desc")}
              </p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-accent mx-auto mb-5 flex items-center justify-center">
                <span className="text-3xl font-bold text-white font-[family-name:var(--font-fredoka)]">
                  3
                </span>
              </div>
              <h3 className="text-xl font-bold font-[family-name:var(--font-fredoka)] text-neutral mb-2">
                {t("configurator.step_toppings")}
              </h3>
              <p className="text-secondary-content/60">
                {t("configurator.step_toppings_desc")}
              </p>
            </div>
          </div>

          {/* Einweggebinde Note + CTA */}
          <div className="text-center">
            <p className="text-sm text-secondary-content/50 mb-8">
              {t("configurator.container_note")}
            </p>
            <Link
              href="/gelato-esagerato"
              className="btn btn-warning btn-sm md:btn-lg text-base md:text-xl font-bold px-6 md:px-12"
            >
              {t("configurator.promo_cta")}
            </Link>
            <p className="text-xs text-secondary-content/40 mt-6">
              Gelato Esagerato&trade; by Bongusto. Alle Toppings werden direkt
              eingerührt.
            </p>
          </div>
        </div>
      </section>

      {/* Catering Teaser */}
      <section className="py-24 bg-base-200">
        <div className="px-6 md:px-12 lg:px-20 max-w-3xl">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 font-[family-name:var(--font-fredoka)]">
            {t("catering_page.title")}
          </h2>
          <p className="text-lg text-base-content/70 leading-relaxed mb-8">
            {t("catering_page.text")}
          </p>
          <Link href="/catering" className="btn btn-accent btn-outline">
            {t("catering_page.cta")}
          </Link>
        </div>
      </section>
    </main>
  );
}
