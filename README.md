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
npm run start
```

## Secciones

| Ruta | Contenido |
| --- | --- |
| `/` | Portada |
| `/clases` | Listado de los 6 linajes y sus 60 profesiones |
| `/arbol` | Árbol de clases interactivo |
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

## Publicarla en internet

El proyecto es Next.js estándar, así que funciona en cualquier hosting que lo
admita. Opciones habituales:

- **Vercel**: sube el repositorio y se despliega sin configurar nada.
- **Netlify**, **Cloudflare Pages**, **Railway**, **Render**: igual de directo.
- **Tu propio servidor**: `npm run build` y luego `npm run start`.

Antes de publicar, define tu dominio en la variable `NEXT_PUBLIC_SITE_URL`
(por ejemplo `https://hispaniammo.com`) para que la imagen de portada se vea
correctamente al compartir el enlace.
