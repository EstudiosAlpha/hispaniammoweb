import type { Item, Weapon } from '../lib/data';
import { number } from '../lib/codex';
import GameIcon from './GameIcon';

type Props = { kind: 'items'; entry: Item } | { kind: 'weapons'; entry: Weapon };

export default function ItemCard(props: Props) {
  const { entry, kind } = props;
  const weapon = props.kind === 'weapons' ? props.entry : null;
  const item = props.kind === 'items' ? props.entry : null;
  return (
    <article id={entry.slug} className="codex-record item-record">
      <details>
        <summary>
          <GameIcon kind={kind} slug={entry.slug} />
          <span className="record-name">
            <strong>{entry.name}</strong>
            <span className="record-subtitle">{weapon ? weapon.type : item?.category}{entry.grade !== 'Sin grado' ? ` · ${entry.grade}` : ''}</span>
          </span>
          <span className="item-price">{number(entry.sellPrice)} <small>PTAS</small><span>Venta</span></span>
          <span className="record-toggle" aria-hidden="true">+</span>
        </summary>
        <div className="record-detail">
          <p className="record-description">{entry.description}</p>
          <dl className="record-stats">
            {weapon && <>
              <div><dt>Daño físico</dt><dd>{number(weapon.physicalDamage)}</dd></div>
              <div><dt>Daño mágico</dt><dd>{number(weapon.magicalDamage)}</dd></div>
              <div><dt>Velocidad de ataque</dt><dd>{number(weapon.attackSpeed)}</dd></div>
              <div><dt>Crítico</dt><dd>{number(weapon.critical * 100)} %</dd></div>
            </>}
            {item && <>
              <div><dt>Peso</dt><dd>{number(item.weight)}</dd></div>
              <div><dt>Pila máxima</dt><dd>{number(item.maximumStack)}</dd></div>
            </>}
            <div><dt>Compra</dt><dd>{number(entry.buyPrice)} PTAS</dd></div>
            <div><dt>Venta</dt><dd>{number(entry.sellPrice)} PTAS</dd></div>
          </dl>
        </div>
      </details>
    </article>
  );
}
