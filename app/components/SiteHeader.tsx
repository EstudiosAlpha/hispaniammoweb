'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import Icon from './Icon';
const NAV = [
  { href: '/', label: 'El códice' }, { href: '/clases', label: 'Clases' },
  { href: '/habilidades', label: 'Habilidades' }, { href: '/bestiario', label: 'Bestiario' },
  { href: '/objetos', label: 'Objetos' }, { href: '/mundo', label: 'Mundo' },
  { href: '/noticias', label: 'Noticias' }, { href: '/sistemas', label: 'Sistemas' },
];
export default function SiteHeader() {
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const open = menuPath === pathname;
  useEffect(() => {
    const close = (e: KeyboardEvent) => { if (e.key === 'Escape') { setMenuPath(null); document.getElementById('menu-toggle')?.focus(); } };
    if (open) window.addEventListener('keydown', close);
    return () => window.removeEventListener('keydown', close);
  }, [open]);
  return <header className="site-header">
    <a className="skip-link" href="#contenido">Saltar al contenido</a>
    <div className="page-shell header-inner">
      <Link href="/" className="brand" aria-label="HispaniaMMO — inicio"><span className="brand-mark"><Icon name="crown" size={24} /></span><span>HISPANIA<span className="brand-sub">MMO · EL CÓDICE</span></span></Link>
      <nav className="desktop-nav" aria-label="Navegación principal">{NAV.map(n => <Link href={n.href} key={n.href} aria-current={pathname === n.href || n.href !== '/' && pathname.startsWith(n.href + '/') ? 'page' : undefined}>{n.label}</Link>)}</nav>
      <Link className="btn-gold header-cta" href="/jugar">Cómo jugar <Icon name="arrow" size={16} /></Link>
      <button id="menu-toggle" className="menu-toggle icon-button" onClick={() => setMenuPath(open ? null : pathname)} aria-label={open ? 'Cerrar menú' : 'Abrir menú'} aria-expanded={open} aria-controls="mobile-navigation">{open ? <Icon name="close" /> : <span aria-hidden="true">☰</span>}</button>
    </div>
    {open && <nav id="mobile-navigation" className="mobile-nav" aria-label="Navegación móvil">{NAV.map(n => <Link key={n.href} href={n.href} onClick={() => setMenuPath(null)} aria-current={pathname === n.href ? 'page' : undefined}>{n.label}<Icon name="arrow" size={16} /></Link>)}<Link href="/jugar" onClick={() => setMenuPath(null)}>Cómo jugar <Icon name="arrow" size={16} /></Link></nav>}
  </header>;
}
