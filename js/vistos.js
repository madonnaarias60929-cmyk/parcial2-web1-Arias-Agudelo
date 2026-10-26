// js/vistos.js · Persistencia en LocalStorage. Aquí NO aparece document.
const CLAVE_VISTOS = 'parcial2-vistos';

// R6 · Devuelve el array de ids guardado en LocalStorage.
export const leerVistos = () => {
  try {
    const datos = localStorage.getItem(CLAVE_VISTOS);
    return datos ? JSON.parse(datos) : [];
  } catch (error) {
    return [];
  }
};

// R6 · Guarda el array de ids en LocalStorage como texto JSON.
export const guardarVistos = (vistos) => {
  try {
    localStorage.setItem(CLAVE_VISTOS, JSON.stringify(vistos));
  } catch (error) {
    console.error('No se pudo guardar en localStorage', error);
  }
};