import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '../components/Section';
import { baseClasses, themeOf } from '../lib/data';

export const metadata: Metadata = {
  title: 'Cómo empezar',
  description:
    'Crea tu personaje en HispaniaMMO, elige entre seis linajes y da tus primeros pasos en la villa de Hispania.',
};

const STEPS = [
  {
    n: '01',
    title: 'Crea tu cuenta',
    body: 'El acceso viaja cifrado y tu contraseña nunca se guarda en claro. Si se te cae la conexión, vuelves a entrar sin escribirla otra vez.',
  },
  {
    n: '02',
    title: 'Elige tu linaje',
    body: 'Seis puntos de partida, cada uno con su equipo inicial y sus técnicas. Personaliza el aspecto de tu héroe y dale nombre.',
  },
  {
    n: '03',
    title: 'Despierta en la villa',
    body: 'Apareces junto a la plaza, rodeado de los ocho servicios. El Cronista tiene tu primera gesta preparada.',
  },
  {
    n: '04',
    title: 'Toma el camino',
    body: 'Limpia el sendero de lobos ibéricos, gana tu primera habilidad de misión y decide hacia dónde crecer al llegar al nivel 20.',
  },
];

export default function JugarPage() {
  return (
    <main className="mx-auto max-w-6xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Primeros pasos"
        title="Tu leyenda empieza en cuatro pasos"
        intro="HispaniaMMO está en desarrollo activo. Así será tu llegada al reino cuando cruces las puertas por primera vez."
      />

      <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s) => (
          <article key={s.n} className="panel panel-riveted card-hover p-7">
            <p className="display gold-text text-3xl">{s.n}</p>
            <h2 className="display mt-3 text-lg text-[var(--parchment)]">{s.title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">{s.body}</p>
          </article>
        ))}
      </div>

      <section className="mt-20">
        <SectionHeading
          eyebrow="Decisión inicial"
          title="¿Qué sangre elegirás?"
          intro="Tu linaje marca cómo empiezas, pero no te encierra: en el nivel 20 se abren tres caminos muy distintos para cada uno."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {baseClasses.map((cls) => {
            const theme = themeOf(cls.slug);
            return (
              <Link
                key={cls.slug}
                href={'/clases/' + cls.slug}
                className="panel card-hover group flex items-center gap-4 p-5"
              >
                <span
                  className="display flex h-11 w-11 shrink-0 items-center justify-center border text-base"
                  style={{
                    borderColor: theme.accent,
                    color: theme.accent,
                    background: 'linear-gradient(180deg, ' + theme.glow + ', transparent)',
                  }}
                >
                  {theme.sigil}
                </span>
                <div className="min-w-0">
                  <p className="display text-[15px] text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)]">
                    {cls.name}
                  </p>
                  <p className="truncate text-[11px] text-[var(--muted)]">{theme.label}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="panel panel-riveted relative mt-16 overflow-hidden px-8 py-14 text-center">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 60% 100% at 50% 0%, rgba(200,162,74,0.18), transparent 70%)',
          }}
        />
        <div className="relative">
          <h2 className="display gold-text text-3xl">El reino aún se está forjando</h2>
          <p className="mx-auto mt-5 max-w-xl text-[15px] leading-relaxed text-[var(--parchment)]/70">
            HispaniaMMO se construye pieza a pieza: el mundo, el combate, los clanes, los
            asedios y la economía ya laten. Mientras tanto, explora todo lo que te espera.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              href="/clases"
              className="btn-gold display rounded-sm px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
            >
              Ver las 60 profesiones
            </Link>
            <Link
              href="/sistemas"
              className="btn-ghost display rounded-sm px-7 py-3.5 text-[12px] tracking-[0.18em] uppercase"
            >
              Conocer los sistemas
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
