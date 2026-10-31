import cuentacuentosImage from "../assets/novedad-cuentacuentos.jpg";
import tangoImage from "../assets/novedad-tango.jpg";
import donacionImage from "../assets/novedad-donacion.jpg";

export const institucion = {
  nombre: "Biblioteca Popular Pueyrredón Norte",
  barrio: "Villa Pueyrredón, Buenos Aires",
  fundacion: 1916,
};

export const hero = {
  kicker: "Villa Pueyrredón, desde 1916",
  titulo: "Un lugar para encontrarse con los libros.",
  descripcion: "Una biblioteca de barrio, abierta a las historias y a las personas que las comparten.",
  pie: "Cochrane 2334, “La Casita de Tucumán”",
};

export const intro = {
  titulo: "Más de un siglo haciendo lugar a la cultura del barrio.",
  parrafos: [
    "La Biblioteca Popular Pueyrredón Norte es una institución cultural comunitaria sin fines de lucro, fundada en 1916 por la Asociación Vecinal Pueyrredón Norte.",
    "Conocida como “la Casita de Tucumán” por su arquitectura neocolonial, forma parte de la identidad y la memoria del barrio. Sus colecciones, la sala de lectura y los talleres reúnen a vecinos de todas las edades.",
  ],
  enlace: "Conocé nuestra casa",
  imagenAlt: "Interior de la Biblioteca Popular Pueyrredón Norte",
};

export const membresia = {
  titulo: "Hacete socio y encontrá tu próximo libro.",
  descripcion: "Acercate para conocer la propuesta y conversar con el equipo de la biblioteca.",
  accion: "Planificar una visita",
  pasos: [
    {
      title: "Acercate",
      description: "Visitá la biblioteca en Cochrane 2334, de lunes a viernes entre las 17:00 y las 20:00.",
    },
    {
      title: "Consultá cómo asociarte",
      description: "El equipo puede contarte los requisitos y las modalidades disponibles para hacerte socio.",
    },
    {
      title: "Elegí tu próxima lectura",
      description: "Explorá el catálogo y consultá en la biblioteca por préstamos y disponibilidad.",
    },
  ],
};

export const contacto = {
  titulo: "La próxima historia empieza acá.",
  descripcion: "Pasá por la biblioteca, recorré la sala de lectura y conocé a quienes la cuidan.",
  direccion: "Cochrane 2334, Villa Pueyrredón",
  mapaUrl: "https://maps.google.com/?q=Cochrane+2334,+Villa+Pueyrred%C3%B3n,+Buenos+Aires",
  telefono: "011 4572-9107",
  telefonoHref: "tel:01145729107",
  horario: "Lunes a viernes, de 17:00 a 20:00 hs.",
  atencion: { dias: [1, 2, 3, 4, 5], abre: 17, cierra: 20 },
};

export const services = [
  {
    title: "Préstamo de libros",
    description: "Colección general, infantil y de referencia disponible para socios.",
  },
  {
    title: "Sala de lectura",
    description: "Un espacio tranquilo y abierto a toda la comunidad para leer y estudiar.",
  },
  {
    title: "Talleres comunitarios",
    description: "Actividades para compartir, aprender y encontrarse en el barrio.",
  },
  {
    title: "Actividades culturales",
    description: "Música, teatro y propuestas culturales para todas las edades.",
  },
  {
    title: "Cómo asociarse",
    description: "Acercate a la biblioteca para conocer cómo hacerte socio y acceder al préstamo.",
  },
];

export const news = [
  {
    label: "Talleres",
    title: "Taller de cuentacuentos",
    description: "Encuentros de lectura y narración para que las infancias descubran nuevas historias. Consultá próximas fechas en la biblioteca.",
    image: cuentacuentosImage,
    imageAlt: "Actividad de cuentacuentos para chicos",
  },
  {
    label: "Agenda cultural",
    title: "Concierto de tango en el patio",
    description: "Música y encuentros en el patio histórico de la biblioteca. Consultá la agenda para conocer las próximas fechas.",
    image: tangoImage,
    imageAlt: "Concierto de tango en el patio de la biblioteca",
  },
  {
    label: "Todo el año",
    title: "Donación de libros",
    description: "Recibimos libros en buen estado para que nuevas historias lleguen a más vecinos. Acercá tu donación en horario de atención.",
    image: donacionImage,
    imageAlt: "Libros preparados para ser donados",
  },
];