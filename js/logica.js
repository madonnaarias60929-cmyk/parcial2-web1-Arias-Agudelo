// js/logica.js · Funciones PURAS: reciben datos y devuelven datos. Aquí NO aparece document.

// R4 · Devuelve los episodios cuyo nombre contiene `texto` (sin importar mayúsculas ni espacios 
// al inicio o al final) y cuyo código episodio (S01E01...) empieza por `temporada`.
export const filtrarEpisodios = (lista, { texto, temporada }) => {
  const buscado = texto.trim().toLowerCase();
  return lista
    .filter((e) => e.name.toLowerCase().includes(buscado))
    .filter((e) => temporada === '' || e.episode.startsWith(temporada));
};

// R5 · Suma la cantidad de personajes (characters.length) de todos los episodios de la lista.
// Usa reduce.
export const contarPersonajes = (lista) => {
  // TODO
};

// R6 · Si id está en ids, devuelve un array NUEVO sin él; si no está, un array NUEVO con él.
// No modifiques el array que recibes.
export const alternarId = (ids, id) => {
  // TODO
};