import { classes, items, mobs, npcs, skills, weapons, type Skill } from './data';
export function normalize(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLocaleLowerCase('es').trim();
}
export function number(value: number) {
  return new Intl.NumberFormat('es-ES', { maximumFractionDigits: 2 }).format(value);
}
export function acquisition(skill: Skill) {
  return skill.slug === 'impetu-de-hispania' ? 'Recompensa de misión' : 'Habilidad inicial';
}
export const searchEntries = [
  ...classes.map(c => ({ name: c.name, category: 'Clase', description: `${c.root} · ${c.role} · Nivel ${c.requiredLevel}`, href: `/clases/${c.slug}`, keywords: `${c.description} ${c.skills.join(' ')}` })),
  ...skills.map(s => ({ name: s.name, category: 'Habilidad', description: s.description, href: `/habilidades#${s.slug}`, keywords: '' })),
  ...mobs.map(m => ({ name: m.name, category: 'Criatura', description: `${m.biome} · Nivel ${m.level}`, href: `/bestiario#${m.slug}`, keywords: m.description })),
  ...items.map(i => ({ name: i.name, category: 'Objeto', description: i.category, href: `/objetos#${i.slug}`, keywords: i.description })),
  ...weapons.map(w => ({ name: w.name, category: 'Arma', description: w.type, href: `/objetos#${w.slug}`, keywords: w.description })),
  ...npcs.map(n => ({ name: n.name, category: 'Habitante', description: n.service, href: '/mundo#npcs', keywords: n.description })),
];
