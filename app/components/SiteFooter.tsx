import Link from 'next/link';
import { asset } from '../lib/assets';

const COLUMNS = [
  {
    title: 'El juego',
    links: [
      { href: '/clases', label: 'Clases y profesiones' },
      { href: '/habilidades', label: 'Habilidades' },
      { href: '/sistemas', label: 'Sistemas de juego' },
    ],
  },
  {
    title: 'Hispania',
    links: [
      { href: '/mundo', label: 'El mundo' },
      { href: '/bestiario', label: 'Bestiario' },
      { href: '/objetos', label: 'Objetos y armas' },
    ],
  },
  {
    title: 'Comunidad',
    links: [
      { href: '/noticias', label: 'Noticias del reino' },
      { href: '/jugar', label: 'Cómo empezar' },
      { href: '/mundo#npcs', label: 'Servicios de Hispania' },
      { href: '/sistemas#asedios', label: 'Asedios de castillo' },
    ],
  },
];

export default function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-[var(--line)] bg-[rgba(9,8,7,0.75)]">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_repeat(3,1fr)]">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset('/logo.png')} alt="HispaniaMMO" className="h-10 w-auto" />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-[var(--muted)]">
              Un MMORPG ambientado en una Hispania medieval y fantástica: seis linajes,
              sesenta profesiones y un reino por conquistar.
            </p>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h3 className="display text-[12px] tracking-arms text-[var(--gold)]">{col.title}</h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[var(--parchment)]/70 transition-colors hover:text-[var(--gold-bright)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="rule-gold mt-12 opacity-40" />
        <p className="mt-6 text-center text-xs tracking-wide text-[var(--muted)]">
          HispaniaMMO — proyecto en desarrollo. Todos los datos mostrados provienen del
          contenido real del juego.
        </p>
      </div>
    </footer>
  );
}
