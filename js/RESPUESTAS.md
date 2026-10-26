# Parcial 2 · Respuestas de razonamiento

Nombre:Madonna Arias Agudelo

Son cuatro preguntas de 5 puntos sobre código que ya conoces. Para cada una:

1. Lee el código y escribe primero lo que **crees** que pasa.
2. Compruébalo: pégalo en la consola de DevTools (F12 → Console) con tu página del parcial abierta en Live Server. En esa consola sí se puede usar `await` fuera de una función.
3. Escribe tu respuesta debajo de cada letra: (a), (b), (c)…

Se califica la explicación, no solo el resultado: con dos o tres frases por letra es suficiente. Escríbela con tus palabras, porque te la pueden preguntar.

## P1 · ¿En qué orden se imprime? (5 puntos)

**Lo viste en:** la función `cargar` del Explorador (semana 8): «await pausa ESTA función, no el navegador».

```js
console.log('1');
setTimeout(() => console.log('2'), 0);
const cargar = async () => {
  console.log('3');
  const respuesta = await fetch('https://rickandmortyapi.com/api/episode/1');
  console.log('4');
};
cargar();
console.log('5');
```

**(a)** Los cinco números en el orden en que salen en la consola. (2 pts)

Respuesta:Los números se imprimen en el orden: **1, 3, 5, 4, 2**. El 1 y el 3 se ejecutan de forma síncrona al inicio; el 5 sale antes que el 4 porque el `fetch` es asíncrono y pausa únicamente la función, permitiendo que el hilo principal continúe afuera; el 4 se imprime al resolverse la promesa; y el 2 (con `setTimeout`) se ejecuta al final en la cola de tareas.

**(b)** Por qué el `3` sale **antes** que el `5`, si `cargar` es una función `async`. (2 pts)

Respuesta:El 3 sale antes que el 5 porque que una función sea `async` no significa que se ejecute en segundo plano de inmediato. Al invocar `cargar()`, JavaScript ejecuta su interior de forma síncrona hasta encontrarse con el primer `await`.

**(c)** Por qué el `5` no espera a que termine el `fetch`, y por qué el `2` y el `4` salen al final. (1 pt)

Respuesta:El 5 no espera porque la palabra `await` solo detiene la ejecución *dentro* de la función asíncrona, liberando al navegador para seguir ejecutando el código exterior. El 4 y el 2 salen al final por pertenecer a microtareas y macrotareas respectivamente.

---

## P2 · Un 404 que no llega al catch (5 puntos)

**Lo viste en:** el `pedirJSON` del Explorador (semana 8): «fetch solo falla si NO pudo hablar con el servidor».

El episodio 9999 no existe: la API responde con código **404** y el cuerpo `{"error":"Episode not found"}`.

```js
try {
  const respuesta = await fetch('https://rickandmortyapi.com/api/episode/9999');
  const datos = await respuesta.json();
  console.log('Episodio:', datos.name);
} catch (error) {
  console.log('Falló:', error.message);
}
```

**(a)** Qué imprime la consola, exactamente. (1 pt)

Respuesta:La consola imprime exactamente: `Episodio: undefined`.

**(b)** Por qué **no** entra al `catch`, aunque el episodio no existe. Pista: piensa en la diferencia entre «el servidor respondió con un 404» y «no hubo respuesta» (por ejemplo, sin internet). (2 pts)

Respuesta:No entra al `catch` porque un código de estado HTTP 404 significa que el servidor sí respondió exitosamente a la petición, aunque el recurso no exista. El `fetch` solo lanza un error hacia el `catch` ante fallos de red o conectividad (como no tener internet).

**(c)** La línea que falta para que sí entre al `catch`: escríbela e indica en qué parte del código va. Luego escribe qué imprimiría la consola con esa línea. (2 pts)

Respuesta: Línea que falta:* `if (!respuesta.ok) throw new Error('HTTP ' + respuesta.status);` (ubicada justo después del `fetch` y antes de `respuesta.json()`).
  * *Qué imprimiría:* Con esa línea, la consola imprimiría: `Falló: HTTP 404`.

