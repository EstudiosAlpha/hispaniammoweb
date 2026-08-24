import Link from 'next/link';
import { SectionHeading, Stat } from './components/Section';
import { baseClasses, classes, mobs, npcs, skills, themeOf } from './lib/data';

const PILLARS = [
  {
    title: 'Servidor autoritativo',
    body: 'Cada golpe, ruta y moneda se resuelve en el servidor. El cliente solo representa lo que Hispania ya ha decidido.',
  },
  {
    title: 'Progresión en cuatro escalones',
    body: 'Nivel 1, 20, 40 y 75. Seis linajes se abren en tres ramas cada uno hasta alcanzar una maestría única.',
  },
  {
    title: 'Clanes, alianzas y asedios',
    body: 'Funda un clan, teje alianzas y toma el Castillo de Hispania en asedios con puertas, objetivos y conquista real.',
  },
  {
    title: 'Economía viva en pesetas',
    body: 'Comercio entre jugadores, tiendas offline persistentes, impuestos de castillo y un libro mayor que audita todo.',
  },
];

const WORLD_POINTS: [string, string][] = [
  [
    'Zonas seguras, abiertas y de asedio',
    'Las reglas de PvP cambian según dónde pises: la villa protege, el camino no.',
  ],
  [
    'Ocho servicios en la villa',
    'Mercader, almacén, herrero, cronista, maestra de armas, portador de caminos, custodio de clanes y maestre de clases.',
  ],
  [
    'Eventos vivos',
    'La Invasión del lobo ibérico altera el mundo con recompensas y multiplicadores temporales.',
  ],
];

