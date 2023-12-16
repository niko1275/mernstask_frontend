
export function formatearFecha(fecha) {
    const opciones = { year: 'numeric', month: 'long', day: 'numeric' };
    const fechaFormateada = new Date(fecha).toLocaleDateString(undefined, opciones);
    return fechaFormateada;
  }