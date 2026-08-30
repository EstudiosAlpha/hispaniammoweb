// ─────────────────────────────────────────────────────────────────────────────
// NOTICIAS DE HISPANIAMMO
//
// Para publicar una noticia nueva, copia uno de los bloques de abajo y pégalo
// al principio de la lista con tus datos. No hace falta tocar ningún otro
// archivo: la portada, el listado y la página propia se actualizan solas.
//
//   slug      dirección de la noticia (solo minúsculas y guiones)
//   date      fecha en formato AAAA-MM-DD
//   category  'actualizacion' | 'evento' | 'desarrollo' | 'comunidad'
//   title     titular
//   summary   una o dos frases; es lo que se lee en el listado
//   body      cada texto del array es un párrafo
//   highlights  opcional: puntos sueltos que se muestran en un recuadro
// ─────────────────────────────────────────────────────────────────────────────
import type { Noticia } from '../lib/noticias';

export const NOTICIAS: Noticia[] = [
  {
    slug: 'asedios-del-castillo-de-hispania',
    date: '2026-08-28',
    category: 'actualizacion',
    title: 'Los asedios al Castillo de Hispania ya tienen calendario',
    summary:
      'Las puertas tienen vida propia, los bandos se registran por alianza y la propiedad del castillo cambia de manos de verdad al terminar la batalla.',
    body: [
      'El Castillo de Hispania deja de ser un decorado. A partir de ahora los asedios se anuncian con antelación en el calendario del reino, los clanes se inscriben en un bando y, cuando suena la campana, las puertas se convierten en el primer objetivo real de la batalla.',
      'Cada puerta tiene sus propios puntos de vida y puede ser derribada. Dentro del recinto hay objetivos que capturar y puntos de reaparición asignados por bando, de forma que perder una posición cuesta caro pero nunca te expulsa del combate.',
      'Al terminar el asedio, la propiedad del castillo se transfiere al clan vencedor con todo lo que ello implica: derecho a fijar el impuesto del Mercader, acceso a la tesorería y la obligación de defenderla en la siguiente convocatoria.',
    ],
    highlights: [
      'Calendario público y registro previo por alianza',
      'Puertas destructibles con vida propia',
      'Objetivos capturables dentro del recinto',
      'Transferencia real de la propiedad al vencedor',
    ],
  },
  {
    slug: 'invasion-del-lobo-iberico',
    date: '2026-08-20',
    category: 'evento',
    title: 'La Invasión del lobo ibérico regresa a la dehesa',
    summary:
      'Durante el evento las manadas bajan hasta los caminos reales, con multiplicadores de experiencia y botín exclusivo mientras dura la amenaza.',
    body: [
      'Las manadas han abandonado la sierra. Durante la Invasión del lobo ibérico, los caminos que rodean la villa se llenan de lobos que cazan en grupo y se llaman unos a otros en cuanto detectan a un héroe solo.',
      'Mientras dure el evento se aplican multiplicadores temporales de experiencia y pesetas en las zonas afectadas, y aparecen tablas de botín que no están disponibles el resto del año.',
      'Es un buen momento para subir a los personajes recién creados, pero conviene no confiarse: un lobo aislado es manejable, una manada completa en campo abierto no lo es.',
    ],
    highlights: [
      'Multiplicadores de experiencia y pesetas',
      'Botín exclusivo mientras dura el evento',
      'Manadas que se llaman entre sí',
    ],
  },
  {
    slug: 'tiendas-offline-y-libro-mayor',
    date: '2026-08-12',
    category: 'desarrollo',
    title: 'Tiendas offline: vende mientras estás desconectado',
    summary:
      'Deja hasta ocho lotes a la venta con su precio y su mensaje. La mercancía queda en depósito y al volver te espera el resumen de ventas.',
    body: [
      'La economía de Hispania no se detiene cuando cierras sesión. Con las tiendas offline puedes dejar hasta ocho lotes en venta, cada uno con su precio en pesetas y un mensaje propio para atraer compradores.',
      'La mercancía se guarda en depósito seguro mientras la tienda está activa, de modo que no puede perderse ni duplicarse. Las compras simultáneas se procesan de una en una, así que dos jugadores nunca pueden llevarse el mismo lote.',
      'Todo movimiento queda registrado en el libro mayor del reino. Al reconectar recibes un resumen con lo vendido, lo ingresado y lo que sigue en el mostrador.',
    ],
    highlights: [
      'Hasta ocho lotes por tienda',
      'Depósito seguro de la mercancía',
      'Compras simultáneas serializadas',
      'Resumen de ventas al reconectar',
    ],
  },
  {
    slug: 'sesenta-profesiones-disponibles',
    date: '2026-08-01',
    category: 'actualizacion',
    title: 'Las sesenta profesiones del reino ya están jugables',
    summary:
      'Seis linajes, dieciocho ramas y cuatro escalones de progresión: nivel 1, 20, 40 y 75, con una maestría única al final de cada camino.',
    body: [
      'El árbol de progresión está completo. Los seis linajes de Hispania se abren en tres ramas al alcanzar el nivel 20, se especializan en el 40 y culminan en una maestría única en el nivel 75.',
      'Cada escalón cambia de verdad tu forma de jugar: los atributos dan un salto claro, se desbloquean técnicas propias y el resto del reino empieza a verte de otra manera. Las decisiones son permanentes, así que conviene pensarlas.',
      'Puedes consultar las estadísticas reales de cada profesión, sus habilidades y su lugar en el árbol desde la sección de clases.',
    ],
    highlights: [
      '6 linajes y 18 ramas',
      '60 profesiones jugables',
      '18 maestrías de nivel 75',
    ],
  },
];
