const menu = document.getElementById('menu');
const indicador = document.getElementById('indicador');
const secciones = document.querySelectorAll('.seccion');
const inicio = document.getElementById('inicio');
const contenido = document.getElementById('contenido');
const volver = document.getElementById('volver');
const seccionDinamica = document.getElementById('contenedor-secciones-dinamicas');

let tamañoIndicador = menu.querySelector('a').offsetWidth;
indicador.style.width = tamañoIndicador + 'px';

let indexSeccionActiva;

// Observer
const observer = new IntersectionObserver((entradas, observer) => {
	entradas.forEach(entrada => {
		if(entrada.isIntersecting){
			// Obtenemos cual es la seccion que esta entrando en pantalla.
			// console.log(`La entrada ${entrada.target.id} esta intersectando`);

			// Creamos un arreglo con las secciones y luego obtenemos el index del la seccion que esta en pantalla.
			indexSeccionActiva = [...secciones].indexOf(entrada.target);
			indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
		}
	});
}, {
	rootMargin: '-80px 0px 0px 0px',
	threshold: 0.2
});

// Agregamos un observador para el hero.
observer.observe(document.getElementById('hero'));

// Asignamos un observador a cada una de las secciones
secciones.forEach(seccion => observer.observe(seccion));

// Evento para cuando la pantalla cambie de tamaño.
const onResize = () => {
	// Calculamos el nuevo tamaño que deberia tener el indicador.
	tamañoIndicador = menu.querySelector('a').offsetWidth;

	// Cambiamos el tamaño del indicador.
	indicador.style.width = `${tamañoIndicador}px`;

	// Volvemos a posicionar el indicador.
	indicador.style.transform = `translateX(${tamañoIndicador * indexSeccionActiva}px)`;
}

// Configuración de datos de las secciones
const datos = [
    {
        id: 1,
        titulo: "Egipto",
        imagen: "img/num_egypt.png",
        texto: "El sistema de numeración egipcio es un sistema no posicional utilizado por los antiguos egipcios. Está basado en la representación de números mediante símbolos jeroglíficos, donde cada símbolo corresponde a una potencia de 10."
    },
	{
        id: 2,
        titulo: "La India",
        imagen: "img/num_indian.png",
        texto: "El sistema de numeración de la antigua India es la base del sistema numérico que usamos hoy en día. Se caracteriza por ser un sistema posicional decimal, que permitió importantes avances en matemáticas y cálculo."
    },
    {
        id: 3,
        titulo: "Babilonia",
        imagen: "img/num_babylonian.png",
        texto: "El sistema de numeración babilonio es uno de los sistemas más antiguos, utilizado en Mesopotamia desde aproximadamente el 2000 a.C. Se caracteriza por ser un sistema sexagesimal (base 60), aunque con algunos aspectos posicionales similares a los sistemas modernos."
    },
    {
        id: 4,
        titulo: "Los Mayas",
        imagen: "img/num_maya.png",
        texto: "El sistema numérico maya fue un sistema vigesimal (base 20) que combinaba características posicionales con un uso innovador de símbolos. Fue utilizado en Mesoamérica por los mayas para fines astronómicos, calendáricos y comerciales."
    },
    {
        id: 5,
        titulo: "Roma",
        imagen: "img/num_roman.png",
        texto: "El sistema numérico romano fue utilizado en la Antigua Roma y se basa en un conjunto de letras del alfabeto latino que representan valores específicos. Es un sistema no posicional y aditivo, aunque también incluye elementos de sustracción."
    },
];

// Crear eventos en las imágenes
document.querySelectorAll('.seccion img').forEach((img, index) => {
    img.addEventListener('click', () => {
        mostrarContenido(datos[index]);
    });
});

// Función para mostrar contenido dinámico
function mostrarContenido(data) {
    inicio.style.display = 'none'; // Oculta la sección inicial
    contenido.style.display = 'block'; // Muestra la sección dinámica
	seccionDinamica.style.display = 'flex'; //Muestra los datos
    seccionDinamica.innerHTML = `
        <h1>${data.titulo}</h1>
        <img src="${data.imagen}" alt="${data.titulo}">
        <p>${data.texto}</p>`
};

// Evento para el botón "Volver"
volver.addEventListener('click', () => {
    contenido.style.display = 'none'; // Oculta la sección dinámica
    inicio.style.display = 'block'; // Muestra la sección inicial
	seccionDinamica.style.display = 'none'; //Oculta los datos
});

window.addEventListener('resize', onResize);