import type { Metadata } from 'next';
import SkillDirectory from '../components/SkillDirectory';
export const metadata: Metadata = { title: 'Habilidades', description: 'Consulta qué hace cada habilidad de HispaniaMMO, sus efectos, costes, alcance y las clases que pueden usarla.' };
export default function HabilidadesPage() {
  return <main id="contenido" className="page-shell codex-page"><header className="page-heading"><p className="eyebrow">EL CÓDICE / HABILIDADES</p><h1>Habilidades</h1><p>Consulta cada técnica y abre su ficha para ver los efectos.</p></header><SkillDirectory /><aside className="catalog-note"><p>5 habilidades registradas. El contenido se ampliará con el desarrollo del juego.</p></aside></main>;
}
