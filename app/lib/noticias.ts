// Tipos y utilidades de la sección de noticias.
// El contenido editable vive en app/data/noticias.ts.
import { NOTICIAS } from '../data/noticias';

export type CategoriaNoticia = 'actualizacion' | 'evento' | 'desarrollo' | 'comunidad';

export type Noticia = {
  /** Parte final de la dirección: /noticias/mi-noticia */
  slug: string;
  /** Fecha en formato AAAA-MM-DD */
  date: string;
  category: CategoriaNoticia;
  title: string;
  /** Resumen de una o dos frases que se ve en el listado */
  summary: string;
  /** Cuerpo de la noticia: cada texto del array es un párrafo */
  body: string[];
  /** Lista opcional de puntos destacados que se muestra en un recuadro */
  highlights?: string[];
};

export const CATEGORIAS: Record<CategoriaNoticia, { label: string; accent: string; glow: string }> = {
  actualizacion: { label: 'Actualización', accent: '#c8a24a', glow: 'rgba(200,162,74,0.35)' },
  evento: { label: 'Evento', accent: '#b8654a', glow: 'rgba(184,101,74,0.35)' },
  desarrollo: { label: 'Desarrollo', accent: '#7d8fd6', glow: 'rgba(125,143,214,0.35)' },
  comunidad: { label: 'Comunidad', accent: '#7fa860', glow: 'rgba(127,168,96,0.35)' },
};

export function categoriaDe(category: CategoriaNoticia) {
  return CATEGORIAS[category] ?? CATEGORIAS.actualizacion;
}

/** Todas las noticias, de la más reciente a la más antigua. */
export const noticias: Noticia[] = [...NOTICIAS].sort((a, b) => b.date.localeCompare(a.date));

export function noticiaBySlug(slug: string) {
  return noticias.find((n) => n.slug === slug);
}

/** Devuelve la noticia anterior y la siguiente en orden cronológico. */
export function vecinasDe(slug: string) {
  const index = noticias.findIndex((n) => n.slug === slug);
  return {
    masReciente: index > 0 ? noticias[index - 1] : undefined,
    masAntigua: index >= 0 && index < noticias.length - 1 ? noticias[index + 1] : undefined,
  };
}

/**
 * Formatea la fecha en castellano. Se añade la hora fija a mediodía para que
 * la conversión a fecha local nunca desplace el día.
 */
export function fechaLarga(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date(date + 'T12:00:00Z'));
}

export function fechaCorta(date: string) {
  return new Intl.DateTimeFormat('es-ES', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date + 'T12:00:00Z'));
}
