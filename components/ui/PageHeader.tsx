"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const PINK = "oklch(62% 0.2 360)";
const MINT = "oklch(82% 0.11 162)";
const BLUE = "oklch(63% 0.14 272)";
const YELLOW = "oklch(88% 0.16 90)";
const DARK = "#0e1111";
const WHITE = "#fff";

function subtitleFor(bg: string) {
  if (bg === DARK || bg === PINK || bg === BLUE) return "rgba(255,255,255,0.6)";
  return "rgba(26,26,26,0.5)";
}

const textures = [
  "/images/AdobeStock_421486375.jpeg",    // pink gelato
  "/images/AdobeStock_449927879.jpeg",    // yellow gelato
  "/images/AdobeStock_459687348(1).jpeg", // blue water
  "/images/AdobeStock_1825048282(1).png", // doodle
];

const combos = [
  { bg: PINK, text: WHITE, bar: WHITE },
  { bg: MINT, text: DARK, bar: DARK },
  { bg: BLUE, text: WHITE, bar: WHITE },
  { bg: YELLOW, text: DARK, bar: DARK },
  { bg: PINK, text: YELLOW, bar: YELLOW },
  { bg: PINK, text: MINT, bar: MINT },
  { bg: BLUE, text: YELLOW, bar: YELLOW },
  { bg: BLUE, text: MINT, bar: MINT },
  { bg: YELLOW, text: PINK, bar: PINK },
  { bg: YELLOW, text: BLUE, bar: BLUE },
  { bg: MINT, text: PINK, bar: PINK },
  { bg: MINT, text: BLUE, bar: BLUE },
  { bg: DARK, text: PINK, bar: PINK },
  { bg: DARK, text: MINT, bar: MINT },
  { bg: DARK, text: BLUE, bar: BLUE },
  { bg: DARK, text: YELLOW, bar: YELLOW },
].map((c) => ({ ...c, subtitle: subtitleFor(c.bg) }));

export default function PageHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  const [combo, setCombo] = useState(combos[0]);
  const [texture, setTexture] = useState("");

  useEffect(() => {
    setCombo(combos[Math.floor(Math.random() * combos.length)]);
    setTexture(textures[Math.floor(Math.random() * textures.length)]);
  }, []);

  return (
    <div
      className="border-b border-base-200 py-16 relative overflow-hidden"
      style={{ backgroundColor: combo.bg }}
    >
      {/* Texture overlay */}
      {texture && (
        <Image
          src={texture}
          alt=""
          fill
          className="object-cover opacity-10 mix-blend-overlay pointer-events-none"
          aria-hidden
        />
      )}
      <div className="container mx-auto px-6 relative z-10">
        <div className="w-12 h-1.5 rounded-full mb-6" style={{ backgroundColor: combo.bar }} />
        <h1
          className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-fredoka)]"
          style={{ color: combo.text }}
        >
          {title}
        </h1>
        {subtitle && (
          <p className="text-lg mt-3 max-w-2xl" style={{ color: combo.subtitle }}>
            {subtitle}
          </p>
        )}
      </div>
    </div>
  );
}
