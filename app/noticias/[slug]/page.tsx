import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  categoriaDe,
  fechaLarga,
  noticiaBySlug,
  noticias,
  vecinasDe,
} from '../../lib/noticias';

export function generateStaticParams() {
  return noticias.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const noticia = noticiaBySlug(slug);
  if (!noticia) return { title: 'Noticia no encontrada' };
  return {
    title: noticia.title,
    description: noticia.summary,
    openGraph: {
      type: 'article',
      title: noticia.title + ' · HispaniaMMO',
      description: noticia.summary,
      publishedTime: noticia.date,
    },
    twitter: { title: noticia.title + ' · HispaniaMMO', description: noticia.summary },
  };
}

export default async function NoticiaPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const noticia = noticiaBySlug(slug);
  if (!noticia) notFound();

  const theme = categoriaDe(noticia.category);
  const { masReciente, masAntigua } = vecinasDe(noticia.slug);

  return (
    <main className="mx-auto max-w-3xl px-5 pt-16 sm:px-8">
      <Link
        href="/noticias"
        className="display text-[11px] tracking-[0.18em] text-[var(--muted)] uppercase transition-colors hover:text-[var(--gold-bright)]"
      >
        ← Todas las noticias
      </Link>

      <article className="mt-8">
        <header>
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="display rounded-sm border px-3 py-1 text-[10px] tracking-[0.18em] uppercase"
              style={{ borderColor: theme.accent + '66', color: theme.accent }}
            >
              {theme.label}
            </span>
            <time dateTime={noticia.date} className="text-[11px] tracking-arms text-[var(--muted)]">
              {fechaLarga(noticia.date)}
            </time>
          </div>

          <h1 className="display gold-text mt-5 text-3xl leading-tight sm:text-4xl">
            {noticia.title}
          </h1>
          <div className="rule-gold mt-6 w-28" />
          <p className="mt-6 text-[17px] leading-relaxed text-[var(--parchment)]/80">
            {noticia.summary}
          </p>
        </header>

        <div className="mt-10 space-y-6">
          {noticia.body.map((parrafo) => (
            <p key={parrafo.slice(0, 48)} className="text-[15px] leading-relaxed text-[var(--parchment)]/75">
              {parrafo}
            </p>
          ))}
        </div>

        {noticia.highlights && noticia.highlights.length > 0 && (
          <aside className="panel panel-riveted mt-10 p-7">
            <h2 className="display text-[11px] tracking-arms text-[var(--gold)]">
              En resumen
            </h2>
            <ul className="mt-5 space-y-3">
              {noticia.highlights.map((punto) => (
                <li key={punto} className="flex gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--gold)]" />
                  <span className="text-sm leading-relaxed text-[var(--parchment)]/75">{punto}</span>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </article>

      {(masReciente || masAntigua) && (
        <nav className="mt-14 grid gap-4 border-t border-[var(--line)] pt-8 sm:grid-cols-2">
          {masAntigua ? (
            <Link href={'/noticias/' + masAntigua.slug} className="panel card-hover group p-6">
              <p className="display text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                ← Noticia anterior
              </p>
              <p className="display mt-3 text-[15px] leading-snug text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)]">
                {masAntigua.title}
              </p>
            </Link>
          ) : (
            <span />
          )}

          {masReciente && (
            <Link
              href={'/noticias/' + masReciente.slug}
              className="panel card-hover group p-6 sm:text-right"
            >
              <p className="display text-[10px] tracking-[0.18em] text-[var(--muted)] uppercase">
                Noticia siguiente →
              </p>
              <p className="display mt-3 text-[15px] leading-snug text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)]">
                {masReciente.title}
              </p>
            </Link>
          )}
        </nav>
      )}
    </main>
  );
}
