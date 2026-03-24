"use client";

import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import LanguageSwitcher from "./LanguageSwitcher";
import { useState, useEffect, useRef } from "react";

// All color combos with good contrast
const themeColors = [
  // Solid color bg + neutral text
  { bg: "oklch(62% 0.2 360)", text: "#fff" },          // pink bg, white
  { bg: "oklch(82% 0.11 162)", text: "#0e1111" },     // mint bg, dark
  { bg: "oklch(63% 0.14 272)", text: "#fff" },          // blue bg, white
  { bg: "oklch(88% 0.16 90)", text: "#0e1111" },      // yellow bg, dark
  // Two-color mixes: bg + colored text
  { bg: "oklch(62% 0.2 360)", text: "oklch(88% 0.16 90)" },   // pink bg, yellow text
  { bg: "oklch(62% 0.2 360)", text: "oklch(82% 0.11 162)" },  // pink bg, mint text
  { bg: "oklch(63% 0.14 272)", text: "oklch(88% 0.16 90)" },  // blue bg, yellow text
  { bg: "oklch(63% 0.14 272)", text: "oklch(82% 0.11 162)" }, // blue bg, mint text
  { bg: "oklch(88% 0.16 90)", text: "oklch(62% 0.2 360)" },   // yellow bg, pink text
  { bg: "oklch(88% 0.16 90)", text: "oklch(63% 0.14 272)" },  // yellow bg, blue text
  { bg: "oklch(82% 0.11 162)", text: "oklch(62% 0.2 360)" },  // mint bg, pink text
  { bg: "oklch(82% 0.11 162)", text: "oklch(63% 0.14 272)" }, // mint bg, blue text
  { bg: "#0e1111", text: "oklch(62% 0.2 360)" },              // dark bg, pink text
  { bg: "#0e1111", text: "oklch(82% 0.11 162)" },             // dark bg, mint text
  { bg: "#0e1111", text: "oklch(63% 0.14 272)" },             // dark bg, blue text
  { bg: "#0e1111", text: "oklch(88% 0.16 90)" },              // dark bg, yellow text
];

function pickRandom(exclude?: number): number {
  let idx: number;
  do {
    idx = Math.floor(Math.random() * themeColors.length);
  } while (idx === exclude);
  return idx;
}

const navItems = [
  { href: "/", labelKey: "home" },
  { href: "/sorten", labelKey: "flavors" },
  { href: "/gelato-esagerato", labelKey: "configurator" },
  { href: "/standorte", labelKey: "locations" },
  { href: "/ueber-uns", labelKey: "about" },
  { href: "/catering", labelKey: "catering" },
  { href: "/kontakt", labelKey: "contact" },
] as const;

export default function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [hoverColors, setHoverColors] = useState<Record<string, number>>({});
  const [scrolled, setScrolled] = useState(false);
  const prevPathname = useRef(pathname);
  const mounted = useRef(false);

  const isHome = pathname === "/";

  // Initial random color only on client after mount
  useEffect(() => {
    if (!mounted.current) {
      setActiveIdx(pickRandom());
      mounted.current = true;
    }
  }, []);

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setActiveIdx((prev) => pickRandom(prev ?? undefined));
      prevPathname.current = pathname;
    }
  }, [pathname]);

  useEffect(() => {
    if (!isHome) {
      setScrolled(true);
      return;
    }
    function onScroll() {
      setScrolled(window.scrollY > 80);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isHome]);

  function handleMouseEnter(href: string) {
    setHoveredItem(href);
    setHoverColors((prev) => ({
      ...prev,
      [href]: pickRandom(prev[href]),
    }));
  }

  const activeColor = activeIdx !== null ? themeColors[activeIdx] : null;

  return (
    <header className={`navbar bg-base-100/80 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-base-200 px-6 md:px-12 lg:px-20 transition-transform duration-300 ${scrolled ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </div>
          {mobileOpen && (
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-50 mt-3 w-64 p-3 shadow-xl border border-base-200">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-lg font-medium"
                    style={
                      pathname === item.href && activeColor
                        ? { backgroundColor: activeColor.bg, color: activeColor.text }
                        : undefined
                    }
                  >
                    {t(item.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        <Link href="/" className="text-2xl font-bold text-primary font-[family-name:var(--font-fredoka)] tracking-tight">
          Bongusto
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const isHovered = hoveredItem === item.href;
            const hoverIdx = hoverColors[item.href];
            const hoverColor = hoverIdx !== undefined ? themeColors[hoverIdx] : null;

            let style: React.CSSProperties | undefined;
            if (isActive && activeColor) {
              style = { backgroundColor: activeColor.bg, color: activeColor.text };
            } else if (isHovered && hoverColor) {
              style = { backgroundColor: hoverColor.bg, color: hoverColor.text };
            }

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`font-medium rounded-lg transition-all duration-200 ${isActive ? "font-semibold" : ""}`}
                  style={style}
                  onMouseEnter={() => !isActive && handleMouseEnter(item.href)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  {t(item.labelKey)}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="navbar-end">
        <LanguageSwitcher />
      </div>
    </header>
  );
}
