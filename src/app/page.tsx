export default function Home() {
  return (
    <main className="shell">
      <header className="brand">
        <span className="brand-mark" aria-hidden="true">S × J</span>
        <span>Swiggy × Jev <span className="muted">/ POC</span></span>
      </header>

      <section className="intro" aria-labelledby="page-title">
        <p className="eyebrow">Restaurant discovery, with your preferences in mind</p>
        <h1 id="page-title">Find your next table.</h1>
        <p className="description">
          A small experiment combining Swiggy restaurant search with
          evidence-aware preference matching from Jev.
        </p>
      </section>

      <section className="status-card" aria-labelledby="status-title">
        <span className="badge">Scaffold ready</span>
        <h2 id="status-title">The foundation is in place.</h2>
        <p>
          Next up: choose a location, set a budget for two, and tell us what
          you&apos;re looking for.
        </p>
        <p className="status-note">
          No restaurant searches or AI requests are made yet.
        </p>
      </section>

      <footer>Independent proof of concept · Dine-in discovery only</footer>
    </main>
  );
}
