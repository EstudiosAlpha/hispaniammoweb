import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  childrenOf,
  classBySlug,
  classes,
  lineageOf,
  skillByName,
  themeOf,
  TIER_LABEL,
  TIER_LEVEL,
} from '../../lib/data';

export function generateStaticParams() {
  return classes.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cls = classBySlug(slug);
  if (!cls) return { title: 'Clase no encontrada' };
  const title = cls.name + ' — ' + TIER_LABEL[cls.tier] + ' (' + TIER_LEVEL[cls.tier] + ')';
  return {
    title,
    description: cls.description,
    openGraph: { title: title + ' · HispaniaMMO', description: cls.description, images: [] },
    twitter: { title: title + ' · HispaniaMMO', description: cls.description, images: [] },
  };
}

const ATTRS: [keyof ReturnType<typeof attrsOf>, string][] = [
  ['strength', 'Fuerza'],
  ['dexterity', 'Destreza'],
  ['constitution', 'Constitución'],
  ['intelligence', 'Inteligencia'],
  ['wisdom', 'Sabiduría'],
  ['spirit', 'Espíritu'],
];

function attrsOf(s: {
  strength: number; dexterity: number; constitution: number;
  intelligence: number; wisdom: number; spirit: number;
}) {
  return s;
}

function pct(v: number) {
  return Math.round(v * 1000) / 10 + '%';
}

