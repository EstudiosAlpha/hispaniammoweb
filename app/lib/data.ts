import raw from '../data/gamedata.json';

export type Stats = {
  strength: number; dexterity: number; constitution: number;
  intelligence: number; wisdom: number; spirit: number;
  hp: number; mp: number; pAtk: number; mAtk: number; pDef: number; mDef: number;
  atkRange: number; atkSpeed: number; castSpeed: number;
  hit: number; evasion: number; crit: number; critMult: number;
};

export type Growth = {
  strengthPerLevel: number; dexterityPerLevel: number; constitutionPerLevel: number;
  intelligencePerLevel: number; wisdomPerLevel: number; spiritPerLevel: number;
  healthPerLevel: number; manaPerLevel: number; physicalAttackPerLevel: number;
  magicalAttackPerLevel: number; physicalDefensePerLevel: number; magicalDefensePerLevel: number;
};

export type GameClass = {
  id: number; slug: string; name: string; description: string;
  tier: number; requiredLevel: number; role: string;
  parent: string | null; parentSlug: string | null;
  root: string; rootSlug: string;
  stats: Stats; growth: Growth; skills: string[];
};

export type Skill = {
  id: number; slug: string; name: string; description: string; level: number;
  target: string; castTime: number; cooldown: number; range: number; radius: number;
  manaCost: number; healthCost: number;
  effects: { type: string; magnitude: number; duration: number; tick: number }[];
};

export type Mob = {
  id: number; slug: string; name: string; description: string; level: number;
  temperament: string; biome: string; faction: string; ai: string;
  maximumHealth: number; maximumMana: number;
  physicalAttack: number; magicalAttack: number;
  physicalDefense: number; magicDefense: number;
  movementSpeed: number; aggroRange: number; attackRange: number;
  experienceReward: number; pesetaReward: number;
  drops: { name: string; probability: number; min: number; max: number }[];
};

export type Item = {
  id: number; slug: string; name: string; description: string;
  category: string; grade: string; weight: number; maximumStack: number;
  buyPrice: number; sellPrice: number;
};

export type Weapon = {
  id: number; slug: string; name: string; description: string;
  type: string; grade: string; physicalDamage: number; magicalDamage: number;
  attackSpeed: number; critical: number; buyPrice: number; sellPrice: number;
};

export type Npc = {
  id: number; slug: string; name: string; description: string; service: string;
};

const data = raw as unknown as {
  classes: GameClass[]; skills: Skill[]; mobs: Mob[];
  items: Item[]; weapons: Weapon[]; npcs: Npc[];
};

/**
 * A few descriptions in the game data are written for the development team
 * rather than for players. We rewrite those for display only, so re-exporting
 * the content from the game keeps working without reintroducing internal
 * wording.
 */
const PLAYER_FACING_DESCRIPTIONS: Record<string, string> = {
  'Ataque básico': 'El golpe fundamental de todo héroe de Hispania. Rápido, fiable y sin coste de maná.',
  'Llama hispana': 'Prende al enemigo con fuego arcano: daño inmediato y una quemadura que sigue consumiéndolo.',
  'Pergamino de encantamiento': 'Pergamino que refuerza una pieza de equipo. Si la suerte falla, el objeto se pierde.',
  'Pergamino bendito': 'Pergamino protegido: si el encantamiento fracasa, tu equipo sobrevive al intento.',
  'Pergamino especial': 'Pergamino reservado a las piezas más valiosas del reino.',
};

function withPlayerCopy<T extends { name: string; description: string }>(entries: T[]): T[] {
  return entries.map((entry) =>
    PLAYER_FACING_DESCRIPTIONS[entry.name]
      ? { ...entry, description: PLAYER_FACING_DESCRIPTIONS[entry.name] }
      : entry,
  );
}

export const classes = withPlayerCopy(data.classes);
export const skills = withPlayerCopy(data.skills);
export const mobs = withPlayerCopy(data.mobs);
export const items = withPlayerCopy(data.items);
export const weapons = withPlayerCopy(data.weapons);
export const npcs = withPlayerCopy(data.npcs);

export const baseClasses = classes
  .filter((c) => c.tier === 0)
  .sort((a, b) => a.id - b.id);

export function classBySlug(slug: string) {
  return classes.find((c) => c.slug === slug);
}

export function childrenOf(slug: string) {
  return classes.filter((c) => c.parentSlug === slug);
}

/** Full 4-tier lineage chains that start at the given base class. */
export function branchesOf(rootSlug: string): GameClass[][] {
  const root = classBySlug(rootSlug);
  if (!root) return [];
  const chains: GameClass[][] = [];
  for (const t1 of childrenOf(root.slug)) {
    for (const t2 of childrenOf(t1.slug)) {
      for (const t3 of childrenOf(t2.slug)) {
        chains.push([root, t1, t2, t3]);
      }
      if (childrenOf(t2.slug).length === 0) chains.push([root, t1, t2]);
    }
  }
  return chains.sort((a, b) => a[1].name.localeCompare(b[1].name, 'es'));
}

/** The ancestry chain leading to a class, root first. */
export function lineageOf(slug: string): GameClass[] {
  const chain: GameClass[] = [];
  let current = classBySlug(slug);
  while (current) {
    chain.unshift(current);
    current = current.parentSlug ? classBySlug(current.parentSlug) : undefined;
  }
  return chain;
}

/** Everything unlocked further down the tree from a class. */
export function descendantsOf(slug: string): GameClass[] {
  const out: GameClass[] = [];
  const walk = (s: string) => {
    for (const child of childrenOf(s)) {
      out.push(child);
      walk(child.slug);
    }
  };
  walk(slug);
  return out;
}

export function skillByName(name: string) {
  return skills.find((s) => s.name === name);
}

export const TIER_LABEL = ['Base', '1.ª profesión', '2.ª profesión', 'Maestría'];
export const TIER_LEVEL = ['Nv. 1', 'Nv. 20', 'Nv. 40', 'Nv. 75'];

/** Distinct visual identity per base archetype. */
export const ROOT_THEME: Record<string, { accent: string; glow: string; label: string; sigil: string }> = {
  infante: { accent: '#c8a24a', glow: 'rgba(200,162,74,0.35)', label: 'Acero y disciplina', sigil: 'I' },
  montaraz: { accent: '#7fa860', glow: 'rgba(127,168,96,0.35)', label: 'Bosque y distancia', sigil: 'M' },
  erudito: { accent: '#7d8fd6', glow: 'rgba(125,143,214,0.35)', label: 'Arcano y ruina', sigil: 'E' },
  picaro: { accent: '#b8654a', glow: 'rgba(184,101,74,0.35)', label: 'Sombra y filo', sigil: 'P' },
  clerigo: { accent: '#cfae7a', glow: 'rgba(207,174,122,0.35)', label: 'Fe y salvación', sigil: 'C' },
  hidalgo: { accent: '#9c7fc4', glow: 'rgba(156,127,196,0.35)', label: 'Honor y mando', sigil: 'H' },
};

export function themeOf(rootSlug: string) {
  return ROOT_THEME[rootSlug] ?? ROOT_THEME.infante;
}
