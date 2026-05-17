'use client';

import Link from 'next/dist/client/link';
import { useState } from 'react';
import ThemeToggle from './ThemeToggle';

const navLinks = [
  { label: 'Internships', href: '#', active: true },
  { label: 'Courses', href: '#', active: false },
  { label: 'Jobs', href: '#', active: false },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-surface border-b border-border shadow-xs">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        <div className="flex items-center gap-10">
          <Link href="/" className="text-xl font-bold font-heading text-primary">
            Internshala
          </Link>
          <ul className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    link.active
                      ? 'text-primary'
                      : 'text-text-secondary hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <button className="text-sm font-semibold text-text-primary px-4 py-2 rounded-lg hover:bg-ghost transition-colors duration-200">
            Login
          </button>
          <button className="text-sm font-semibold text-white bg-primary px-5 py-2 rounded-lg hover:bg-primary-dark transition-colors duration-200">
            Register
          </button>
        </div>

        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${
              menuOpen ? 'rotate-45 translate-y-2' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-opacity duration-200 ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`block w-6 h-0.5 bg-text-primary transition-transform duration-200 ${
              menuOpen ? '-rotate-45 -translate-y-2' : ''
            }`}
          />
        </button>
      </nav>

      {menuOpen && (
        <div className="md:hidden border-t border-border bg-surface animate-slide-down">
          <div className="px-4 py-4 space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`block text-sm font-medium py-2 ${
                  link.active ? 'text-primary' : 'text-text-secondary'
                }`}
              >
                {link.label}
              </a>
            ))}
            <hr className="border-border" />
            <div className="flex justify-center">
              <ThemeToggle />
            </div>
            <button className="w-full text-sm font-semibold text-text-primary px-4 py-2.5 rounded-lg border border-border hover:bg-ghost transition-colors duration-200">
              Login
            </button>
            <button className="w-full text-sm font-semibold text-white bg-primary px-4 py-2.5 rounded-lg hover:bg-primary-dark transition-colors duration-200">
              Register
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
