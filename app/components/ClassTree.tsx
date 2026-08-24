import Link from 'next/link';
import { branchesOf, TIER_LEVEL, themeOf, type GameClass } from '../lib/data';

function Node({ cls, accent }: { cls: GameClass; accent: string }) {
  return (
    <Link
      href={'/clases/' + cls.slug}
      className="panel card-hover group flex min-w-0 flex-1 flex-col justify-center px-4 py-3"
      style={{ borderColor: 'rgba(200,162,74,0.22)' }}
    >
      <span className="text-[10px] tracking-arms" style={{ color: accent }}>
        {TIER_LEVEL[cls.tier]}
      </span>
      <span className="display mt-1 text-[13px] leading-tight text-[var(--parchment)] transition-colors group-hover:text-[var(--gold-bright)]">
        {cls.name}
      </span>
      <span className="mt-1 text-[10px] text-[var(--muted)]">{cls.role}</span>
    </Link>
  );
}

function Arrow({ accent }: { accent: string }) {
  return (
    <span
      aria-hidden="true"
      className="hidden shrink-0 items-center px-1 sm:flex"
      style={{ color: accent }}
    >
      <span className="block h-px w-4" style={{ background: 'currentColor', opacity: 0.6 }} />
      <span
        className="block h-1.5 w-1.5 rotate-45 border-t border-r"
        style={{ borderColor: 'currentColor' }}
      />
    </span>
  );
}

export default function ClassTree({ rootSlug }: { rootSlug: string }) {
  const branches = branchesOf(rootSlug);
  const theme = themeOf(rootSlug);

  return (
    <div className="space-y-4">
      {branches.map((chain) => (
        <div
          key={chain.map((c) => c.slug).join('-')}
          className="flex flex-col gap-2 sm:flex-row sm:items-stretch"
        >
          {chain.slice(1).map((cls, i) => (
            <div key={cls.slug} className="flex min-w-0 flex-1 items-stretch">
              {i > 0 && <Arrow accent={theme.accent} />}
              <Node cls={cls} accent={theme.accent} />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
