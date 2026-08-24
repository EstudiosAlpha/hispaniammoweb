import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '../components/Section';
import InteractiveClassTree from '../components/InteractiveClassTree';
import { baseClasses, classes, ROOT_THEME } from '../lib/data';

export const metadata: Metadata = {
  title: 'Árbol de clases interactivo',
  description:
    'Explora de forma interactiva los 6 linajes y las 60 profesiones de HispaniaMMO: elige un linaje, recorre sus ramas y compara estadísticas al instante.',
};

export default function ArbolPage() {
  const masteries = classes.filter((c) => c.tier === 3).length;

  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Árbol interactivo"
        title="Recorre los caminos del reino"
        intro="Elige un linaje, pasa por sus ramas y mira cómo cambian las estadísticas en cada escalón. Todo el árbol de HispaniaMMO en una sola pantalla."
      />

      <div className="mx-auto mt-10 grid max-w-2xl grid-cols-3 gap-6">
        {[
          [baseClasses.length, 'Linajes'],
          [classes.length, 'Profesiones'],
          [masteries, 'Maestrías'],
        ].map(([value, label]) => (
          <div key={String(label)} className="text-center">
            <p className="display gold-text text-3xl">{value}</p>
            <p className="mt-1 text-[10px] tracking-arms text-[var(--muted)]">{label}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <InteractiveClassTree
          classes={classes}
          baseClasses={baseClasses}
          themes={ROOT_THEME}
        />
      </div>

      <section className="panel mt-10 p-7 sm:p-8">
        <div className="grid gap-8 md:grid-cols-3">
          {[
            ['Nivel 20: el primer cruce', 'Tu linaje se abre en tres ramas. Es la decisión que más marca tu forma de jugar.'],
            ['Nivel 40: la especialización', 'La rama se afila y tus atributos dan un salto claro respecto al escalón anterior.'],
            ['Nivel 75: la maestría', 'Dieciocho títulos definitivos, uno por rama. El final de cada camino.'],
          ].map(([title, bodyText]) => (
            <div key={title}>
              <h3 className="display text-[15px] text-[var(--parchment)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--parchment)]/65">{bodyText}</p>
            </div>
          ))}
        </div>
        <div className="rule-gold my-7 opacity-40" />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-[var(--parchment)]/70">
            ¿Prefieres verlo todo en una lista, linaje por linaje?
          </p>
          <Link
            href="/clases"
            className="btn-ghost display rounded-sm px-6 py-3 text-[11px] tracking-[0.18em] uppercase"
          >
            Ver el listado completo
          </Link>
        </div>
      </section>
    </main>
  );
}
