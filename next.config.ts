import type { NextConfig } from 'next';

// GitHub Pages sirve la web desde https://usuario.github.io/nombre-repo, es decir
// dentro de una subcarpeta. Esa subcarpeta se pasa en NEXT_PUBLIC_BASE_PATH.
// Si publicas en un dominio propio o en usuario.github.io, se deja vacío.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

const nextConfig: NextConfig = {
  // Genera solo HTML, CSS e imágenes: sin servidor, que es lo que admite Pages.
  output: 'export',
  basePath,
  // Crea /clases/index.html en vez de /clases.html para que las rutas funcionen.
  trailingSlash: true,
  // Pages no puede optimizar imágenes al vuelo.
  images: { unoptimized: true },
};

export default nextConfig;
