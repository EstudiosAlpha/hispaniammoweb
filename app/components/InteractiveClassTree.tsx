'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';
import type { GameClass } from '../lib/data';

type Theme = { accent: string; glow: string; label: string; sigil: string };

type Props = {
  classes: GameClass[];
  baseClasses: GameClass[];
  themes: Record<string, Theme>;
};

const TIER_LABEL = ['Base', '1.ª profesión', '2.ª profesión', 'Maestría'];
const TIER_LEVEL = ['Nivel 1', 'Nivel 20', 'Nivel 40', 'Nivel 75'];

export default function InteractiveClassTree({ classes, baseClasses, themes }: Props) {
  const [rootSlug, setRootSlug] = useState(baseClasses[0]?.slug ?? '');
  const [selectedSlug, setSelectedSlug] = useState(baseClasses[0]?.slug ?? '');

  const bySlug = useMemo(() => {
    const map = new Map<string, GameClass>();
    for (const c of classes) map.set(c.slug, c);
    return map;
  }, [classes]);

  const childrenOf = useMemo(() => {
    const map = new Map<string, GameClass[]>();
    for (const c of classes) {
      if (!c.parentSlug) continue;
      const list = map.get(c.parentSlug) ?? [];
      list.push(c);
      map.set(c.parentSlug, list);
    }
    return map;
  }, [classes]);

  const root = bySlug.get(rootSlug);
  const theme = themes[rootSlug] ?? Object.values(themes)[0];
  const selected = bySlug.get(selectedSlug) ?? root;

  // Every full path from the base class down to a mastery.
  const branches = useMemo(() => {
    if (!root) return [] as GameClass[][];
    const chains: GameClass[][] = [];
    for (const t1 of childrenOf.get(root.slug) ?? []) {
      for (const t2 of childrenOf.get(t1.slug) ?? []) {
        for (const t3 of childrenOf.get(t2.slug) ?? []) {
          chains.push([t1, t2, t3]);
        }
      }
    }
    return chains.sort((a, b) => a[0].name.localeCompare(b[0].name, 'es'));
  }, [root, childrenOf]);

  // Ancestors + descendants of the selection, used to light up the active path.
  const highlighted = useMemo(() => {
    const set = new Set<string>();
    if (!selected) return set;
    let cursor: GameClass | undefined = selected;
    while (cursor) {
      set.add(cursor.slug);
      cursor = cursor.parentSlug ? bySlug.get(cursor.parentSlug) : undefined;
    }
    const walk = (slug: string) => {
      for (const child of childrenOf.get(slug) ?? []) {
        set.add(child.slug);
        walk(child.slug);
      }
    };
    walk(selected.slug);
    return set;
  }, [selected, bySlug, childrenOf]);

  function selectRoot(slug: string) {
    setRootSlug(slug);
    setSelectedSlug(slug);
  }

  if (!root || !selected) return null;

  return (
    <div>
      {/* Lineage switcher */}
      <div
        role="tablist"
        aria-label="Elige un linaje"
        className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-6"
      >
        {baseClasses.map((base) => {
          const t = themes[base.slug];
          const active = base.slug === rootSlug;
          return (
            <button
              key={base.slug}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => selectRoot(base.slug)}
              className="panel card-hover flex items-center gap-3 px-4 py-3 text-left"
              style={{
                borderColor: active ? t.accent : 'var(--line)',
                background: active
                  ? 'linear-gradient(180deg, ' + t.glow + ', transparent)'
                  : undefined,
              }}
            >
              <span
                className="display flex h-9 w-9 shrink-0 items-center justify-center border text-sm"
                style={{ borderColor: t.accent, color: t.accent }}
              >
                {t.sigil}
              </span>
              <span className="min-w-0">
                <span
                  className="display block truncate text-[14px]"
                  style={{ color: active ? t.accent : 'var(--parchment)' }}
                >
                  {base.name}
                </span>
                <span className="block truncate text-[10px] text-[var(--muted)]">
                  {t.label}
                </span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[1.55fr_1fr]">
        {/* Tree */}
        <div className="panel panel-riveted p-5 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 className="display text-lg text-[var(--parchment)]">
              Árbol del {root.name}
            </h2>
            <p className="text-[11px] tracking-arms text-[var(--muted)]">
              Toca una profesión
            </p>
          </div>

          {/* Base node */}
          <button
            type="button"
            onClick={() => setSelectedSlug(root.slug)}
            aria-pressed={selectedSlug === root.slug}
            className="card-hover mt-5 flex w-full items-center gap-4 border px-5 py-4 text-left"
            style={{
              borderColor: selectedSlug === root.slug ? theme.accent : 'var(--line)',
              background:
                selectedSlug === root.slug
                  ? 'linear-gradient(180deg, ' + theme.glow + ', transparent)'
                  : undefined,
            }}
          >
            <span
              className="display flex h-10 w-10 shrink-0 items-center justify-center border text-sm"
              style={{ borderColor: theme.accent, color: theme.accent }}
            >
              1
            </span>
            <span>
              <span className="display block text-[15px] text-[var(--parchment)]">
                {root.name}
              </span>
              <span className="block text-[11px] text-[var(--muted)]">
                Nivel 1 · punto de partida
              </span>
            </span>
          </button>

          {/* Branches */}
          <div className="mt-3 space-y-2.5">
            {branches.map((chain) => (
              <div
                key={chain.map((c) => c.slug).join('-')}
                className="flex flex-col gap-2 sm:flex-row sm:items-stretch sm:gap-0"
              >
                {chain.map((cls, i) => {
                  const isSelected = cls.slug === selectedSlug;
                  const isLit = highlighted.has(cls.slug);
                  return (
                    <div key={cls.slug} className="flex min-w-0 flex-1 items-stretch">
                      {i > 0 && (
                        <span
                          aria-hidden="true"
                          className="hidden shrink-0 items-center px-1.5 sm:flex"
                          style={{ color: theme.accent, opacity: isLit ? 0.9 : 0.3 }}
                        >
                          <span className="block h-px w-3" style={{ background: 'currentColor' }} />
                          <span
                            className="block h-1.5 w-1.5 rotate-45 border-t border-r"
                            style={{ borderColor: 'currentColor' }}
                          />
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={() => setSelectedSlug(cls.slug)}
                        onMouseEnter={() => setSelectedSlug(cls.slug)}
                        onFocus={() => setSelectedSlug(cls.slug)}
                        aria-pressed={isSelected}
                        className="card-hover min-w-0 flex-1 border px-4 py-3 text-left"
                        style={{
                          borderColor: isSelected
                            ? theme.accent
                            : isLit
                              ? theme.accent + '66'
                              : 'var(--line)',
                          background: isSelected
                            ? 'linear-gradient(180deg, ' + theme.glow + ', transparent)'
                            : undefined,
                          opacity: isLit ? 1 : 0.55,
                        }}
                      >
                        <span
                          className="block text-[10px] tracking-arms"
                          style={{ color: theme.accent }}
                        >
                          {TIER_LEVEL[cls.tier]}
                        </span>
                        <span className="display mt-0.5 block truncate text-[13px] text-[var(--parchment)]">
                          {cls.name}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] text-[var(--muted)]">
                          {cls.role}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        {/* Detail panel */}
        <aside className="panel panel-riveted h-fit p-7 lg:sticky lg:top-24">
          <p className="display text-[11px] tracking-arms" style={{ color: theme.accent }}>
            {TIER_LABEL[selected.tier]} · {TIER_LEVEL[selected.tier]}
          </p>
          <h2 className="display gold-text mt-2 text-2xl">{selected.name}</h2>
          <p className="mt-1 text-[11px] tracking-arms text-[var(--muted)]">{selected.role}</p>

          <p className="mt-4 text-sm leading-relaxed text-[var(--parchment)]/75">
            {selected.description}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="border border-[var(--line)] px-4 py-3 text-center">
              <p className="display text-xl" style={{ color: theme.accent }}>
                {selected.stats.hp}
              </p>
              <p className="mt-0.5 text-[10px] tracking-arms text-[var(--muted)]">Vida</p>
            </div>
            <div className="border border-[var(--line)] px-4 py-3 text-center">
              <p className="display text-xl" style={{ color: theme.accent }}>
                {selected.stats.mp}
              </p>
              <p className="mt-0.5 text-[10px] tracking-arms text-[var(--muted)]">Maná</p>
            </div>
          </div>

          <dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-2.5">
            {[
              ['Ataque físico', selected.stats.pAtk],
              ['Ataque mágico', selected.stats.mAtk],
              ['Defensa física', selected.stats.pDef],
              ['Defensa mágica', selected.stats.mDef],
              ['Fuerza', selected.stats.strength],
              ['Destreza', selected.stats.dexterity],
              ['Constitución', selected.stats.constitution],
              ['Inteligencia', selected.stats.intelligence],
            ].map(([label, value]) => (
              <div key={String(label)} className="border-b border-[var(--line)]/50 pb-1.5">
                <dt className="text-[10px] tracking-wide text-[var(--muted)]">{label}</dt>
                <dd className="display mt-0.5 text-sm text-[var(--parchment)]">{value}</dd>
              </div>
            ))}
          </dl>

          <Link
            href={'/clases/' + selected.slug}
            className="btn-gold display mt-7 block rounded-sm py-3 text-center text-[11px] tracking-[0.18em] uppercase"
          >
            Ver ficha completa
          </Link>
        </aside>
      </div>
    </div>
  );
}
