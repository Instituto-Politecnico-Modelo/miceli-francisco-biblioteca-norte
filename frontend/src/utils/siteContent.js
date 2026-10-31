import cuentacuentosImage from "../assets/novedad-cuentacuentos.jpg";
import tangoImage from "../assets/novedad-tango.jpg";
import donacionImage from "../assets/novedad-donacion.jpg";

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