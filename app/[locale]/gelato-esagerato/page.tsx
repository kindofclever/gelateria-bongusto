"use client";

import { useTranslations } from "next-intl";
import { useState, useReducer } from "react";
import PageHeader from "@/components/ui/PageHeader";

const containers = [
  { id: "small", volume: "0.5L", price: 8.5, maxFlavors: 2, color: "bg-primary" },
  { id: "medium", volume: "0.75L", price: 11.5, maxFlavors: 3, color: "bg-warning" },
  { id: "large", volume: "1L", price: 14.0, maxFlavors: 4, color: "bg-accent" },
];

const flavors = [
  { id: "stracciatella", name: "Stracciatella", category: "klassisch" },
  { id: "pistacchio", name: "Pistacchio", category: "klassisch" },
  { id: "cioccolato", name: "Cioccolato Fondente", category: "klassisch" },
  { id: "nocciola", name: "Nocciola", category: "klassisch" },
  { id: "fragola", name: "Fragola", category: "frucht" },
  { id: "mango", name: "Mango Sorbet", category: "frucht" },
  { id: "limone", name: "Limone", category: "frucht" },
  { id: "matcha", name: "Matcha", category: "spezial" },
  { id: "caramel", name: "Salted Caramel", category: "spezial" },
  { id: "tiramisù", name: "Tiramisù", category: "spezial" },
];

const toppings = [
  { id: "snickers", name: "Snickers Chunks", price: 2.5 },
  { id: "brownies", name: "Brownie Bits", price: 2.5 },
  { id: "ovomaltine", name: "Ovomaltine Crunchy", price: 2.0 },
  { id: "frootloops", name: "Froot Loops", price: 2.0 },
  { id: "oreo", name: "Oreo Crumble", price: 2.0 },
  { id: "bacon", name: "Speck Crumbles", price: 3.0 },
  { id: "bretzel", name: "Brezelstücke", price: 1.5 },
  { id: "marshmallow", name: "Mini Marshmallows", price: 1.5 },
  { id: "nutella", name: "Nutella Swirl", price: 2.5 },
  { id: "gummibear", name: "Gummibärchen", price: 1.5 },
  { id: "cookiedough", name: "Cookie Dough", price: 2.5 },
  { id: "peanutbutter", name: "Peanut Butter Cups", price: 3.0 },
  { id: "karamell", name: "Karamellsauce", price: 1.5 },
  { id: "schokosauce", name: "Heisse Schokosauce", price: 1.5 },
  { id: "chili", name: "Chili Flakes", price: 1.0 },
  { id: "cottoncandy", name: "Zuckerwatte", price: 2.0 },
];

const locations = [
  { id: "abtwil", name: "Abtwil", address: "Sanitätspark, St. Gallen" },
  { id: "rorschach", name: "Rorschach", address: "Rorschach, Bodensee" },
];

const MEHRWEGGEBINDE_PRICE = 4.0;

type State = {
  step: 1 | 2 | 3 | 4 | 5;
  containerId: string | null;
  flavorIds: string[];
  toppingIds: string[];
  bringOwnContainer: boolean;
  locationId: string | null;
};

type Action =
  | { type: "SET_CONTAINER"; id: string }
  | { type: "TOGGLE_FLAVOR"; id: string }
  | { type: "TOGGLE_TOPPING"; id: string }
  | { type: "SET_OWN_CONTAINER"; value: boolean }
  | { type: "SET_LOCATION"; id: string }
  | { type: "NEXT" }
  | { type: "BACK" }
  | { type: "RESET" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_CONTAINER":
      return { ...state, containerId: action.id, flavorIds: [] };
    case "TOGGLE_FLAVOR": {
      const container = containers.find((c) => c.id === state.containerId);
      const max = container?.maxFlavors ?? 0;
      if (state.flavorIds.includes(action.id)) {
        return { ...state, flavorIds: state.flavorIds.filter((id) => id !== action.id) };
      }
      if (state.flavorIds.length >= max) return state;
      return { ...state, flavorIds: [...state.flavorIds, action.id] };
    }
    case "TOGGLE_TOPPING":
      if (state.toppingIds.includes(action.id)) {
        return { ...state, toppingIds: state.toppingIds.filter((id) => id !== action.id) };
      }
      return { ...state, toppingIds: [...state.toppingIds, action.id] };
    case "SET_OWN_CONTAINER":
      return { ...state, bringOwnContainer: action.value };
    case "SET_LOCATION":
      return { ...state, locationId: action.id };
    case "NEXT":
      return { ...state, step: Math.min(state.step + 1, 5) as State["step"] };
    case "BACK":
      return { ...state, step: Math.max(state.step - 1, 1) as State["step"] };
    case "RESET":
      return { step: 1, containerId: null, flavorIds: [], toppingIds: [], bringOwnContainer: false, locationId: null };
    default:
      return state;
  }
}

