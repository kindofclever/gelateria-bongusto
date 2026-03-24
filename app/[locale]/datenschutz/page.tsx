export default function PrivacyPage() {
  return (
    <main className="flex-1 py-16">
      <div className="container mx-auto px-6 max-w-3xl">
        <h1 className="text-4xl md:text-5xl font-bold mb-8 font-[family-name:var(--font-fredoka)]">
          Datenschutz
        </h1>
        <div className="prose prose-lg max-w-none text-base-content/70">
          <p>
            Der Schutz deiner persönlichen Daten ist uns wichtig. Diese
            Datenschutzerklärung informiert dich über die Art, den Umfang und
            Zweck der Verarbeitung personenbezogener Daten auf unserer Website.
          </p>
          <h2>Verantwortlich</h2>
          <p>
            Bongusto Gelateria
            <br />
            Sanitätspark, St. Gallen, Schweiz
          </p>
          <h2>Cookies</h2>
          <p>
            Diese Website verwendet nur technisch notwendige Cookies. Es werden
            keine Tracking-Cookies eingesetzt.
          </p>
          <h2>Kontaktformular</h2>
          <p>
            Wenn du uns über das Kontaktformular kontaktierst, werden deine
            Angaben zur Bearbeitung der Anfrage gespeichert und nicht an Dritte
            weitergegeben.
          </p>
        </div>
      </div>
    </main>
  );
}
