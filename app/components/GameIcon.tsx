import Image from 'next/image';
import icons from '../data/game-icons.json';
import { asset } from '../lib/assets';

export type GameIconKind = 'skills' | 'items' | 'weapons';

/** Original game art; decorative because the record name is always alongside it. */
export default function GameIcon({ kind, slug }: { kind: GameIconKind; slug: string }) {
  const src = (icons[kind] as Record<string, string>)[slug];
  if (!src) return <span className="game-icon game-icon-missing" aria-hidden="true">?</span>;
  return <Image className="game-icon" src={asset(src)} alt="" width={64} height={64} />;
}
