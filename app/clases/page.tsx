import type { Metadata } from 'next';
import ClassDirectory from '../components/ClassDirectory';
export const metadata: Metadata = { title: 'Clases y profesiones', description: 'Explora las 60 profesiones de HispaniaMMO. Filtra por linaje, nivel y rol; descubre sus habilidades y su árbol de evolución.' };
export default function ClasesPage() {
  return <main id="contenido" className="page-shell codex-page"><header className="page-heading"><p className="eyebrow">EL CÓDICE / CLASES</p><h1>Elige tu camino</h1><p>Seis linajes, sesenta profesiones. Encuentra tu lugar en Hispania y conoce las habilidades que llevarás al combate.</p></header><ClassDirectory /></main>;
}