export default function Home() {
  const masteries = classes.filter((c) => c.tier === 3).length;

  return (
    <main>
      <section className="relative overflow-hidden">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(200,162,74,0.20), transparent 65%)',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-24 text-center sm:px-8 sm:pt-28 sm:pb-32">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/logo.jpg"
            alt="HispaniaMMO"
            className="mx-auto w-full max-w-2xl mix-blend-screen drop-shadow-[0_10px_40px_rgba(200,162,74,0.28)]"
          />

          <p className="display mt-8 text-[12px] tracking-arms text-[var(--gold)]">
            El reino espera a sus héroes
          </p>

          <h1 className="display mt-5 text-2xl leading-snug text-[var(--parchment)] sm:text-[34px]">
            Forja tu leyenda en una{' '}
            <span className="gold-text">Hispania medieval y fantástica</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-[var(--parchment)]/70 sm:text-base">
            Lobos ibéricos que acechan la dehesa, bandidos que emboscan los caminos reales
            y un Guardián ancestral que custodia las ruinas de Numancia. Elige tu linaje,
            domina tu profesión y reclama el Castillo de Hispania.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/clases"
              className="btn-gold display rounded-sm px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
            >
              Explorar las clases
            </Link>
            <Link
              href="/mundo"
              className="btn-ghost display rounded-sm px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
            >
              Conocer Hispania
            </Link>
          </div>

          <div className="mx-auto mt-16 grid max-w-3xl grid-cols-2 gap-8 sm:grid-cols-4">
            <Stat label="Linajes" value={baseClasses.length} />
            <Stat label="Profesiones" value={classes.length} />
            <Stat label="Maestrías" value={masteries} />
            <Stat label="Nivel máximo" value="75" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <SectionHeading
          eyebrow="Los seis linajes"
          title="Elige la sangre que correrá por tus venas"
          intro="Cada linaje comienza en el nivel 1 y se abre en tres ramas al alcanzar el nivel 20. Ninguna decisión es menor: define tu papel en el campo de batalla hasta la maestría de nivel 75."
        />

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {baseClasses.map((cls) => {
            const theme = themeOf(cls.slug);
            const branches = classes.filter((c) => c.parentSlug === cls.slug);
            return (
              <Link
                key={cls.slug}
                href={'/clases/' + cls.slug}
                className="panel panel-riveted card-hover group relative flex flex-col p-7"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-x-0 top-0 h-24 opacity-60"
                  style={{
                    background:
                      'radial-gradient(ellipse 60% 100% at 50% 0%, ' +
                      theme.glow +
                      ', transparent 70%)',
                  }}
                />
                <div className="relative flex items-center gap-4">
                  <span
                    className="display flex h-12 w-12 shrink-0 items-center justify-center border text-lg"
                    style={{
                      borderColor: theme.accent,
                      color: theme.accent,
                      background: 'linear-gradient(180deg, ' + theme.glow + ', transparent)',
                    }}
                  >
                    {theme.sigil}
                  </span>
                  <div>
                    <h3 className="display text-xl text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)]">
                      {cls.name}
                    </h3>
                    <p className="text-[11px] tracking-arms" style={{ color: theme.accent }}>
                      {theme.label}
                    </p>
                  </div>
                </div>

                <p className="relative mt-5 flex-1 text-sm leading-relaxed text-[var(--parchment)]/70">
                  {cls.description}
                </p>

                <div className="relative mt-6 flex flex-wrap gap-1.5">
                  {branches.map((b) => (
                    <span
                      key={b.slug}
                      className="rounded-sm border border-[var(--line)] px-2.5 py-1 text-[11px] text-[var(--muted)]"
                    >
                      {b.name}
                    </span>
                  ))}
                </div>

                <div className="relative mt-6 flex items-center justify-between border-t border-[var(--line)] pt-4">
                  <span className="text-[11px] tracking-arms text-[var(--muted)]">
                    {cls.stats.hp} HP · {cls.stats.mp} MP
                  </span>
                  <span className="display text-[11px] tracking-[0.18em] text-[var(--gold)] uppercase">
                    Ver árbol →
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[rgba(16,14,12,0.5)]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <SectionHeading
            eyebrow="Qué hace distinto a HispaniaMMO"
            title="Un reino que no perdona el descuido"
          />
          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <article key={p.title} className="panel card-hover p-6">
                <div className="display gold-text text-2xl">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="display mt-3 text-lg text-[var(--parchment)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">
                  {p.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="El mundo"
              title="Hispania es un único reino continuo"
              intro="Sin pantallas de carga entre regiones. La plaza, el mercado, la fortaleza, los caminos reales y las tierras salvajes forman un solo mapa donde el servidor decide quién ve qué y cuándo."
              align="left"
            />
            <ul className="mt-8 space-y-4">
              {WORLD_POINTS.map(([title, bodyText]) => (
                <li key={title} className="flex gap-4">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--gold)]" />
                  <div>
                    <p className="display text-[15px] text-[var(--parchment)]">{title}</p>
                    <p className="mt-1 text-sm leading-relaxed text-[var(--parchment)]/65">
                      {bodyText}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <Link
              href="/mundo"
              className="btn-ghost display mt-9 inline-block rounded-sm px-6 py-3 text-[12px] tracking-[0.18em] uppercase"
            >
              Recorrer el mundo
            </Link>
          </div>

          <div className="panel panel-riveted p-8">
            <h3 className="display text-[12px] tracking-arms text-[var(--gold)]">
              Amenazas conocidas
            </h3>
            <div className="mt-6 space-y-4">
              {mobs
                .slice()
                .sort((a, b) => a.level - b.level)
                .map((m) => (
                  <Link
                    key={m.slug}
                    href={'/bestiario#' + m.slug}
                    className="flex items-center justify-between border-b border-[var(--line)]/60 pb-4 last:border-0 last:pb-0"
                  >
                    <div>
                      <p className="display text-[15px] text-[var(--parchment)]">{m.name}</p>
                      <p className="text-xs text-[var(--muted)]">
                        {m.biome} · {m.temperament}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="display text-sm text-[var(--gold)]">Nv. {m.level}</p>
                      <p className="text-xs text-[var(--muted)]">{m.maximumHealth} HP</p>
                    </div>
                  </Link>
                ))}
            </div>
            <div className="mt-7 grid grid-cols-3 gap-4 border-t border-[var(--line)] pt-6 text-center">
              <div>
                <p className="display gold-text text-xl">{npcs.length}</p>
                <p className="text-[10px] tracking-arms text-[var(--muted)]">Servicios</p>
              </div>
              <div>
                <p className="display gold-text text-xl">{skills.length}</p>
                <p className="text-[10px] tracking-arms text-[var(--muted)]">Habilidades</p>
              </div>
              <div>
                <p className="display gold-text text-xl">1</p>
                <p className="text-[10px] tracking-arms text-[var(--muted)]">Raid Boss</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 pb-8 sm:px-8">
        <div className="panel panel-riveted relative overflow-hidden px-8 py-16 text-center">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(200,162,74,0.18), transparent 70%)',
            }}
          />
          <div className="relative">
            <h2 className="display gold-text text-3xl sm:text-4xl">
              Hispania necesita quien la defienda
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--parchment)]/70">
              Crea tu personaje, elige entre seis linajes y empieza tu camino en la villa.
              El primer lobo ya te está esperando en el camino.
            </p>
            <Link
              href="/jugar"
              className="btn-gold display mt-9 inline-block rounded-sm px-8 py-4 text-[12px] tracking-[0.18em] uppercase"
            >
              Comenzar la aventura
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
