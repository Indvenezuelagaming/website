const fila = document.querySelector('.contenedor-carousel');
const peliculas = document.querySelectorAll('.pelicula');

const flechaIzquierda = document.getElementById('flecha-izquierda');
const flechaDerecha = document.getElementById('flecha-derecha');

// ? ----- ----- Event Listener para la flecha derecha. ----- -----
flechaDerecha.addEventListener('click', () => {
	fila.scrollLeft += fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.nextSibling){
		indicadorActivo.nextSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Event Listener para la flecha izquierda. ----- -----
flechaIzquierda.addEventListener('click', () => {
	fila.scrollLeft -= fila.offsetWidth;

	const indicadorActivo = document.querySelector('.indicadores .activo');
	if(indicadorActivo.previousSibling){
		indicadorActivo.previousSibling.classList.add('activo');
		indicadorActivo.classList.remove('activo');
	}
});

// ? ----- ----- Paginacion ----- -----
const numeroPaginas = Math.ceil(peliculas.length / 5);
for(let i = 0; i < numeroPaginas; i++){
	const indicador = document.createElement('button');

	if(i === 0){
		indicador.classList.add('activo');
	}

	document.querySelector('.indicadores').appendChild(indicador);
	indicador.addEventListener('click', (e) => {
		fila.scrollLeft = i * fila.offsetWidth;

		document.querySelector('.indicadores .activo').classList.remove('activo');
		e.target.classList.add('activo');
	});
}

// ? ----- ----- Hover ----- -----
peliculas.forEach((pelicula) => {
	pelicula.addEventListener('mouseenter', (e) => {
		const elemento = e.currentTarget;
		setTimeout(() => {
			peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
			elemento.classList.add('hover');
		}, 300);
	});
});

fila.addEventListener('mouseleave', () => {
	peliculas.forEach(pelicula => pelicula.classList.remove('hover'));
});



//---------------------REPRODUCTOR---------//

var songs = [
	"./img/Darte un Beso.mp3",
	'./img/Eres Mia.mp3',
	'./img/GATUBELA.mp3',
	'./img/MAKINON.mp3',
	'./img/Necio.mp3',
	'./img/Solo Conmigo.mp3',
	'./img/Un beso.mp3',

  ];
  var currentSong = 0;
  var titles = [];
  var estaReproduciendo = false;
  
  var lcd = document.getElementById('lcd');
  var progreso = document.getElementById('progreso');
  var audio = document.getElementById('song');
  var lista = document.getElementById('lista');
  
  var btnPlay = document.getElementById('play');
  var btnPause = document.getElementById('pause');
  var btnStop = document.getElementById('stop');
  var btnPrev = document.getElementById('prev');
  var btnNext = document.getElementById('next');
  
  
  // -- Funciones -- //
  function inicializarReproductor() {
	for (i=0; i<songs.length; i++) {
	  // Obtenemos los títulos.
	  var title = songs[i];
	  // Escapamos.
	  title = unescape(title);
	  // Obtenemos título.
	  title = title.substring(
		title.indexOf(' - ')+7,
		title.lastIndexOf('.mp3')
	  );
	  // Añadimos títulos numerados.
	  title = (i+1)+" - "+title;
	  titles.push(title);
  
	  // Llenamos la lista de canciones.
	  var opt = document.createElement("option");
	  opt.value = i;
	  opt.innerHTML = title;
	  lista.appendChild(opt);
	}
	// Preparamos la primera canción para reproducir.
	prepararCancion();
  }
  
  function prepararCancion() {
	audio.src = songs[currentSong];
	lcd.querySelector('p').textContent = titles[currentSong];
	actualizarProgreso();
  }
  
  function irAPosicion(e) {
	var pos = (e.clientX - progreso.offsetLeft) / progreso.clientWidth;
	console.log(pos);
	audio.currentTime = audio.duration * pos;
  }
  
  function actualizarProgreso() {
	var progresoActual = audio.currentTime / audio.duration * 100;
	// Si no ha comenzado a reproducir, 'duration' es NaN.
	if (isNaN(progresoActual)) progresoActual = 0;
	progresoActual += '%';
	progreso.style.background = 'linear-gradient(to right, #38BF24 0%,#38BF24 '+progresoActual+',#111111 '+progresoActual+',#111111 100%)';
  }
  
  function finReproduccion() {
	siguiente();
  }
  
  function playMode(reproduciendo) {
	estaReproduciendo = reproduciendo;
	if (estaReproduciendo) {
	   btnPlay.className = 'oculto';
	   btnPause.className = '';
	} else {
	   btnPlay.className = '';
	   btnPause.className = 'oculto';
	}
  }
  
  
  // -- Controles del Reproductor -- //
  function reproducir() {
	console.log('reproducir()');
	audio.play();
	muestraLista(true);
	playMode(true);
  }
  function pausar() {
	console.log('pausar()');
	audio.pause();
	playMode(false);
  }
  function detener() {
	console.log('detener()');audio.pause();
	pausar();
	audio.currentTime=0;
	actualizarProgreso();
	//muestraLista(false);
	playMode(false);
  }
  function atras() {
	audio.currentTime-=10;
  }
  function adelante() {
	audio.currentTime+=10;
  }
  function anterior() {
	console.log('anterior()');
	currentSong--;
	if (currentSong-1 < 0) {
	  currentSong = songs.length-1;
	}
	prepararCancion();
	if (estaReproduciendo) reproducir();
	actualizaLista();
  }
  function siguiente() {
	console.log('siguiente()');
	currentSong++;
	if (currentSong >= songs.length) {
	  currentSong = 0;
	}
	prepararCancion();
	if (estaReproduciendo) reproducir();
	actualizaLista();
  }
  
  
  // -- Controles de la lista de temas -- //
  function reproducirLista() {
	currentSong = lista.selectedIndex;
	prepararCancion();
	reproducir();
  }
  function muestraLista(mostrar) {
	lista.className = mostrar? '' : 'listaOculta';
	actualizaLista();
  }
  function actualizaLista() {
	lista.selectedIndex = currentSong;
  }
  
  
  inicializarReproductor();

