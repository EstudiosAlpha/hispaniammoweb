'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

const NAV = [
  { href: '/clases', label: 'Clases' },
  { href: '/habilidades', label: 'Habilidades' },
  { href: '/bestiario', label: 'Bestiario' },
  { href: '/mundo', label: 'Mundo' },
  { href: '/objetos', label: 'Objetos' },
  { href: '/sistemas', label: 'Sistemas' },
];

export default function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // The menu closes from the link handlers below rather than from an effect,
  // which keeps navigation from triggering an extra render pass.
  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? 'border-[var(--line)] bg-[rgba(11,10,9,0.92)] backdrop-blur-md'
          : 'border-transparent bg-[rgba(11,10,9,0.55)] backdrop-blur-sm'
      }`}
    >
      <div className="mx-auto flex h-[74px] max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-3" aria-label="HispaniaMMO — inicio">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="HispaniaMMO"
            className="h-9 w-auto mix-blend-screen sm:h-10"
          />
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV.map((item) => {
            const active = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`display px-3.5 py-2 text-[13px] tracking-[0.14em] uppercase transition-colors ${
                  active
                    ? 'text-[var(--gold-bright)]'
                    : 'text-[var(--parchment)]/75 hover:text-[var(--gold-bright)]'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/jugar"
            className="btn-gold display hidden rounded-sm px-5 py-2.5 text-[12px] tracking-[0.18em] uppercase sm:inline-block"
          >
            Jugar
          </Link>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Abrir menú"
            className="btn-ghost flex h-10 w-10 items-center justify-center rounded-sm lg:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all ${
                  open ? 'top-1.5 rotate-45' : 'top-0'
                }`}
              />
              <span
                className={`absolute top-1.5 left-0 h-px w-full bg-current transition-opacity ${
                  open ? 'opacity-0' : 'opacity-100'
                }`}
              />
              <span
                className={`absolute left-0 h-px w-full bg-current transition-all ${
                  open ? 'top-1.5 -rotate-45' : 'top-3'
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-[var(--line)] bg-[rgba(11,10,9,0.97)] px-5 py-3 lg:hidden">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="display block border-b border-[var(--line)]/50 py-3 text-sm tracking-[0.14em] text-[var(--parchment)] uppercase last:border-0"
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/jugar"
            onClick={() => setOpen(false)}
            className="btn-gold display mt-4 block rounded-sm py-3 text-center text-[12px] tracking-[0.18em] uppercase"
          >
            Jugar
          </Link>
        </nav>
      )}
    </header>
  );
}