## P3 · LocalStorage sin JSON (5 puntos)

**Lo viste en:** `js/favoritos.js` del Explorador (semana 8): «localStorage solo guarda TEXTO».

```js
const vistos = [1, 5, 8];
localStorage.setItem('vistos', vistos);
const leido = localStorage.getItem('vistos');
console.log(leido, typeof leido);      // (a)
console.log(leido.length);             // (b)
const recuperado = JSON.parse(leido);  // (c)
```

**(a)** Qué imprime la línea marcada (a): el valor y su tipo. (1 pt)

Respuesta:Imprime el valor `"1,5,8"` y su tipo es `"string"`.

**(b)** Qué imprime la línea marcada (b), y por qué da ese número. (1 pt)

Respuesta:Imprime `5` porque `leido` es una cadena de texto y su propiedad `.length` cuenta la cantidad de caracteres que contiene el string (incluyendo las comas), no los elementos de un array.

**(c)** Qué pasa en la línea marcada (c): ¿funciona o sale un error? Si sale un error, cuál y por qué. (1 pt)

Respuesta:Sale un error (`SyntaxError`) porque `JSON.parse()` intenta analizar un texto plano que no tiene formato JSON válido para un arreglo (carece de los corchetes `[...]`).

**(d)** La segunda línea corregida, para que `recuperado` vuelva a ser el array `[1, 5, 8]`. (1 pt)

Respuesta:La línea corregida es: `localStorage.setItem('vistos', JSON.stringify(vistos));`

**(e)** Por qué en tu `leerVistos` el `JSON.parse` va dentro de un `try/catch`: qué podría pasarle a la app si no estuviera. (1 pt)

Respuesta:Se usa dentro de un `try/catch` para evitar que si los datos del almacenamiento local se corrompen o están dañados, la aplicación colapse por completo al intentar analizarlos, permitiendo capturar el error de forma segura y retornar un array vacío `[]`.

## P4 · Botones que dejan de funcionar (5 puntos)

**Lo viste en:** la delegación en la grilla del Explorador (semana 7, paso 04). Está explicada en el README, en R6: «¿Qué es la delegación?».

Un compañero escribió este código. Al cargar la página, el primer clic en «Marcar como visto» funciona; pero después de ese clic, o después de escribir una letra en el buscador, **ningún botón responde**.

```js
render();
document.querySelectorAll('[data-id]').forEach((boton) => {
  boton.addEventListener('click', () => {
    vistos = alternarId(vistos, Number(boton.dataset.id));
    guardarVistos(vistos);
    render();
  });
});
```

**(a)** Qué les pasó a los botones. Pista: fíjate en qué hace `render()` con el contenido de `#lista` cada vez que se llama, y en cuántas veces se ejecuta el `forEach`. (2 pts)

Respuesta:Los botones dejaron de responder porque cada vez que se llama a `render()`, se reemplaza todo el contenido HTML de `#lista` mediante `innerHTML`, destruyendo los botones antiguos y creando unos nuevos. Los `addEventListener` puestos mediante el `forEach` inicial solo afectaban a los elementos viejos que ya fueron eliminados del DOM.

**(b)** El código reescrito con **delegación**: un solo listener en `#lista` que funcione con cualquier botón, aunque `render()` lo haya creado después. Se revisan tres cosas, 1 punto cada una: que el listener esté en `#lista` y no en los botones; que use `closest('[data-id]')` (o algo equivalente) para saber qué botón se presionó; y que no haga nada si el clic no fue en un botón. (3 pts)

Respuesta:El código reescrito utilizando delegación de eventos sobre el contenedor `#lista`:
```javascript
lista.addEventListener('click', (e) => {
  const boton = e.target.closest('[data-id]');
  if (!boton) return;

  vistos = alternarId(vistos, Number(boton.dataset.id));
  guardarVistos(vistos);
  render();
});