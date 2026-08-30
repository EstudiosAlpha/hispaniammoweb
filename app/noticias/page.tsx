import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '../components/Section';
import { categoriaDe, fechaLarga, noticias } from '../lib/noticias';

export const metadata: Metadata = {
  title: 'Noticias',
  description:
    'Actualizaciones, eventos y novedades de desarrollo de HispaniaMMO: asedios, economía, nuevas profesiones y todo lo que cambia en el reino.',
};

export default function NoticiasPage() {
  const [destacada, ...resto] = noticias;

  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Crónicas del reino"
        title="Noticias de Hispania"
        intro="Todo lo que cambia en el reino: nuevas profesiones, eventos que alteran el mundo, ajustes de economía y avances del desarrollo."
      />

      {!destacada ? (
        <p className="panel mt-14 p-10 text-center text-sm text-[var(--parchment)]/70">
          Todavía no hay noticias publicadas. Vuelve pronto.
        </p>
      ) : (
        <>
          {(() => {
            const theme = categoriaDe(destacada.category);
            return (
              <Link
                href={'/noticias/' + destacada.slug}
                className="panel panel-riveted card-hover group relative mt-14 block overflow-hidden p-8 sm:p-10"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-32 opacity-70"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 100% at 50% 0%, ' + theme.glow + ', transparent 70%)',
                  }}
                />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-3">
                    <span
                      className="display rounded-sm border px-3 py-1 text-[10px] tracking-[0.18em] uppercase"
                      style={{ borderColor: theme.accent + '66', color: theme.accent }}
                    >
                      {theme.label}
                    </span>
                    <span className="text-[11px] tracking-arms text-[var(--muted)]">
                      Lo último · {fechaLarga(destacada.date)}
                    </span>
                  </div>

                  <h2 className="display mt-5 max-w-3xl text-2xl leading-snug text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)] sm:text-3xl">
                    {destacada.title}
                  </h2>

                  <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-[var(--parchment)]/70">
                    {destacada.summary}
                  </p>

                  <span className="display mt-7 inline-block text-[11px] tracking-[0.18em] text-[var(--gold)] uppercase">
                    Leer la crónica →
                  </span>
                </div>
              </Link>
            );
          })()}

          {resto.length > 0 && (
            <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {resto.map((noticia) => {
                const theme = categoriaDe(noticia.category);
                return (
                  <Link
                    key={noticia.slug}
                    href={'/noticias/' + noticia.slug}
                    className="panel card-hover group flex flex-col p-7"
                  >
                    <div className="flex flex-wrap items-center gap-3">
                      <span
                        className="display rounded-sm border px-2.5 py-1 text-[10px] tracking-[0.18em] uppercase"
                        style={{ borderColor: theme.accent + '66', color: theme.accent }}
                      >
                        {theme.label}
                      </span>
                      <time
                        dateTime={noticia.date}
                        className="text-[11px] tracking-arms text-[var(--muted)]"
                      >
                        {fechaLarga(noticia.date)}
                      </time>
                    </div>

                    <h3 className="display mt-4 text-lg leading-snug text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)]">
                      {noticia.title}
                    </h3>

                    <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--parchment)]/70">
                      {noticia.summary}
                    </p>

                    <span className="display mt-6 border-t border-[var(--line)] pt-4 text-[11px] tracking-[0.18em] text-[var(--gold)] uppercase">
                      Leer más →
                    </span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      )}

      <section className="panel panel-riveted mt-16 p-8 text-center sm:p-10">
        <h2 className="display gold-text text-2xl sm:text-3xl">
          El reino sigue creciendo
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--parchment)]/70">
          Cada actualización se anuncia aquí antes de llegar a Hispania. Si quieres
          vivirlas de primera mano, crea tu personaje y empieza por la villa.
        </p>
        <Link
          href="/jugar"
          className="btn-gold display mt-8 inline-block rounded-sm px-8 py-3.5 text-[12px] tracking-[0.18em] uppercase"
        >
          Comenzar la aventura
        </Link>
      </section>
    </main>
  );
}
