'use client';
import Link from 'next/link';
import { useEffect, useState, type CSSProperties } from 'react';
import { baseClasses, classes, themeOf, TIER_LABEL, TIER_LEVEL } from '../lib/data';
import { normalize } from '../lib/codex';
import ClassTree from './ClassTree';
import Icon, { CLASS_ICON } from './Icon';

export default function ClassDirectory() {
  const [root, setRoot] = useState('all');
  const [query, setQuery] = useState('');
  const [tier, setTier] = useState('all');
  const [role, setRole] = useState('all');
  const [view, setView] = useState('cards');
  const [limit, setLimit] = useState(12);
  const [hashTarget, setHashTarget] = useState('');
  useEffect(() => {
    function revealLineage() {
      const slug = window.location.hash.slice(1);
      if (baseClasses.some(c => c.slug === slug)) {
        setRoot(slug);
        setView('tree');
        setHashTarget(slug);
      }
    }
    revealLineage();
    window.addEventListener('hashchange', revealLineage);
    return () => window.removeEventListener('hashchange', revealLineage);
  }, []);
  useEffect(() => {
    if (hashTarget && view === 'tree' && root === hashTarget) {
      document.getElementById(hashTarget)?.scrollIntoView({ block: 'start' });
    }
  }, [hashTarget, root, view]);
  const roles = [...new Set(classes.map(c => c.role))].sort((a, b) => a.localeCompare(b, 'es'));
  const filtered = classes.filter(c => (root === 'all' || c.rootSlug === root) && (tier === 'all' || c.tier === Number(tier)) && (role === 'all' || c.role === role) && normalize(`${c.name} ${c.description} ${c.role} ${c.skills.join(' ')}`).includes(normalize(query))).sort((a, b) => a.tier - b.tier || a.name.localeCompare(b.name, 'es'));
  function reset() { setRoot('all'); setQuery(''); setTier('all'); setRole('all'); setLimit(12); }
  return <div className="class-directory">
    <div className="root-filters" role="group" aria-label="Filtrar por linaje"><button aria-pressed={root === 'all'} onClick={() => { setRoot('all'); setLimit(12); }}>Todos los linajes <span>{classes.length}</span></button>{baseClasses.map(c => <button key={c.slug} style={{ '--class-accent': themeOf(c.slug).accent } as CSSProperties} aria-pressed={root === c.slug} onClick={() => { setRoot(c.slug); setLimit(12); }}><Icon name={CLASS_ICON[c.slug]} size={18} />{c.name}</button>)}</div>
    <div className="directory-toolbar"><div className="view-switch" role="group" aria-label="Vista del catálogo"><button aria-pressed={view === 'cards'} onClick={() => setView('cards')}>Fichas de clase</button><button aria-pressed={view === 'tree'} onClick={() => setView('tree')}>Árbol de evolución</button></div><p className="data-note">Nv. 1 <span>→</span> 20 <span>→</span> 40 <span>→</span> 75</p></div>
    {view === 'cards' ? <>
      <div className="filter-bar"><label className="search-field"><Icon name="search" size={19} /><span className="sr-only">Buscar profesión o habilidad</span><input type="search" placeholder="Buscar profesión o habilidad…" value={query} onChange={e => { setQuery(e.target.value); setLimit(12); }} /></label><label className="select-field"><span>Profesión</span><select value={tier} onChange={e => { setTier(e.target.value); setLimit(12); }}><option value="all">Todos los niveles</option>{TIER_LABEL.map((t, i) => <option key={t} value={i}>{t} · {TIER_LEVEL[i]}</option>)}</select></label><label className="select-field"><span>Rol de combate</span><select value={role} onChange={e => { setRole(e.target.value); setLimit(12); }}><option value="all">Todos los roles</option>{roles.map(r => <option key={r}>{r}</option>)}</select></label></div>
      <div className="results-line"><p role="status">{filtered.length} {filtered.length === 1 ? 'profesión encontrada' : 'profesiones encontradas'}</p>{(root !== 'all' || query || tier !== 'all' || role !== 'all') && <button className="text-link" onClick={reset}>Limpiar filtros <Icon name="close" size={14} /></button>}</div>
      {filtered.length ? <div className="profession-grid">{filtered.slice(0, limit).map(c => <Link className="profession-card" href={`/clases/${c.slug}`} key={c.slug} style={{ '--class-accent': themeOf(c.rootSlug).accent } as CSSProperties}><div className="profession-top"><span className="small-emblem"><Icon name={CLASS_ICON[c.rootSlug]} size={22} /></span><span>{c.root} <span>·</span> {TIER_LABEL[c.tier]}</span><strong>Nv. {c.requiredLevel}</strong></div><h2>{c.name}</h2><p className="profession-role">{c.role}</p><p className="profession-description">{c.description}</p><div className="profession-stats"><span><b>{c.stats.hp}</b> Vida</span><span><b>{c.stats.mp}</b> Maná</span><span>{c.skills.length} habilidades</span></div><span className="profession-link">Ver habilidades y evolución <Icon name="arrow" size={17} /></span></Link>)}</div> : <div className="empty-state panel"><Icon name="search" size={30} /><h2>Ninguna profesión coincide</h2><p>Prueba otro nombre o elimina algún filtro.</p><button className="btn-ghost" onClick={reset}>Ver todas las clases</button></div>}
      {filtered.length > limit && <div className="load-more"><p>Mostrando {Math.min(limit, filtered.length)} de {filtered.length}</p><button className="btn-ghost" onClick={() => setLimit(v => v + 12)}>Mostrar más profesiones <span aria-hidden="true">↓</span></button></div>}
    </> : <div className="tree-list">{baseClasses.filter(c => root === 'all' || root === c.slug).map(c => <section className="tree-section" key={c.slug} id={c.slug}><div className="section-topline"><div><p className="eyebrow">LINAJE {c.name.toLocaleUpperCase('es')}</p><h2>{themeOf(c.slug).label}</h2></div><Link className="text-link" href={`/clases/${c.slug}`}>Clase base · Nv. 1 <Icon name="arrow" size={16} /></Link></div><ClassTree rootSlug={c.slug} /></section>)}</div>}
  </div>;
}
