import type { ReactNode } from 'react';

export function SectionHeading({
  eyebrow,
  title,
  intro,
  align = 'center',
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  align?: 'center' | 'left';
}) {
  const centered = align === 'center';
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && (
        <p className="display text-[11px] tracking-arms text-[var(--gold)]">{eyebrow}</p>
      )}
      <h2 className="display gold-text mt-3 text-3xl leading-tight sm:text-4xl">{title}</h2>
      <div className={`rule-gold mt-5 ${centered ? 'mx-auto w-28' : 'w-24'}`} />
      {intro && (
        <p className="mt-5 text-[15px] leading-relaxed text-[var(--parchment)]/75">{intro}</p>
      )}
    </div>
  );
}

export function Stat({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="text-center">
      <div className="display gold-text text-3xl sm:text-4xl">{value}</div>
      <div className="mt-1.5 text-[11px] tracking-arms text-[var(--muted)]">{label}</div>
    </div>
  );
}

export function Pill({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-[var(--line)] bg-[rgba(200,162,74,0.07)] px-3 py-1 text-[11px] tracking-wide text-[var(--gold)]">
      {children}
    </span>
  );
}
