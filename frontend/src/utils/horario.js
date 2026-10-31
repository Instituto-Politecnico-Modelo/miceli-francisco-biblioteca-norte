const ZONA_HORARIA = "America/Argentina/Buenos_Aires";
const DIAS = ["domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"];
const NUMERO_DE_DIA = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };

function formatearHora(hora) {
  return `${String(hora).padStart(2, "0")}:00`;
}

export function estadoDeAtencion(ahora, { dias, abre, cierra }) {
  const partes = new Intl.DateTimeFormat("en-US", {
    timeZone: ZONA_HORARIA,
    weekday: "short",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23",
  }).formatToParts(ahora);
  const valor = (tipo) => partes.find((parte) => parte.type === tipo).value;

  const dia = NUMERO_DE_DIA[valor("weekday")];
  const minutos = Number(valor("hour")) * 60 + Number(valor("minute"));
  const atiendeHoy = dias.includes(dia);

  if (atiendeHoy && minutos >= abre * 60 && minutos < cierra * 60) {
    return { abierto: true, mensaje: `Abierta ahora, hasta las ${formatearHora(cierra)}` };
  }
  if (atiendeHoy && minutos < abre * 60) {
    return { abierto: false, mensaje: `Cerrada por ahora, abre hoy a las ${formatearHora(abre)}` };
  }

  for (let salto = 1; salto <= 7; salto += 1) {
    const siguiente = (dia + salto) % 7;
    if (dias.includes(siguiente)) {
      const cuando = salto === 1 ? "mañana" : `el ${DIAS[siguiente]}`;
      return { abierto: false, mensaje: `Cerrada por ahora, abre ${cuando} a las ${formatearHora(abre)}` };
    }
  }
  return { abierto: false, mensaje: "Cerrada por ahora" };
}
