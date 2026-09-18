import SearchForm from "../features/discovery/search-form";

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

      <SearchForm />

      <footer>Independent proof of concept · Dine-in discovery only</footer>
    </main>
  );
}
