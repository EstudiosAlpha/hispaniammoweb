import type { Metadata } from 'next';
import { SectionHeading } from '../components/Section';

export const metadata: Metadata = {
  title: 'Sistemas de juego',
  description:
    'Grupos, clanes, alianzas, PvP con karma, comercio, tiendas offline, castillos y asedios: todos los sistemas jugables de HispaniaMMO.',
};

const SYSTEMS = [
  {
    id: 'grupos',
    name: 'Grupos',
    tagline: 'Hasta nueve compañeros',
    body: 'Invita, expulsa, cede el liderazgo y reparte el botín con cuatro políticas: por turnos, aleatorio, para el líder o barra libre. La experiencia se reparte de forma exacta entre quienes estén a menos de 50 metros del combate.',
    points: ['Nueve miembros', 'Cuatro políticas de botín', 'Crédito compartido de misiones', 'Chat de grupo'],
  },
  {
    id: 'clanes',
    name: 'Clanes',
    tagline: 'Tu casa en Hispania',
    body: 'Funda un clan con su emblema, rangos y permisos. Sube su nivel, acumula reputación, comparte un almacén común y declara guerras a otros clanes. Un clan puede poseer el Castillo de Hispania.',
    points: ['Rangos y permisos', 'Almacén de clan', 'Guerras entre clanes', 'Habilidades de clan'],
  },
  {
    id: 'alianzas',
    name: 'Alianzas',
    tagline: 'Cuando un clan no basta',
    body: 'Varios clanes se unen bajo un clan líder. Las alianzas definen los bandos de un asedio y comparten canal de comunicación propio.',
    points: ['Clan líder', 'Invitaciones persistentes', 'Bandos de asedio', 'Chat de alianza'],
  },
  {
    id: 'pvp',
    name: 'PvP y karma',
    tagline: 'Cada muerte deja huella',
    body: 'En zona segura nadie puede tocarte. En zona abierta sí, y las consecuencias son reales: matar a un inocente te marca como asesino y hunde tu karma. Los compañeros de clan y las guerras activas tienen sus propias reglas.',
    points: ['Zonas seguras y abiertas', 'Marca de asesino', 'Karma persistente', 'Guerras de clan'],
  },
  {
    id: 'economia',
    name: 'Economía en pesetas',
    tagline: 'La moneda del reino: PTAS',
    body: 'Compra y vende con el Mercader, intercambia directamente con otros jugadores con doble confirmación, y monta una tienda que sigue vendiendo aunque cierres sesión. Cada movimiento queda auditado en un libro mayor.',
    points: ['Comercio entre jugadores', 'Tiendas offline', 'Impuestos de castillo', 'Registro auditado'],
  },
  {
    id: 'tiendas',
    name: 'Tiendas offline',
    tagline: 'Vende mientras duermes',
    body: 'Deja hasta ocho lotes en venta con su precio y su mensaje. Tu mercancía queda en depósito, otros jugadores compran mientras estás desconectado y al volver te espera el resumen de ventas.',
    points: ['Ocho lotes', 'Depósito seguro', 'Compras simultáneas serializadas', 'Resumen al reconectar'],
  },
  {
    id: 'castillos',
    name: 'Castillo de Hispania',
    tagline: 'Poder con presupuesto',
    body: 'El clan propietario fija un impuesto de entre el 0% y el 10% sobre las compras del Mercader. Ese dinero entra en la tesorería del castillo y solo quien tenga autoridad puede retirarlo. Todo movimiento queda auditado.',
    points: ['Propiedad de clan', 'Impuesto 0-10%', 'Tesorería auditada', 'Conquista transferible'],
  },
  {
    id: 'asedios',
    name: 'Asedios',
    tagline: 'La corona se gana peleando',
    body: 'Los asedios se anuncian por calendario. Los clanes se registran en un bando, las puertas tienen vida propia, hay objetivos que capturar y puntos de reaparición por bando. Al terminar, el castillo cambia de dueño de verdad.',
    points: ['Calendario y registro', 'Puertas con vida', 'Objetivos que capturar', 'Transferencia de propiedad'],
  },
  {
    id: 'misiones',
    name: 'Misiones',
    tagline: 'Nueve tipos de gesta',
    body: 'Cazar, recolectar, hablar, explorar, escoltar, defender, derrotar jefes, entregar encargos y cadenas de varias etapas. Con requisitos de nivel, clase, misiones previas y objetos.',
    points: ['Nueve tipos', 'Requisitos encadenados', 'Recompensas de habilidad', 'Diario persistente'],
  },
];

export default function SistemasPage() {
  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Sistemas de juego"
        title="Un reino con reglas que se cumplen"
        intro="Todo lo que sigue está resuelto en el servidor: si Hispania no lo aprueba, no ocurre. Ni el daño, ni la moneda, ni la conquista de un castillo."
      />

      <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SYSTEMS.map((sys) => (
          <article
            key={sys.id}
            id={sys.id}
            className="panel panel-riveted card-hover flex scroll-mt-24 flex-col p-7"
          >
            <p className="display text-[10px] tracking-arms text-[var(--gold)]">{sys.tagline}</p>
            <h2 className="display mt-2 text-xl text-[var(--parchment)]">{sys.name}</h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-[var(--parchment)]/70">
              {sys.body}
            </p>
            <ul className="mt-6 space-y-2 border-t border-[var(--line)] pt-4">
              {sys.points.map((p) => (
                <li key={p} className="flex items-center gap-2.5 text-[12px] text-[var(--muted)]">
                  <span
                    aria-hidden="true"
                    className="h-1 w-1 shrink-0 rotate-45 bg-[var(--gold)]"
                  />
                  {p}
                </li>
              ))}
            </ul>
          </article>
        ))}
      </div>

      <section className="panel panel-riveted mt-12 p-8 sm:p-10">
        <SectionHeading
          eyebrow="Bajo el capó"
          title="Por qué el servidor manda"
          align="left"
        />
        <div className="mt-8 grid gap-8 md:grid-cols-3">
          {[
            ['Nada se decide en tu equipo', 'Tu cliente pide moverse o atacar; Hispania comprueba rutas, alcance, línea de visión y enfriamientos antes de aceptar.'],
            ['Nada se duplica', 'Cada objeto existe en un único sitio. Las compras simultáneas se ponen en cola y una operación repetida devuelve el resultado original.'],
            ['Nada se pierde', 'Tu posición, vida, inventario, monedero y progreso se guardan de forma atómica y sobreviven a cualquier desconexión.'],
          ].map(([title, bodyText]) => (
            <div key={title}>
              <h3 className="display text-lg text-[var(--parchment)]">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">{bodyText}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
