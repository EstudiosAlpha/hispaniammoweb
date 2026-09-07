# HispaniaMMO — web oficial

Web del MMORPG **HispaniaMMO**, hecha con Next.js. Es un proyecto independiente:
no depende de ChatGPT ni de ningún servicio externo para funcionar.

## Ver la web en tu ordenador

```bash
npm install
npm run dev
```

Abre <http://localhost:3000>.

## Generar la versión final

```bash
npm run build
```

Esto crea la carpeta `out/` con la web entera en archivos estáticos (HTML, CSS
e imágenes). No necesita servidor: vale para GitHub Pages o cualquier hosting.

Para verla antes de publicarla:

```bash
npm run preview
```

## Secciones

| Ruta | Contenido |
| --- | --- |
| `/` | Portada |
| `/noticias` | Noticias del reino |
| `/noticias/[noticia]` | Ficha de cada noticia |
| `/clases` | Listado de los 6 linajes y sus 60 profesiones |
| `/clases/[clase]` | Ficha de cada profesión |
| `/habilidades` | Habilidades con sus valores reales |
| `/bestiario` | Criaturas, estadísticas y botín |
| `/mundo` | Zonas y servicios de Hispania |
| `/objetos` | Armas, materiales y pergaminos |
| `/sistemas` | Grupos, clanes, castillos y asedios |
| `/jugar` | Primeros pasos |

## El códice interactivo

- Búsqueda global de clases, habilidades, criaturas, objetos, armas y habitantes.
- Catálogo de profesiones con filtros por linaje, nivel y rol, búsqueda por habilidad y vista del árbol de evolución.
- Fichas con secciones de habilidades, atributos y evolución. Técnicas y objetos se presentan en filas compactas con sus iconos originales y detalles desplegables.
- El grimorio filtra las habilidades por linaje y enlaza a las profesiones que las utilizan.
- Navegación móvil, acceso por teclado y animaciones que respetan `prefers-reduced-motion`.

Las habilidades mostradas son las asignadas a cada profesión; no se suman las
listas de los ancestros. El catálogo actual contiene cinco técnicas, compartidas
por las 60 profesiones. No se deducen habilidades adicionales de las descripciones
de los roles. Los efectos que aún no tienen desglose se indican como pendientes.

La ilustración ambiental de portada es un recurso original generado para esta
web. Se sirve localmente como WebP (`public/images/hispania-hero.webp`).

## Iconos originales del juego

Los iconos de habilidades se extraen de `AbilitiesAtlas.png` y los de inventario
de `InventoryIconAtlas.png`, siguiendo las mismas celdas que usa el cliente de
Unity. Están incluidos en `public/images/game-icons/`, con el mapa por registro
en `app/data/game-icons.json`; el sitio publicado no necesita acceder a Unity.

Para volver a exportarlos con el proyecto del juego disponible:

```bash
node scripts/export-game-icons.mjs ../HispaniaMMO
```

El exportador conserva las asignaciones actuales: las cinco habilidades tienen
icono propio; armas, materiales y pergaminos comparten iconos por categoría,
igual que en el inventario del juego. La selección está documentada junto al
código del exportador. Si se añaden registros nuevos, hay que comprobar su icono
en el cliente antes de ampliar ese mapa.

## De dónde salen los datos

Las estadísticas de clases, habilidades, criaturas y objetos se extrajeron del
proyecto Unity del juego (`../HispaniaMMO`) y viven en
`app/data/gamedata.json`. Si cambias el contenido del juego, vuelve a exportar
ese archivo y la web se actualiza sola.

Algunas descripciones estaban escritas en lenguaje técnico interno. Se reescriben
solo de cara al jugador en `app/lib/data.ts`, sin tocar los datos del juego.

## Publicarla en GitHub Pages

La web ya está preparada para GitHub Pages. Solo hay que hacerlo una vez:

1. **Sube el proyecto a GitHub.** Crea un repositorio nuevo y luego, desde esta
   carpeta:

   ```bash
   git remote add origin https://github.com/TU-USUARIO/TU-REPO.git
   git push -u origin main
   ```

2. **Activa Pages.** En el repositorio, entra en *Settings → Pages* y, en
   **Source**, elige **GitHub Actions**.

Y ya está. Cada vez que subas cambios con `git push`, la web se regenera y se
publica sola en unos minutos.

La dirección será `https://TU-USUARIO.github.io/TU-REPO/`. La subcarpeta del
repositorio se detecta automáticamente, así que el logo, los estilos y los
enlaces funcionan sin que tengas que tocar nada.

### Si prefieres un dominio propio

En *Settings → Pages → Custom domain* escribe tu dominio (por ejemplo
`hispaniammo.com`) y apunta el DNS a GitHub. El aviso de la subcarpeta
desaparece solo.

### Publicar en otro sitio

Al ser archivos estáticos, la carpeta `out/` también sirve tal cual para
Netlify, Cloudflare Pages, Vercel o cualquier alojamiento web clásico por FTP.

## Detalles técnicos

- `NEXT_PUBLIC_BASE_PATH`: subcarpeta donde vive la web. Lo rellena solo el
  flujo de GitHub Actions; en local se deja vacío.
- `NEXT_PUBLIC_SITE_URL`: dirección pública, usada para la imagen que se ve al
  compartir el enlace.
- `public/.nojekyll`: evita que GitHub ignore las carpetas internas de estilos.
