import type { Metadata } from 'next';
import { SectionHeading } from '../components/Section';
import { mobs } from '../lib/data';

export const metadata: Metadata = {
  title: 'Bestiario',
  description:
    'Las criaturas de Hispania: lobos ibéricos, jabalíes cantábricos, bandidos de la Meseta y el Guardián de Numancia, con estadísticas y botín reales.',
};

const TEMPERAMENT_NOTE: Record<string, string> = {
  Pasivo: 'No ataca salvo que lo provoques.',
  Defensivo: 'Responde con violencia si invades su territorio.',
  Agresivo: 'Ataca en cuanto te detecta y pide ayuda a los suyos.',
  Jefe: 'Raid Boss: anuncio global, ventana de reaparición y botín único.',
};

export default function BestiarioPage() {
  const sorted = mobs.slice().sort((a, b) => a.level - b.level);

  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Bestiario de Hispania"
        title="Lo que acecha más allá de la villa"
        intro="Cada criatura tiene su propio temperamento, radio de agresividad, facción y comportamiento. Unas te ignoran, otras te persiguen en cuanto te ven, y algunas llaman a los suyos para acabar contigo."
      />

      <div className="mt-14 space-y-6">
        {sorted.map((mob) => {
          const isBoss = mob.temperament === 'Jefe';
          return (
            <article
              key={mob.slug}
              id={mob.slug}
              className="panel panel-riveted card-hover relative scroll-mt-24 overflow-hidden p-7 sm:p-8"
            >
              {isBoss && (
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0"
                  style={{
                    background:
                      'radial-gradient(ellipse 50% 100% at 10% 0%, rgba(156,127,196,0.20), transparent 70%)',
                  }}
                />
              )}
              <div className="relative grid gap-8 lg:grid-cols-[1.1fr_1.4fr]">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className="display rounded-sm border px-3 py-1 text-[11px] tracking-[0.14em] uppercase"
                      style={{
                        borderColor: isBoss ? 'rgba(156,127,196,0.6)' : 'var(--line)',
                        color: isBoss ? '#b79ee0' : 'var(--gold)',
                      }}
                    >
                      {isBoss ? 'Raid Boss' : mob.temperament}
                    </span>
                    <span className="rounded-sm border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--muted)]">
                      {mob.biome}
                    </span>
                    <span className="rounded-sm border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--muted)]">
                      {mob.faction}
                    </span>
                  </div>

                  <h2 className="display mt-4 text-2xl text-[var(--parchment)] sm:text-3xl">
                    {mob.name}
                  </h2>
                  <p className="display mt-1 text-[13px] text-[var(--gold)]">Nivel {mob.level}</p>

                  <p className="mt-4 text-sm leading-relaxed text-[var(--parchment)]/75">
                    {mob.description}
                  </p>
                  <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/60">
                    {TEMPERAMENT_NOTE[mob.temperament]}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-6">
                    <div>
                      <p className="display gold-text text-2xl">{mob.experienceReward}</p>
                      <p className="text-[10px] tracking-arms text-[var(--muted)]">Experiencia</p>
                    </div>
                    <div>
                      <p className="display gold-text text-2xl">{mob.pesetaReward}</p>
                      <p className="text-[10px] tracking-arms text-[var(--muted)]">Pesetas</p>
                    </div>
                    <div>
                      <p className="display gold-text text-2xl">{mob.ai}</p>
                      <p className="text-[10px] tracking-arms text-[var(--muted)]">Perfil de IA</p>
                    </div>
                  </div>
                </div>

                <div>
                  <p className="text-[10px] tracking-arms text-[var(--gold)]">Estadísticas</p>
                  <dl className="mt-4 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-3">
                    {[
                      ['Vida', mob.maximumHealth],
                      ['Maná', mob.maximumMana],
                      ['Ataque físico', mob.physicalAttack],
                      ['Ataque mágico', mob.magicalAttack],
                      ['Defensa física', mob.physicalDefense],
                      ['Defensa mágica', mob.magicDefense],
                      ['Velocidad', mob.movementSpeed],
                      ['Radio de aggro', mob.aggroRange + ' m'],
                      ['Alcance', mob.attackRange + ' m'],
                    ].map(([label, value]) => (
                      <div key={String(label)} className="border-b border-[var(--line)]/50 pb-2">
                        <dt className="text-[10px] tracking-wide text-[var(--muted)]">{label}</dt>
                        <dd className="display mt-0.5 text-[15px] text-[var(--parchment)]">
                          {value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  {mob.drops.length > 0 && (
                    <div className="mt-6">
                      <p className="text-[10px] tracking-arms text-[var(--gold)]">Botín</p>
                      <ul className="mt-3 space-y-2">
                        {mob.drops.map((d) => (
                          <li
                            key={d.name}
                            className="flex items-center justify-between border border-[var(--line)] px-4 py-2.5"
                          >
                            <span className="text-sm text-[var(--parchment)]/85">{d.name}</span>
                            <span className="text-[11px] text-[var(--muted)]">
                              {Math.round(d.probability * 100)}%
                              {d.max > 1 ? ' · ' + d.min + '-' + d.max : ''}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <section className="panel mt-10 p-8">
        <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
          Cómo se comportan
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            ['Tabla de odio', 'Recuerdan quién les ha hecho más daño y cambian de objetivo de forma determinista.'],
            ['Asistencia por facción', 'Los aliados cercanos acuden en su ayuda si comparten facción.'],
            ['Correa y regreso', 'Si te alejas demasiado, abandonan la persecución y vuelven a su puesto.'],
            ['Reaparición', 'Cada criatura tiene su ventana: de 20-30 segundos a 5-8 minutos para el Guardián.'],
          ].map(([title, bodyText]) => (
            <div key={title}>
              <h3 className="display text-[15px] text-[var(--parchment)]">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--parchment)]/65">{bodyText}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
