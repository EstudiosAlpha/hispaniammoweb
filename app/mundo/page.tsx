import type { Metadata } from 'next';
import Link from 'next/link';
import { SectionHeading } from '../components/Section';
import { mobs, npcs } from '../lib/data';

export const metadata: Metadata = {
  title: 'El mundo de Hispania',
  description:
    'Hispania es un único reino continuo: villa, plaza, mercado, fortaleza, caminos reales y tierras salvajes, con zonas seguras, abiertas y de asedio.',
};

const ZONES = [
  {
    name: 'La villa y su plaza',
    rule: 'Zona segura',
    body: 'El corazón del reino. Aquí nacen todos los héroes, junto al mercado y los ocho servicios. El PvP está prohibido: nadie puede atacarte mientras comercias o reparas tu equipo.',
  },
  {
    name: 'Los caminos reales',
    rule: 'Zona abierta',
    body: 'Veinticuatro tramos de camino conectan la villa con la frontera. Los bandidos de la Meseta emboscan aquí, y otros jugadores también pueden hacerlo: el PvP está permitido con sus consecuencias de karma.',
  },
  {
    name: 'La dehesa y la sierra',
    rule: 'Zona abierta',
    body: 'Tierras salvajes donde patrullan lobos ibéricos y jabalíes cantábricos. El terreno de caza natural para subir tus primeros niveles.',
  },
  {
    name: 'Las ruinas de Numancia',
    rule: 'Zona de peligro',
    body: 'El Guardián ancestral custodia las ruinas. Detecta intrusos a 18 metros y guarda el Fragmento numantino, la única reliquia garantizada del reino.',
  },
  {
    name: 'El Castillo de Hispania',
    rule: 'Zona de asedio',
    body: 'Propiedad de un clan, con su propia tesorería e impuestos. Durante los asedios programados se abre el PvP entre bandos, con puertas que caen y objetivos que capturar.',
  },
];

const SERVICE_ORDER = [
  'Mercader',
  'Almacén',
  'Herrero',
  'Misiones',
  'Entrenador',
  'Teleportador',
  'Clanes',
  'Maestre de clases',
];

export default function MundoPage() {
  const orderedNpcs = npcs
    .slice()
    .sort((a, b) => SERVICE_ORDER.indexOf(a.service) - SERVICE_ORDER.indexOf(b.service));

  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="El reino"
        title="Hispania, un mundo sin costuras"
        intro="No hay mapas separados ni pantallas de carga entre regiones. Hispania es un solo territorio continuo donde el servidor decide, metro a metro, qué ves y quién te ve."
      />

      <section className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ZONES.map((z) => (
          <article key={z.name} className="panel panel-riveted card-hover flex flex-col p-7">
            <span className="display self-start rounded-sm border border-[var(--line)] px-3 py-1 text-[10px] tracking-[0.14em] text-[var(--gold)] uppercase">
              {z.rule}
            </span>
            <h2 className="display mt-4 text-xl text-[var(--parchment)]">{z.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--parchment)]/70">
              {z.body}
            </p>
          </article>
        ))}
      </section>

      <section id="npcs" className="mt-24 scroll-mt-24">
        <SectionHeading
          eyebrow="Servicios de la villa"
          title="Ocho oficios que sostienen el reino"
          intro="Cada servicio exige que estés cerca del NPC correspondiente. No puedes vaciar tu almacén desde la otra punta del mapa: Hispania comprueba la distancia antes de abrir la sesión."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {orderedNpcs.map((npc) => (
            <article key={npc.slug} className="panel card-hover p-6">
              <p className="display text-[10px] tracking-arms text-[var(--gold)]">{npc.service}</p>
              <h3 className="display mt-2 text-[15px] leading-snug text-[var(--parchment)]">
                {npc.name}
              </h3>
              <p className="mt-3 text-xs leading-relaxed text-[var(--parchment)]/65">
                {npc.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Eventos vivos"
              title="El reino cambia sin avisar"
              intro="Los eventos mundiales se activan de forma manual, por calendario, por horario o por condiciones del propio mundo."
              align="left"
            />
            <div className="panel mt-8 p-7">
              <h3 className="display text-xl text-[var(--parchment)]">
                Invasión del lobo ibérico
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">
                Las manadas descienden sobre Hispania. El evento define su zona, duración,
                límites de nivel y aforo, umbrales de contribución y multiplicadores de
                experiencia y botín. Participa, aporta y cobra tu recompensa exactamente una vez.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {['Doble experiencia', 'Doble botín', 'Aforo limitado', 'Recompensa por contribución'].map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-[var(--line)] px-3 py-1 text-[11px] text-[var(--gold)]"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="Primeros pasos"
              title="Tu camino empieza en el sendero"
              align="left"
            />
            <div className="panel mt-8 p-7">
              <h3 className="display text-xl text-[var(--parchment)]">
                La amenaza del lobo ibérico
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">
                El Cronista de Hispania te confía la primera gesta del reino: despejar el camino
                de lobos. Al completarla aprendes <strong className="text-[var(--gold)]">Ímpetu de Hispania</strong>,
                una técnica que queda grabada en tu personaje para siempre.
              </p>
              <div className="mt-6 space-y-3">
                {mobs
                  .filter((m) => m.temperament !== 'Jefe')
                  .map((m) => (
                    <Link
                      key={m.slug}
                      href={'/bestiario#' + m.slug}
                      className="flex items-center justify-between border border-[var(--line)] px-4 py-3 transition-colors hover:border-[var(--gold)]/50"
                    >
                      <span className="text-sm text-[var(--parchment)]/85">{m.name}</span>
                      <span className="text-[11px] text-[var(--muted)]">
                        Nv. {m.level} · {m.experienceReward} XP
                      </span>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
