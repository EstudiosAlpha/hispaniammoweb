import type { Metadata } from 'next';
import SkillDirectory from '../components/SkillDirectory';
export const metadata: Metadata = { title: 'Habilidades', description: 'Consulta qué hace cada habilidad de HispaniaMMO, sus efectos, costes, alcance y las clases que pueden usarla.' };
export default function HabilidadesPage() {
  return <main id="contenido" className="page-shell codex-page"><header className="page-heading"><p className="eyebrow">EL CÓDICE / HABILIDADES</p><h1>Conoce tus habilidades</h1><p>Cada técnica cuenta. Consulta sus efectos, cuánto maná consume y cuándo puedes volver a usarla.</p></header><SkillDirectory /><aside className="catalog-note"><strong>Un grimorio en crecimiento</strong><p>Estas son las cinco habilidades registradas en el contenido actual del juego. Las profesiones comparten técnicas; sus descripciones de rol no implican que todas sus habilidades estén ya disponibles.</p></aside></main>;
}
