export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <a
            href="/"
            className="text-base font-bold font-heading text-primary"
          >
            Internshala
          </a>
          <nav className="flex items-center gap-4">
            <a
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              About
            </a>
            <a
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Privacy
            </a>
            <a
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Terms
            </a>
            <a
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Contact
            </a>
          </nav>
        </div>
        <p className="text-xs text-text-tertiary">
          &copy; {year} Internshala Clone. For educational purposes only.
        </p>
      </div>
    </footer>
  );
}
