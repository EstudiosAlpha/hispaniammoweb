import type { Metadata } from 'next';
import { items, weapons } from '../lib/data';
import ItemCard from '../components/ItemCard';
import RevealHashRecord from '../components/RevealHashRecord';

export const metadata: Metadata = {
  title: 'Objetos y armas',
  description: 'Objetos y armas de HispaniaMMO con sus iconos del juego, estadísticas y precios.',
};

const CATEGORIES = [
  ['Consumible', 'Consumibles'], ['Material', 'Materiales'],
  ['Pergamino', 'Pergaminos'], ['Misión', 'Objetos de misión'],
];
const SLOTS = ['Cabeza', 'Pecho', 'Piernas', 'Guantes', 'Pies', 'Mano principal', 'Mano secundaria', 'Cuello', 'Pendiente I', 'Pendiente II', 'Anillo I', 'Anillo II'];

export default function ObjetosPage() {
  return (
    <main id="contenido" className="page-shell codex-page">
      <header className="page-heading">
        <p className="eyebrow">EL CÓDICE / OBJETOS</p>
        <h1>Objetos y armas</h1>
        <p>Abre un objeto para consultar sus atributos y precios.</p>
      </header>
      <RevealHashRecord />
      <section className="item-category" aria-labelledby="weapons-heading">
        <h2 id="weapons-heading">Armas <span>{weapons.length}</span></h2>
        <div className="item-records">
          {[...weapons].sort((a, b) => a.id - b.id).map(entry => <ItemCard key={entry.slug} kind="weapons" entry={entry} />)}
        </div>
      </section>
      {CATEGORIES.map(([category, label]) => {
        const entries = items.filter(item => item.category === category);
        if (!entries.length) return null;
        return (
          <section className="item-category" key={category}>
            <h2>{label} <span>{entries.length}</span></h2>
            <div className="item-records">{entries.map(entry => <ItemCard key={entry.slug} kind="items" entry={entry} />)}</div>
          </section>
        );
      })}
      <details className="inventory-guide">
        <summary>Equipo y encantamiento <span aria-hidden="true">+</span></summary>
        <div>
          <h2>12 ranuras de equipo</h2>
          <p>{SLOTS.join(' · ')}</p>
          <p>El peso total limita lo que puedes seguir recogiendo.</p>
          <h2>Encantamiento con el Herrero</h2>
          <ul>
            <li><strong>Pergamino de encantamiento:</strong> al fallar, el objeto se pierde.</li>
            <li><strong>Pergamino bendito:</strong> el objeto sobrevive y vuelve a su nivel seguro.</li>
            <li><strong>Pergamino especial:</strong> reglas propias para piezas de alto valor.</li>
          </ul>
        </div>
      </details>
    </main>
  );
}
