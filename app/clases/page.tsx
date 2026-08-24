import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '../components/Section';
import ClassTree from '../components/ClassTree';
import { baseClasses, childrenOf, classes, themeOf } from '../lib/data';

export const metadata: Metadata = {
  title: 'Clases y profesiones',
  description:
    'Los 6 linajes de HispaniaMMO y sus 60 profesiones: cómo evolucionan de nivel 1 a 20, 40 y 75 a través de 18 ramas distintas.',
};

const TIERS = [
  { level: 'Nivel 1', name: 'Clase base', body: 'Eliges tu linaje al crear el personaje. Define tu equipo inicial y tus primeras técnicas.' },
  { level: 'Nivel 20', name: '1.ª profesión', body: 'El linaje se abre en tres ramas. Aquí decides tu papel real: aguantar, golpear o sostener al grupo.' },
  { level: 'Nivel 40', name: '2.ª profesión', body: 'La rama se especializa. Tus atributos dan un salto notable y tu identidad de combate se afila.' },
  { level: 'Nivel 75', name: 'Maestría', body: 'El título definitivo. Dieciocho maestrías únicas, una por cada rama del reino.' },
];

export default function ClasesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Árbol de profesiones"
        title="Seis linajes, dieciocho caminos, sesenta profesiones"
        intro="En HispaniaMMO la progresión se decide en cuatro escalones: nivel 1, 20, 40 y 75. Cada elección es permanente y define cómo te verá el resto del reino."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {TIERS.map((t) => (
          <div key={t.level} className="panel panel-riveted p-6">
            <p className="display text-[11px] tracking-arms text-[var(--gold)]">{t.level}</p>
            <h3 className="display mt-2 text-lg text-[var(--parchment)]">{t.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">{t.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-24 space-y-20">
        {baseClasses.map((root) => {
          const theme = themeOf(root.slug);
          const branchHeads = childrenOf(root.slug);
          const total = classes.filter((c) => c.rootSlug === root.slug).length;

          return (
            <section key={root.slug} id={root.slug} className="scroll-mt-24">
              <div className="flex flex-wrap items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
                <div className="flex items-center gap-5">
                  <span
                    className="display flex h-14 w-14 shrink-0 items-center justify-center border text-xl"
                    style={{
                      borderColor: theme.accent,
                      color: theme.accent,
                      background: 'linear-gradient(180deg, ' + theme.glow + ', transparent)',
                    }}
                  >
                    {theme.sigil}
                  </span>
                  <div>
                    <h2 className="display text-3xl text-[var(--parchment)]">{root.name}</h2>
                    <p className="text-[11px] tracking-arms" style={{ color: theme.accent }}>
                      {theme.label} · {total} profesiones
                    </p>
                  </div>
                </div>
                <Link
                  href={'/clases/' + root.slug}
                  className="btn-ghost display rounded-sm px-5 py-2.5 text-[11px] tracking-[0.18em] uppercase"
                >
                  Ficha completa
                </Link>
              </div>

              <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-[var(--parchment)]/75">
                {root.description}
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {branchHeads.map((b) => (
                  <span
                    key={b.slug}
                    className="display rounded-sm border px-3.5 py-1.5 text-[11px] tracking-[0.14em] uppercase"
                    style={{ borderColor: theme.accent + '55', color: theme.accent }}
                  >
                    {b.name}
                  </span>
                ))}
              </div>

              <div className="mt-8">
                <ClassTree rootSlug={root.slug} />
              </div>
            </section>
          );
        })}
      </div>
    </main>
  );
}
