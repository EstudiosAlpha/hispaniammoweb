'use client';
import { useEffect, useState } from 'react';
import { baseClasses, classes, skills } from '../lib/data';
import { normalize } from '../lib/codex';
import SkillCard from './SkillCard';
import Icon from './Icon';
export default function SkillDirectory() {
  const [query, setQuery] = useState('');
  const [root, setRoot] = useState('all');
  const [selectedHash, setSelectedHash] = useState('');
  useEffect(() => {
    function revealHash() {
      const hash = window.location.hash.slice(1);
      if (skills.some(s => s.slug === hash)) { setSelectedHash(hash); setQuery(''); setRoot('all'); }
    }
    revealHash(); window.addEventListener('hashchange', revealHash);
    return () => window.removeEventListener('hashchange', revealHash);
  }, []);
  useEffect(() => {
    if (selectedHash) {
      const record = document.getElementById(selectedHash);
      const details = record?.querySelector('details');
      if (details) details.open = true;
      record?.scrollIntoView({ block: 'start' });
    }
  }, [selectedHash]);
  const filtered = skills.filter(s => normalize(`${s.name} ${s.description}`).includes(normalize(query)) && (root === 'all' || classes.some(c => c.rootSlug === root && c.skills.includes(s.name)))).sort((a, b) => a.id - b.id);
  return <><div className="filter-bar skill-filter-bar"><label className="search-field"><Icon name="search" size={19} /><span className="sr-only">Buscar habilidad</span><input type="search" value={query} placeholder="Buscar una habilidad…" onChange={e => { setQuery(e.target.value); setSelectedHash(''); }} /></label><label className="select-field"><span>Disponible para</span><select value={root} onChange={e => { setRoot(e.target.value); setSelectedHash(''); }}><option value="all">Todos los linajes</option>{baseClasses.map(c => <option value={c.slug} key={c.slug}>{c.name}</option>)}</select></label></div><p className="results-line" role="status">{filtered.length} {filtered.length === 1 ? 'habilidad encontrada' : 'habilidades encontradas'}</p><div className="skills-grid">{filtered.map(s => <SkillCard key={s.slug} skill={s} showClasses />)}</div>{!filtered.length && <div className="empty-state panel"><h2>No se han encontrado habilidades</h2><p>Prueba con otro nombre o linaje.</p><button className="btn-ghost" onClick={() => { setQuery(''); setRoot('all'); }}>Limpiar filtros</button></div>}</>;
}
