// js/api.js · Comunicación con la API. En este archivo NO aparece la palabra document.
// Plan B (solo si la API no responde): cambia la URL por './respaldo/episodios.json'
export const URL_EPISODIOS = 'https://rickandmortyapi.com/api/episode';

// R1 · Hace fetch a una URL. Si la respuesta NO es ok, LANZA un Error cuyo mensaje incluye
// el código HTTP (por ejemplo "HTTP 404"). Si está bien, devuelve el JSON ya convertido.
export const pedirJSON = async (url) => {
  const respuesta = await fetch(url);
  if (!respuesta.ok) {
    throw new Error(`HTTP ${respuesta.status}`);
  }
  return await respuesta.json();
};

// R1 · Usa pedirJSON y devuelve SOLO el array de episodios (no el objeto completo con info).
export const obtenerEpisodios = async () => {
  const datos = await pedirJSON(URL_EPISODIOS);
  return datos.results;
};