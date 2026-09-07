import Link from 'next/link';
import type { CSSProperties } from 'react';
import QuickSearch from './components/QuickSearch';
import Icon, { CLASS_ICON } from './components/Icon';
import { baseClasses, classes, skills, mobs, items, weapons, themeOf } from './lib/data';
import { noticias, fechaCorta } from './lib/noticias';
import { asset } from './lib/assets';
export default function Home() {
  return <main id="contenido">
    <section className="codex-hero">
      <div className="hero-art" style={{ backgroundImage: `url(${asset('/images/hispania-hero.webp')})` }} aria-hidden="true" />
      <div className="page-shell hero-content">
        <p className="eyebrow"><span className="little-diamond" /> GUÍA DEL AVENTURERO</p>
        <h1>Todo gran héroe<br />empieza con <em>una elección.</em></h1>
        <p className="hero-description">Conoce tus habilidades. Encuentra tu camino.<br className="desktop-break" /> Descubre el mundo de Hispania.</p>
        <QuickSearch />
        <div className="hero-caption"><span className="status-dot" /> HispaniaMMO <span>·</span> Un reino en desarrollo</div>
      </div>
    </section>
    <div className="codex-nav-wrap"><nav className="page-shell codex-nav" aria-label="Explorar el códice">
      <Link href="/clases"><Icon name="sword" /><span>Clases <small>{classes.length}</small></span><Icon name="arrow" size={16} /></Link>
      <Link href="/habilidades"><Icon name="book" /><span>Habilidades <small>{skills.length}</small></span><Icon name="arrow" size={16} /></Link>
      <Link href="/bestiario"><Icon name="shield" /><span>Bestiario <small>{mobs.length}</small></span><Icon name="arrow" size={16} /></Link>
      <Link href="/objetos"><Icon name="bag" /><span>Objetos <small>{items.length + weapons.length}</small></span><Icon name="arrow" size={16} /></Link>
      <Link href="/mundo"><Icon name="map" /><span>El mundo</span><Icon name="arrow" size={16} /></Link>
    </nav></div>
    <section className="page-shell section-space" id="linajes">
      <div className="section-topline"><div><p className="eyebrow">SEIS ORÍGENES. TU PROPIA HISTORIA.</p><h2 className="section-title">Encuentra tu linaje</h2></div><Link className="text-link" href="/clases">Todas las profesiones <Icon name="arrow" size={18} /></Link></div>
      <p className="section-intro">Del primer combate a la maestría. Descubre qué hace única a cada clase.</p>
      <div className="lineage-grid">{baseClasses.map((cls, i) => <Link href={`/clases/${cls.slug}`} className="lineage-card" key={cls.slug} style={{ '--class-accent': themeOf(cls.slug).accent, '--card-index': i } as CSSProperties}><span className="lineage-number">0{i + 1}</span><span className="class-emblem"><Icon name={CLASS_ICON[cls.slug]} size={32} /></span><h3>{cls.name}</h3><p>{themeOf(cls.slug).label}</p><span className="lineage-card-bottom">{classes.filter(c => c.rootSlug === cls.slug).length} profesiones<Icon name="arrow" size={16} /></span></Link>)}</div>
    </section>
    <section className="page-shell journal-section">
      <div className="journey-panel"><p className="eyebrow">EL CAMINO DEL HÉROE</p><h2>Tu leyenda no termina<br />en la primera elección.</h2><p>Tu linaje se abre en tres ramas. Especialízate y alcanza una de las 18 maestrías de Hispania.</p><div className="level-track">{['1', '20', '40', '75'].map((level, i) => <div key={level}><span>{level}</span><small>{['Origen', 'Profesión', 'Especialidad', 'Maestría'][i]}</small></div>)}</div><Link className="text-link" href="/clases">Explorar las evoluciones <Icon name="arrow" size={18} /></Link></div>
      <div className="journal"><div className="section-topline"><h2>Crónicas del reino</h2><Link className="text-link" href="/noticias">Ver todas <Icon name="arrow" size={16} /></Link></div>{noticias.slice(0, 3).map(n => <Link className="journal-entry" href={`/noticias/${n.slug}`} key={n.slug}><span><time dateTime={n.date}>{fechaCorta(n.date)}</time><h3>{n.title}</h3><p>{n.summary}</p></span><Icon name="arrow" size={20} /></Link>)}</div>
    </section>
  </main>;
}
