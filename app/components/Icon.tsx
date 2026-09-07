import type { CSSProperties } from 'react';
export type IconName = 'sword' | 'bow' | 'spark' | 'dagger' | 'sun' | 'crown' | 'book' | 'search' | 'arrow' | 'shield' | 'map' | 'bag' | 'close';
const paths: Record<IconName, string[]> = {
  sword: ['m14.5 3.5 6-1-1 6-11 11-5-5 11-11Z', 'm3 13 8 8', 'm6 18-4 4'],
  bow: ['M4 4c10-3 19 6 16 16', 'M4 4 20 20', 'm3 21 17-17', 'M15 4h5v5'],
  spark: ['m12 2 2.8 7.2L22 12l-7.2 2.8L12 22l-2.8-7.2L2 12l7.2-2.8L12 2Z'],
  dagger: ['m15 3 6-1-1 6-10 10-4-4L15 3Z', 'm4 13 7 7', 'm6 18-4 4', 'm11 11 6-6'],
  sun: ['M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z', 'M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5'],
  crown: ['m3 6 4 4 5-7 5 7 4-4-2 13H5L3 6Z', 'M5 15h14'],
  book: ['M12 5c-3-2-6-2-10-1v15c4-1 7-1 10 1 3-2 6-2 10-1V4c-4-1-7-1-10 1Z', 'M12 5v15', 'M5 8h3m-3 4h3m8-4h3m-3 4h3'],
  search: ['M10.5 3a7.5 7.5 0 1 0 0 15 7.5 7.5 0 0 0 0-15Z', 'm16 16 5 5'],
  arrow: ['M4 12h16', 'm14 6 6 6-6 6'],
  shield: ['m12 2 9 4v6c0 5-6 9-9 10-3-1-9-5-9-10V6l9-4Z', 'm8 12 3 3 5-6'],
  map: ['m2 5 6-3 8 3 6-3v17l-6 3-8-3-6 3V5Z', 'M8 2v17M16 5v17'],
  bag: ['M4 7h16l1 14H3L4 7Z', 'M8 7V5a4 4 0 0 1 8 0v2'],
  close: ['m6 6 12 12M6 18 18 6'],
};
export const CLASS_ICON: Record<string, IconName> = { infante: 'sword', montaraz: 'bow', erudito: 'spark', picaro: 'dagger', clerigo: 'sun', hidalgo: 'crown' };
export default function Icon({ name, size = 22, style }: { name: IconName; size?: number; style?: CSSProperties }) {
  return <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={style}>{paths[name].map((d, i) => <path key={i} d={d} />)}</svg>;
}