export default async function ClassPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const cls = classBySlug(slug);
  if (!cls) notFound();

  const theme = themeOf(cls.rootSlug);
  const lineage = lineageOf(cls.slug);
  const next = childrenOf(cls.slug);
  const s = cls.stats;
  const g = cls.growth;
  const maxAttr = Math.max(
    s.strength, s.dexterity, s.constitution, s.intelligence, s.wisdom, s.spirit,
  );

  const combat: [string, string][] = [
    ['Ataque físico', String(s.pAtk)],
    ['Ataque mágico', String(s.mAtk)],
    ['Defensa física', String(s.pDef)],
    ['Defensa mágica', String(s.mDef)],
    ['Alcance', s.atkRange + ' m'],
    ['Ataques / s', String(s.atkSpeed)],
    ['Vel. de conjuro', String(s.castSpeed)],
    ['Precisión', pct(s.hit)],
    ['Evasión', pct(s.evasion)],
    ['Prob. crítico', pct(s.crit)],
    ['Daño crítico', 'x' + s.critMult],
  ];

  const growth: [string, number][] = [
    ['Vida', g.healthPerLevel],
    ['Maná', g.manaPerLevel],
    ['Ataque físico', g.physicalAttackPerLevel],
    ['Ataque mágico', g.magicalAttackPerLevel],
    ['Defensa física', g.physicalDefensePerLevel],
    ['Defensa mágica', g.magicalDefensePerLevel],
  ];

  return (
    <main className="mx-auto max-w-6xl px-5 pt-12 sm:px-8">
      <nav className="flex flex-wrap items-center gap-2 text-[11px] tracking-arms text-[var(--muted)]">
        <Link href="/clases" className="transition-colors hover:text-[var(--gold)]">
          Clases
        </Link>
        {lineage.map((step) => (
          <span key={step.slug} className="flex items-center gap-2">
            <span aria-hidden="true" className="opacity-50">
              /
            </span>
            {step.slug === cls.slug ? (
              <span style={{ color: theme.accent }}>{step.name}</span>
            ) : (
              <Link
                href={'/clases/' + step.slug}
                className="transition-colors hover:text-[var(--gold)]"
              >
                {step.name}
              </Link>
            )}
          </span>
        ))}
      </nav>

      <header className="panel panel-riveted relative mt-6 overflow-hidden p-8 sm:p-10">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 55% 100% at 12% 0%, ' + theme.glow + ', transparent 70%)',
          }}
        />
        <div className="relative flex flex-wrap items-start justify-between gap-8">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <span
                className="display rounded-sm border px-3 py-1 text-[11px] tracking-[0.14em] uppercase"
                style={{ borderColor: theme.accent + '66', color: theme.accent }}
              >
                {TIER_LABEL[cls.tier]} · {TIER_LEVEL[cls.tier]}
              </span>
              <span className="rounded-sm border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--muted)]">
                {cls.role}
              </span>
              <span className="rounded-sm border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--muted)]">
                Linaje {cls.root}
              </span>
            </div>
            <h1 className="display gold-text mt-5 text-4xl sm:text-5xl">{cls.name}</h1>
            <p className="mt-5 text-[15px] leading-relaxed text-[var(--parchment)]/80">
              {cls.description}
            </p>
          </div>

          <div className="grid shrink-0 grid-cols-2 gap-5">
            <div className="text-center">
              <p className="display gold-text text-3xl">{s.hp}</p>
              <p className="mt-1 text-[10px] tracking-arms text-[var(--muted)]">Vida</p>
            </div>
            <div className="text-center">
              <p className="display gold-text text-3xl">{s.mp}</p>
              <p className="mt-1 text-[10px] tracking-arms text-[var(--muted)]">Maná</p>
            </div>
          </div>
        </div>
      </header>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.1fr]">
        <div className="panel p-7">
          <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
            Atributos base
          </h2>
          <div className="mt-6 space-y-4">
            {ATTRS.map(([key, label]) => {
              const value = attrsOf(s)[key] as number;
              return (
                <div key={String(key)}>
                  <div className="flex items-baseline justify-between">
                    <span className="text-sm text-[var(--parchment)]/80">{label}</span>
                    <span className="display text-sm" style={{ color: theme.accent }}>
                      {value}
                    </span>
                  </div>
                  <div className="stat-bar mt-1.5 h-1.5 rounded-sm">
                    <span style={{ width: (value / maxAttr) * 100 + '%' }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="panel p-7">
          <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
            Valores de combate
          </h2>
          <dl className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3.5 sm:grid-cols-3">
            {combat.map(([label, value]) => (
              <div key={label} className="border-b border-[var(--line)]/50 pb-2.5">
                <dt className="text-[11px] tracking-wide text-[var(--muted)]">{label}</dt>
                <dd className="display mt-0.5 text-[15px] text-[var(--parchment)]">{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section className="panel mt-6 p-7">
        <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
          Crecimiento por nivel
        </h2>
        <p className="mt-2 text-sm text-[var(--parchment)]/65">
          Lo que ganas cada vez que subes de nivel con esta profesión.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {growth.map(([label, value]) => (
            <div key={label} className="border border-[var(--line)] px-4 py-3.5 text-center">
              <p className="display text-xl" style={{ color: theme.accent }}>
                +{value}
              </p>
              <p className="mt-1 text-[10px] tracking-arms text-[var(--muted)]">{label}</p>
            </div>
          ))}
        </div>
      </section>

      {cls.skills.length > 0 && (
        <section className="panel mt-6 p-7">
          <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
            Habilidades disponibles
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cls.skills.map((name) => {
              const skill = skillByName(name);
              return (
                <Link
                  key={name}
                  href={'/habilidades#' + (skill ? skill.slug : '')}
                  className="card-hover border border-[var(--line)] p-5"
                >
                  <p className="display text-[15px] text-[var(--parchment)]">{name}</p>
                  {skill && (
                    <>
                      <p className="mt-2 text-xs leading-relaxed text-[var(--parchment)]/65">
                        {skill.description}
                      </p>
                      <p className="mt-3 text-[11px] text-[var(--muted)]">
                        {skill.manaCost} MP · {skill.cooldown}s · {skill.range} m
                      </p>
                    </>
                  )}
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <section className="mt-6">
        <div className="panel p-7">
          <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
            Camino de evolución
          </h2>
          <div className="mt-6 space-y-3">
            {lineage.map((step) => {
              const isCurrent = step.slug === cls.slug;
              return (
                <Link
                  key={step.slug}
                  href={'/clases/' + step.slug}
                  className="card-hover flex flex-wrap items-center justify-between gap-4 border px-5 py-4"
                  style={{
                    borderColor: isCurrent ? theme.accent : 'var(--line)',
                    background: isCurrent ? theme.glow.replace('0.35', '0.10') : 'transparent',
                  }}
                >
                  <div className="flex items-center gap-4">
                    <span
                      className="display flex h-9 w-9 items-center justify-center rounded-sm border text-[11px]"
                      style={{ borderColor: theme.accent + '66', color: theme.accent }}
                    >
                      {step.requiredLevel}
                    </span>
                    <div>
                      <p className="display text-[15px] text-[var(--parchment)]">{step.name}</p>
                      <p className="text-[11px] tracking-wide text-[var(--muted)]">
                        {TIER_LABEL[step.tier]} · {step.role}
                      </p>
                    </div>
                  </div>
                  <span className="text-[11px] text-[var(--muted)]">
                    {step.stats.hp} HP · {step.stats.mp} MP · {step.stats.pAtk} Atq. fís.
                  </span>
                </Link>
              );
            })}
          </div>

          {next.length > 0 && (
            <>
              <div className="rule-gold my-7 opacity-50" />
              <h3 className="display text-[12px] tracking-arms text-[var(--gold)]">
                {cls.tier === 0 ? 'Ramas que se abren en nivel 20' : 'Continúa hacia'}
              </h3>
              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {next.map((n) => (
                  <Link
                    key={n.slug}
                    href={'/clases/' + n.slug}
                    className="card-hover border border-[var(--line)] p-5"
                  >
                    <p className="text-[10px] tracking-arms" style={{ color: theme.accent }}>
                      {TIER_LEVEL[n.tier]} · {n.role}
                    </p>
                    <p className="display mt-1.5 text-[15px] text-[var(--parchment)]">{n.name}</p>
                    <p className="mt-2 text-xs leading-relaxed text-[var(--parchment)]/65">
                      {n.description}
                    </p>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  );
}
