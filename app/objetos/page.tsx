import type { Metadata } from 'next';
import { SectionHeading } from '../components/Section';
import { items, weapons } from '../lib/data';

export const metadata: Metadata = {
  title: 'Objetos y armas',
  description:
    'Armas iniciales, materiales, consumibles y pergaminos de encantamiento de HispaniaMMO, con pesos, precios y grados reales.',
};

const SLOTS = [
  'Cabeza', 'Pecho', 'Piernas', 'Guantes', 'Pies', 'Mano principal',
  'Mano secundaria', 'Cuello', 'Pendiente I', 'Pendiente II', 'Anillo I', 'Anillo II',
];

export default function ObjetosPage() {
  const byCategory = (name: string) => items.filter((i) => i.category === name);
  const materials = byCategory('Material');
  const consumables = byCategory('Consumible');
  const scrolls = byCategory('Pergamino');
  const questItems = byCategory('Misión');

  return (
    <main className="mx-auto max-w-7xl px-5 pt-16 sm:px-8">
      <SectionHeading
        eyebrow="Arsenal e inventario"
        title="Todo lo que puedes empuñar, cargar y encantar"
        intro="El peso importa, las pilas tienen límite y cada objeto vive en un único lugar del mundo: tu mochila, tu almacén, el suelo o el depósito de una tienda. El servidor garantiza que nunca se duplique."
      />

      <section className="mt-14">
        <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">Armas</h2>
        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {weapons
            .slice()
            .sort((a, b) => a.id - b.id)
            .map((w) => (
              <article key={w.slug} className="panel panel-riveted card-hover p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="display text-lg leading-snug text-[var(--parchment)]">
                    {w.name}
                  </h3>
                  <span className="display shrink-0 rounded-sm border border-[var(--line)] px-2.5 py-1 text-[10px] text-[var(--gold)]">
                    {w.grade}
                  </span>
                </div>
                <p className="mt-1 text-[11px] tracking-arms text-[var(--muted)]">{w.type}</p>
                <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">
                  {w.description}
                </p>
                <dl className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2.5">
                  {[
                    ['Daño físico', w.physicalDamage],
                    ['Daño mágico', w.magicalDamage],
                    ['Vel. ataque', w.attackSpeed],
                    ['Crítico', Math.round(w.critical * 1000) / 10 + '%'],
                  ].map(([label, value]) => (
                    <div key={String(label)} className="border-b border-[var(--line)]/50 pb-1.5">
                      <dt className="text-[10px] tracking-wide text-[var(--muted)]">{label}</dt>
                      <dd className="display mt-0.5 text-sm text-[var(--parchment)]">{value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-4 text-[11px] text-[var(--muted)]">
                  Compra {w.buyPrice} PTAS · Venta {w.sellPrice} PTAS
                </p>
              </article>
            ))}
        </div>
      </section>

      {[
        ['Consumibles', consumables],
        ['Materiales', materials],
        ['Pergaminos de encantamiento', scrolls],
        ['Reliquias de misión', questItems],
      ]
        .filter(([, list]) => (list as typeof items).length > 0)
        .map(([title, list]) => (
          <section key={String(title)} className="mt-16">
            <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">{title}</h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(list as typeof items).map((i) => (
                <article key={i.slug} className="panel card-hover p-5">
                  <div className="flex items-start justify-between gap-2">
                    <h3 className="display text-[15px] leading-snug text-[var(--parchment)]">
                      {i.name}
                    </h3>
                    {i.grade !== 'Sin grado' && (
                      <span className="display shrink-0 rounded-sm border border-[var(--line)] px-2 py-0.5 text-[10px] text-[var(--gold)]">
                        {i.grade}
                      </span>
                    )}
                  </div>
                  <p className="mt-2.5 text-xs leading-relaxed text-[var(--parchment)]/65">
                    {i.description}
                  </p>
                  <p className="mt-4 text-[11px] text-[var(--muted)]">
                    Peso {i.weight} · Pila máx. {i.maximumStack}
                  </p>
                  {(i.buyPrice > 0 || i.sellPrice > 0) && (
                    <p className="mt-1 text-[11px] text-[var(--muted)]">
                      Venta {i.sellPrice} PTAS
                    </p>
                  )}
                </article>
              ))}
            </div>
          </section>
        ))}

      <section className="mt-20 grid gap-6 lg:grid-cols-2">
        <div className="panel p-8">
          <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
            Doce ranuras de equipo
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">
            Tu personaje equipa hasta doce piezas simultáneas. El peso total que cargas afecta
            a lo que puedes seguir recogiendo.
          </p>
          <div className="mt-6 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
            {SLOTS.map((slot) => (
              <span
                key={slot}
                className="border border-[var(--line)] px-3 py-2 text-center text-[11px] text-[var(--parchment)]/75"
              >
                {slot}
              </span>
            ))}
          </div>
        </div>

        <div className="panel p-8">
          <h2 className="display text-[12px] tracking-arms text-[var(--gold)]">
            Encantamiento con el Herrero
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-[var(--parchment)]/70">
            El Herrero de Hispania autoriza cada intento. Los tres tipos de pergamino aplican
            políticas de fallo distintas, y la tirada la hace el servidor.
          </p>
          <div className="mt-6 space-y-3">
            {[
              ['Pergamino de encantamiento', 'Al fallar, el objeto se pierde. El riesgo clásico.'],
              ['Pergamino bendito', 'Al fallar, el objeto sobrevive y vuelve a su nivel seguro.'],
              ['Pergamino especial', 'Política propia para piezas de alto valor.'],
            ].map(([name, note]) => (
              <div key={name} className="border border-[var(--line)] px-4 py-3">
                <p className="display text-sm text-[var(--parchment)]">{name}</p>
                <p className="mt-1 text-xs text-[var(--parchment)]/65">{note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
