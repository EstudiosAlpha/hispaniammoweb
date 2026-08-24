import type { Metadata } from 'next';
import { SectionHeading } from '../components/Section';
import { classes, skills } from '../lib/data';

export const metadata: Metadata = {
  title: 'Habilidades',
  description:
    'Todas las habilidades de HispaniaMMO con sus costes de maná, tiempos de lanzamiento, alcance y efectos reales.',
};

const ACQUISITION: Record<string, string> = {
  'Ataque básico': 'Inicial',
  'Llama hispana': 'Inicial',
  'Flecha serrana': 'Inicial',
  'Luz de Numancia': 'Inicial',
  'Ímpetu de Hispania': 'Recompensa de misión',
};

export default function HabilidadesPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Grimorio del reino"
        title="El grimorio de Hispania"
        intro="Coste de maná, tiempo de lanzamiento, enfriamiento, alcance y efectos. Estos son los valores exactos con los que se juega, sin redondeos ni aproximaciones."
      />

      <div className="mt-14 grid gap-6 lg:grid-cols-2">
        {skills
          .slice()
          .sort((a, b) => a.id - b.id)
          .map((skill) => {
            const users = classes.filter((c) => c.skills.includes(skill.name));
            const baseUsers = users.filter((c) => c.tier === 0);
            return (
              <article
                key={skill.slug}
                id={skill.slug}
                className="panel panel-riveted card-hover scroll-mt-24 p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="display text-xl text-[var(--parchment)]">{skill.name}</h2>
                    <p className="mt-1 text-[11px] tracking-arms text-[var(--gold)]">
                      {skill.target} · {ACQUISITION[skill.name] ?? 'Entrenador'}
                    </p>
                  </div>
                  <span className="display shrink-0 rounded-sm border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--muted)]">
                    Nv. {skill.level}
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-[var(--parchment)]/75">
                  {skill.description}
                </p>

                <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-3 sm:grid-cols-4">
                  {[
                    ['Maná', skill.manaCost],
                    ['Lanzamiento', skill.castTime + ' s'],
                    ['Enfriamiento', skill.cooldown + ' s'],
                    ['Alcance', skill.range + ' m'],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="border-b border-[var(--line)]/50 pb-2">
                      <dt className="text-[10px] tracking-arms text-[var(--muted)]">{label}</dt>
                      <dd className="display mt-0.5 text-[15px] text-[var(--parchment)]">
                        {value}
                      </dd>
                    </div>
                  ))}
                </dl>

                {skill.effects.length > 0 && (
                  <div className="mt-6">
                    <p className="text-[10px] tracking-arms text-[var(--gold)]">Efectos</p>
                    <ul className="mt-3 space-y-2">
                      {skill.effects.map((e, i) => (
                        <li
                          key={i}
                          className="flex items-center justify-between border border-[var(--line)] px-4 py-2.5"
                        >
                          <span className="text-sm text-[var(--parchment)]/85">{e.type}</span>
                          <span className="text-[11px] text-[var(--muted)]">
                            x{e.magnitude}
                            {e.duration > 0 ? ' · ' + e.duration + ' s' : ''}
                            {e.tick > 0 ? ' · cada ' + e.tick + ' s' : ''}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {baseUsers.length > 0 && (
                  <div className="mt-6 border-t border-[var(--line)] pt-4">
                    <p className="text-[10px] tracking-arms text-[var(--muted)]">
                      Linajes que la usan
                    </p>
                    <p className="mt-2 text-sm text-[var(--parchment)]/75">
                      {baseUsers.map((u) => u.name).join(' · ')}
                    </p>
                  </div>
                )}
              </article>
            );
          })}
      </div>

      <section className="panel mt-10 p-8">
        <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
          Cómo se aprenden
        </h2>
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {[
            ['Iniciales', 'Vienen contigo al crear el personaje, según el linaje que elijas.'],
            ['Recompensa de misión', 'Se desbloquean al completar gestas, como Ímpetu de Hispania tras proteger el camino inicial.'],
            ['Entrenador', 'La Maestra de armas de Hispania enseña técnicas al alcanzar el nivel y la clase requeridos.'],
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
