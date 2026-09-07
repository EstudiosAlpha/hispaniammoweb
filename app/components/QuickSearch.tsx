'use client';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { normalize, searchEntries } from '../lib/codex';
import Icon from './Icon';
export default function QuickSearch() {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  function clearSearch() { setQuery(''); inputRef.current?.focus(); }
  const term = normalize(query);
  const results = term ? searchEntries.filter(e => normalize(`${e.name} ${e.description} ${e.keywords}`).includes(term)).sort((a, b) => Number(normalize(b.name).includes(term)) - Number(normalize(a.name).includes(term))) : [];
  return <div className="quick-search">
    <label htmlFor="codex-search" className="sr-only">Buscar en el códice</label>
    <div className="search-field"><Icon name="search" /><input ref={inputRef} id="codex-search" type="search" autoComplete="off" placeholder="Busca una clase, habilidad, criatura…" value={query} onChange={e => setQuery(e.target.value)} onKeyDown={e => { if (e.key === 'Escape') setQuery(''); }} aria-controls={term ? 'search-results' : undefined} />{query ? <button className="icon-button" onClick={clearSearch} aria-label="Limpiar búsqueda"><Icon name="close" size={18} /></button> : <span className="search-hint">El códice del reino</span>}</div>
    {term && <div id="search-results" className="search-results"><p role="status">{results.length} {results.length === 1 ? 'resultado' : 'resultados'}</p>{results.length ? <ul>{results.map(r => <li key={r.href + r.name}><Link href={r.href} onClick={() => setQuery('')}><span><strong>{r.name}</strong><small>{r.description}</small></span><span className="result-category">{r.category}<Icon name="arrow" size={16} /></span></Link></li>)}</ul> : <div className="empty-state">No hay coincidencias. Prueba con «Infante», «Llama» o «Numancia».</div>}</div>}
  </div>;
}
