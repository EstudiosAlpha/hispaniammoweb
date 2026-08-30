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
