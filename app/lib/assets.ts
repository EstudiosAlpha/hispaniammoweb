// En GitHub Pages la web puede vivir dentro de una subcarpeta
// (https://usuario.github.io/HispaniaMMOWeb). Esta función antepone esa
// subcarpeta a las imágenes para que carguen igual en local y publicadas.
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string) {
  return BASE_PATH + path;
}

export const SITE_BASE_PATH = BASE_PATH;