function StepIndicator({ step }: { step: number }) {
  const t = useTranslations("configurator");
  const steps = [
    t("step_size"),
    t("step_flavors"),
    t("step_toppings"),
    t("step_container"),
    t("step_pickup"),
  ];

  return (
    <ul className="steps steps-horizontal w-full mb-10">
      {steps.map((label, i) => (
        <li key={label} className={`step ${i + 1 <= step ? "step-primary" : ""}`}>
          <span className="text-sm">{label}</span>
        </li>
      ))}
    </ul>
  );
}

export default function ConfiguratorPage() {
  const t = useTranslations("configurator");
  const [state, dispatch] = useReducer(reducer, {
    step: 1,
    containerId: null,
    flavorIds: [],
    toppingIds: [],
    bringOwnContainer: false,
    locationId: null,
  });
  const [complete, setComplete] = useState(false);

  const selectedContainer = containers.find((c) => c.id === state.containerId);
  const selectedToppings = toppings.filter((tp) => state.toppingIds.includes(tp.id));
  const selectedLocation = locations.find((l) => l.id === state.locationId);

  const containerPrice = selectedContainer?.price ?? 0;
  const toppingsPrice = selectedToppings.reduce((sum, tp) => sum + tp.price, 0);
  const gebindePrice = state.bringOwnContainer ? 0 : MEHRWEGGEBINDE_PRICE;
  const totalPrice = containerPrice + toppingsPrice + gebindePrice;

  const canAdvance = () => {
    switch (state.step) {
      case 1: return !!state.containerId;
      case 2: return state.flavorIds.length > 0;
      case 3: return true;
      case 4: return true;
      case 5: return !!state.locationId;
      default: return false;
    }
  };

  if (complete) {
    return (
      <main className="flex-1 py-16">
        <div className="container mx-auto px-6 max-w-2xl text-center">
          <div className="py-20">
            <h1 className="text-4xl font-bold text-primary mb-4 font-[family-name:var(--font-fredoka)]">
              {t("order_complete")}
            </h1>
            <p className="text-lg text-base-content/70 mb-8">
              {t("order_pickup_info", { location: selectedLocation?.name ?? "" })}
            </p>
            <OrderSummary
              container={selectedContainer}
              flavorIds={state.flavorIds}
              selectedToppings={selectedToppings}
              totalPrice={totalPrice}
              bringOwn={state.bringOwnContainer}
              location={selectedLocation}
            />
            <button
              className="btn btn-primary mt-8"
              onClick={() => { dispatch({ type: "RESET" }); setComplete(false); }}
            >
              {t("promo_cta")}
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <PageHeader title={t("title")} subtitle={t("subtitle")} />
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <StepIndicator step={state.step} />

            {/* Step 1: Size */}
            {state.step === 1 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-fredoka)]">
                  {t("select_size")}
                </h2>
                <p className="text-sm text-base-content/50 mb-6">{t("container_note")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {containers.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => dispatch({ type: "SET_CONTAINER", id: c.id })}
                      className={`card border-2 transition-all cursor-pointer ${
                        state.containerId === c.id
                          ? "border-primary bg-primary/5 shadow-md"
                          : "border-base-300 bg-base-100 hover:border-primary/30"
                      }`}
                    >
                      <div className="card-body items-center text-center py-8">
                        <div className={`${c.color} w-20 h-20 rounded-full mb-4 flex items-center justify-center text-2xl font-bold text-white`}>
                          {c.volume}
                        </div>
                        <h3 className="text-lg font-bold font-[family-name:var(--font-fredoka)]">{c.volume}</h3>
                        <p className="text-primary font-semibold">CHF {c.price.toFixed(2)}</p>
                        <p className="text-sm text-base-content/50">{t("max_flavors", { count: c.maxFlavors })}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 2: Flavors */}
            {state.step === 2 && selectedContainer && (
              <div>
                <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-fredoka)]">
                  {t("select_flavors")}
                </h2>
                <p className="text-sm text-base-content/50 mb-6">
                  {t("flavors_selected", { current: state.flavorIds.length, max: selectedContainer.maxFlavors })}
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {flavors.map((f) => {
                    const selected = state.flavorIds.includes(f.id);
                    const maxReached = state.flavorIds.length >= selectedContainer.maxFlavors;
                    return (
                      <button
                        key={f.id}
                        onClick={() => dispatch({ type: "TOGGLE_FLAVOR", id: f.id })}
                        disabled={!selected && maxReached}
                        className={`card border-2 transition-all cursor-pointer ${
                          selected ? "border-primary bg-primary/5"
                            : maxReached ? "border-base-200 bg-base-100 opacity-40 cursor-not-allowed"
                            : "border-base-300 bg-base-100 hover:border-primary/30"
                        }`}
                      >
                        <div className="card-body items-center text-center p-4">
                          <div className="w-12 h-12 rounded-full bg-base-300 mb-2" />
                          <span className="text-sm font-medium">{f.name}</span>
                          {selected && <span className="badge badge-primary badge-sm mt-1">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 3: Toppings */}
            {state.step === 3 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-fredoka)]">
                  {t("select_toppings")}
                </h2>
                <p className="text-sm text-base-content/50 mb-6">{t("toppings_optional")}</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                  {toppings.map((tp) => {
                    const selected = state.toppingIds.includes(tp.id);
                    return (
                      <button
                        key={tp.id}
                        onClick={() => dispatch({ type: "TOGGLE_TOPPING", id: tp.id })}
                        className={`card border-2 transition-all cursor-pointer ${
                          selected
                            ? "border-secondary bg-secondary/5"
                            : "border-base-300 bg-base-100 hover:border-secondary/30"
                        }`}
                      >
                        <div className="card-body items-center text-center p-4">
                          <span className="font-medium text-sm">{tp.name}</span>
                          <span className="text-xs text-base-content/50">+CHF {tp.price.toFixed(2)}</span>
                          {selected && <span className="badge badge-secondary badge-sm mt-1">✓</span>}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Step 4: Mehrweggebinde */}
            {state.step === 4 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-fredoka)]">
                  {t("step_container")}
                </h2>
                <p className="text-sm text-base-content/50 mb-6">{t("container_choice_desc")}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button
                    onClick={() => dispatch({ type: "SET_OWN_CONTAINER", value: true })}
                    className={`card border-2 transition-all cursor-pointer ${
                      state.bringOwnContainer
                        ? "border-secondary bg-secondary/5 shadow-md"
                        : "border-base-300 bg-base-100 hover:border-secondary/30"
                    }`}
                  >
                    <div className="card-body items-center text-center py-8">
                      <div className="text-4xl mb-3">♻️</div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-fredoka)]">
                        {t("own_container")}
                      </h3>
                      <p className="text-sm text-base-content/50">{t("own_container_desc")}</p>
                      <p className="text-secondary font-semibold mt-2">{t("free")}</p>
                    </div>
                  </button>
                  <button
                    onClick={() => dispatch({ type: "SET_OWN_CONTAINER", value: false })}
                    className={`card border-2 transition-all cursor-pointer ${
                      !state.bringOwnContainer
                        ? "border-primary bg-primary/5 shadow-md"
                        : "border-base-300 bg-base-100 hover:border-primary/30"
                    }`}
                  >
                    <div className="card-body items-center text-center py-8">
                      <div className="text-4xl mb-3">🧊</div>
                      <h3 className="text-lg font-bold font-[family-name:var(--font-fredoka)]">
                        {t("new_container")}
                      </h3>
                      <p className="text-sm text-base-content/50">{t("new_container_desc")}</p>
                      <p className="text-primary font-semibold mt-2">CHF {MEHRWEGGEBINDE_PRICE.toFixed(2)}</p>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Pickup */}
            {state.step === 5 && (
              <div>
                <h2 className="text-2xl font-bold mb-2 font-[family-name:var(--font-fredoka)]">
                  {t("select_pickup")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                  {locations.map((loc) => (
                    <button
                      key={loc.id}
                      onClick={() => dispatch({ type: "SET_LOCATION", id: loc.id })}
                      className={`card border-2 transition-all cursor-pointer text-left ${
                        state.locationId === loc.id
                          ? "border-accent bg-accent/5"
                          : "border-base-300 bg-base-100 hover:border-accent/30"
                      }`}
                    >
                      <div className="card-body">
                        <h3 className="text-lg font-bold font-[family-name:var(--font-fredoka)] text-accent">{loc.name}</h3>
                        <p className="text-base-content/60 text-sm">{loc.address}</p>
                        {state.locationId === loc.id && (
                          <span className="badge badge-accent badge-sm mt-2">✓</span>
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between mt-10">
              <button
                className="btn btn-ghost"
                onClick={() => dispatch({ type: "BACK" })}
                disabled={state.step === 1}
              >
                {t("back")}
              </button>
              {state.step < 5 ? (
                <button
                  className="btn btn-primary"
                  onClick={() => dispatch({ type: "NEXT" })}
                  disabled={!canAdvance()}
                >
                  {t("next")}
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  disabled={!canAdvance()}
                  onClick={() => setComplete(true)}
                >
                  {t("finish")}
                </button>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="card bg-base-200 border border-base-300 sticky top-24">
              <div className="card-body">
                <h3 className="card-title font-[family-name:var(--font-fredoka)]">{t("summary")}</h3>
                <OrderSummary
                  container={selectedContainer}
                  flavorIds={state.flavorIds}
                  selectedToppings={selectedToppings}
                  totalPrice={totalPrice}
                  bringOwn={state.bringOwnContainer}
                  location={selectedLocation}
                />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center text-xs text-base-content/40 mt-12">
          Gelato Esagerato&trade; ist ein Konzept von Bongusto Gelateria. Alle Toppings werden direkt in das Gelato eingerührt.
        </p>
      </div>
    </main>
  );
}

function OrderSummary({
  container, flavorIds, selectedToppings, totalPrice, bringOwn, location,
}: {
  container: (typeof containers)[number] | undefined;
  flavorIds: string[];
  selectedToppings: (typeof toppings)[number][];
  totalPrice: number;
  bringOwn: boolean;
  location: (typeof locations)[number] | undefined;
}) {
  const t = useTranslations("configurator");

  return (
    <div className="space-y-3 text-sm">
      {container && (
        <div className="flex justify-between">
          <span>{t("container")} ({container.volume})</span>
          <span>CHF {container.price.toFixed(2)}</span>
        </div>
      )}
      {flavorIds.length > 0 && (
        <div>
          <span className="text-base-content/50">{t("step_flavors")}:</span>
          <ul className="ml-2 mt-1 space-y-0.5">
            {flavorIds.map((id) => {
              const f = flavors.find((fl) => fl.id === id);
              return <li key={id} className="text-base-content/70">{f?.name}</li>;
            })}
          </ul>
        </div>
      )}
      {selectedToppings.length > 0 && (
        <div>
          <span className="text-base-content/50">{t("step_toppings")}:</span>
          <ul className="ml-2 mt-1 space-y-0.5">
            {selectedToppings.map((tp) => (
              <li key={tp.id} className="flex justify-between text-base-content/70">
                <span>{tp.name}</span>
                <span>+CHF {tp.price.toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
      <div className="flex justify-between text-base-content/50">
        <span>{bringOwn ? t("own_container") : t("new_container")}</span>
        <span>{bringOwn ? t("free") : `CHF ${MEHRWEGGEBINDE_PRICE.toFixed(2)}`}</span>
      </div>
      <div className="divider my-1" />
      <div className="flex justify-between font-bold text-base">
        <span>{t("total")}</span>
        <span className="text-primary">CHF {totalPrice.toFixed(2)}</span>
      </div>
      {location && (
        <div className="mt-2 text-base-content/50">
          {t("step_pickup")}: {location.name}
        </div>
      )}
    </div>
  );
}
