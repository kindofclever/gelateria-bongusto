"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import PageHeader from "@/components/ui/PageHeader";

const categories = [
  "filter_all",
  "filter_classic",
  "filter_fruit",
  "filter_special",
  "filter_vegan",
  "filter_seasonal",
] as const;

// Placeholder data until Sanity is connected
const placeholderFlavors = [
  { id: "1", name: "Stracciatella", category: "klassisch", isVegan: false, isLactoseFree: false, rating: 4.5, ratingCount: 23 },
  { id: "2", name: "Pistacchio", category: "klassisch", isVegan: false, isLactoseFree: false, rating: 4.8, ratingCount: 31 },
  { id: "3", name: "Fragola", category: "frucht", isVegan: true, isLactoseFree: true, rating: 4.2, ratingCount: 15 },
  { id: "4", name: "Mango Sorbet", category: "frucht", isVegan: true, isLactoseFree: true, rating: 4.6, ratingCount: 18 },
  { id: "5", name: "Cioccolato Fondente", category: "klassisch", isVegan: false, isLactoseFree: false, rating: 4.7, ratingCount: 27 },
  { id: "6", name: "Nocciola", category: "klassisch", isVegan: false, isLactoseFree: false, rating: 4.4, ratingCount: 19 },
  { id: "7", name: "Matcha", category: "spezial", isVegan: true, isLactoseFree: true, rating: 4.1, ratingCount: 12 },
  { id: "8", name: "Salted Caramel", category: "spezial", isVegan: false, isLactoseFree: false, rating: 4.9, ratingCount: 35 },
  { id: "9", name: "Limone Basilico", category: "saisonal", isVegan: true, isLactoseFree: true, rating: 4.3, ratingCount: 8 },
];

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const sizeClass = size === "sm" ? "w-4 h-4" : "w-5 h-5";
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`${sizeClass} ${star <= Math.round(rating) ? "text-warning" : "text-base-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RatingModal({ flavorName, onClose, onSubmit }: { flavorName: string; onClose: () => void; onSubmit: (score: number, name: string, comment: string) => void }) {
  const [score, setScore] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const t = useTranslations("flavors_page");

  return (
    <div className="modal modal-open">
      <div className="modal-box">
        <h3 className="font-bold text-xl font-[family-name:var(--font-fredoka)] mb-4">
          {flavorName} bewerten
        </h3>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setScore(star)}
              className={`w-10 h-10 text-2xl transition-colors ${
                star <= score ? "text-warning" : "text-base-300 hover:text-warning/50"
              }`}
            >
              ★
            </button>
          ))}
        </div>
        <input
          type="text"
          placeholder="Dein Name (optional)"
          className="input input-bordered w-full mb-3"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          placeholder="Dein Kommentar (optional)"
          className="textarea textarea-bordered w-full mb-4"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="modal-action">
          <button className="btn btn-ghost" onClick={onClose}>
            Abbrechen
          </button>
          <button
            className="btn btn-primary"
            disabled={score === 0}
            onClick={() => onSubmit(score, name, comment)}
          >
            Bewertung abgeben
          </button>
        </div>
      </div>
      <div className="modal-backdrop" onClick={onClose} />
    </div>
  );
}

export default function FlavorsPage() {
  const t = useTranslations("flavors_page");
  const [activeFilter, setActiveFilter] = useState("filter_all");
  const [ratingModal, setRatingModal] = useState<string | null>(null);

  const categoryMap: Record<string, string> = {
    filter_classic: "klassisch",
    filter_fruit: "frucht",
    filter_special: "spezial",
    filter_vegan: "vegan",
    filter_seasonal: "saisonal",
  };

  const filtered =
    activeFilter === "filter_all"
      ? placeholderFlavors
      : activeFilter === "filter_vegan"
        ? placeholderFlavors.filter((f) => f.isVegan)
        : placeholderFlavors.filter(
            (f) => f.category === categoryMap[activeFilter]
          );

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")}  />
      <div className="container mx-auto px-6 py-12">
        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`btn btn-sm ${
                activeFilter === cat
                  ? "btn-primary"
                  : "btn-ghost border border-base-300"
              }`}
            >
              {t(cat)}
            </button>
          ))}
        </div>

        {/* Flavor grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((flavor) => (
            <div
              key={flavor.id}
              className="card bg-base-100 border border-base-300 hover:shadow-lg transition-shadow h-full"
            >
              <div className="card-body flex flex-col">
                <div className="skeleton w-full h-40 rounded-lg mb-4" />
                <h3 className="card-title font-[family-name:var(--font-fredoka)]">
                  {flavor.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <StarRating rating={flavor.rating} />
                  <span className="text-sm text-base-content/50">
                    ({flavor.ratingCount})
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mt-3 min-h-[1.5rem]">
                  {flavor.isVegan && (
                    <span className="badge badge-secondary badge-sm">
                      {t("vegan")}
                    </span>
                  )}
                  {flavor.isLactoseFree && (
                    <span className="badge badge-accent badge-sm">
                      {t("lactose_free")}
                    </span>
                  )}
                </div>
                <div className="card-actions mt-auto pt-4">
                  <button
                    className="btn btn-primary btn-sm btn-outline"
                    onClick={() => setRatingModal(flavor.name)}
                  >
                    Bewerten
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Rating Modal */}
      {ratingModal && (
        <RatingModal
          flavorName={ratingModal}
          onClose={() => setRatingModal(null)}
          onSubmit={(score, name, comment) => {
            // TODO: Send to Sanity API
            console.log("Rating submitted:", { flavor: ratingModal, score, name, comment });
            setRatingModal(null);
          }}
        />
      )}
    </main>
  );
}
