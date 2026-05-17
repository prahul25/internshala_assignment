import Link from 'next/link';
export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-surface border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className="text-base font-bold font-heading text-primary"
          >
            Internshala
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              About
            </Link>
            <Link
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-xs text-text-tertiary hover:text-text-secondary transition-colors"
            >
              Contact
            </Link>
          </nav>
        </div>
        <p className="text-xs text-text-tertiary">
          &copy; {year} Internshala Clone. For assignment purposes only.
        </p>
      </div>
    </footer>
  );
}
