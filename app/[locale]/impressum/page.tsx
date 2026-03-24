export default function ImprintPage() {
  return (
    <main className="flex-1 py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-fredoka)]">
          Impressum
        </h1>
        <div className="prose prose-lg max-w-none text-base-content/70">
          <p>
            <strong>Bongusto Gelateria</strong>
            <br />
            Sanitätspark
            <br />
            St. Gallen, Schweiz
          </p>
          <p>
            Kontakt: info@bongusto.ch
            <br />
            Telefon: +41 71 000 00 00
          </p>
        </div>
      </div>
    </main>
  );
}
