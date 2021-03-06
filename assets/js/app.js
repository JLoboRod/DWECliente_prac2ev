/***********************************
 * Autor: Joaquín Lobo Rodríguez   *
 * Fecha creación: 13/01/2015      *
 * Última modificación: 10/03/2015 * 
 * Versión: 1.00                   *
 ***********************************/

console.log("app.js cargado...");

document.addEventListener("DOMContentLoaded", Iniciar(), false);

//GLOBAL
const TIEMPO = 5000; //Tiempo entre bola y bola en milisegundos
const ANCHO = 600, ALTO = 300; //Dimensiones de las ventanas emergentes
var cartones = []; //Tendremos una lista de cartones
var numerosBingo = []; //Los números que van saliendo
var ejecucion;
var jugadores;
var precio;
var ventana;

/**
 * Función que establece los listeners a los distintos controles
 */
function SetListeners(){
	document.getElementById("jugadores").addEventListener("blur", function(){onBlurJugadores();}, false);
	document.getElementById("precio").addEventListener("blur", function(){onBlurPrecio();}, false);
	document.getElementById("btn_comenzar").addEventListener("click", function(){IniciarJuego();}, false);

	console.log("Listeners asignados...");
}

/**
 * Se ejecuta al cargar el contenido DOM
 */
function Iniciar(){
	SetListeners();
	NumeroBombo("BINGOJS");
}

/**
 * Resetea la aplicación
 */
function Resetear(){
	//Habilitamos controles de nuevo
	document.getElementById("jugadores").disabled = false;
	document.getElementById("precio").disabled = false;
	document.getElementById("btn_comenzar").disabled = false;

	//Reinicializamos variables
	Parar_Ejecucion();
	numerosBingo = [];
	cartones = [];

	//Borramos carton y botón de bingo
	document.getElementById("zona_carton").removeChild(document.getElementById("cantar_bingo"));
	document.getElementById("zona_carton").removeChild(document.getElementById("carton"));

	NumeroBombo("BINGOJS");
}

/**
 * Función que inicia el juego
 */
function IniciarJuego(){
	var input_jugadores = document.getElementById("jugadores");
	var input_precio = document.getElementById("precio");
	var btn_comenzar = document.getElementById("btn_comenzar");

	//Inicializamos variables globales
	jugadores = input_jugadores.value;
	precio = input_precio.value;

	//Deshabilitamos los controles
	input_jugadores.disabled = true;
	input_precio.disabled = true;
	btn_comenzar.disabled = true;

	for (var i = 0; i < input_jugadores.value; i++) {
		var carton = new Carton();
		carton.generar();
		cartones.push(carton);	
	};

	DibujaCarton(cartones[0].get_carton());
	DibujaBotónBingo();
	Iniciar_Ejecucion();
}

/**
 * Para la ejecución setInterval
 */
function Parar_Ejecucion(){
	clearInterval(ejecucion);
}

/**
 * Inicia la ejecución
 */
function Iniciar_Ejecucion(){
	ejecucion = setInterval(SiguienteNumero, TIEMPO);
}

/**
 * Controla que no se sobrepasen los valores apropiados
 * en el número de jugadores
 * @return {[type]} [description]
 */
function onBlurJugadores(){
	var jugadores = document.getElementById("jugadores");
	if(jugadores.value<5){
		jugadores.value = 5;
	}
	else if(jugadores.value>20){
		jugadores.value = 20;
	}
}

/**
 * Controla que no se sobrepasen los valores apropiados
 * en el precio de los cartones
 * @return {[type]} [description]
 */
function onBlurPrecio(){
	var precio = document.getElementById("precio");
	if(precio.value<1){
		precio.value = 1;
	}
	else if(precio.value>5){
		precio.value = 5;
	}
}

/**
 * Función que se ejecuta cada vez que sale un nuevo número
 */
function SiguienteNumero(){
	if(numerosBingo.length<90){
		GetNumeroFromServer();
		if(numerosBingo.length>0){
			NumeroBombo(numerosBingo[numerosBingo.length - 1]); //Actualizamos la zona_bombo
		}
		/*//Este trozo de código se puede habilitar para comprobar el resto de cartones
		if(numerosBingo.length>=15 && ComprobarRestoBingos()){
			MostrarMensaje("Han cantado Bingo! Se acabó el juego.");
			Resetear();
		}
		*/
	}
	else{
		MostrarMensaje("Se acabaron los números...");
		Resetear();
	}
}

/**
 * Toma un número aleatorio mediante AJAX
 */
function GetNumeroFromServer(){
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
			if(numerosBingo.indexOf(parseInt(xmlhttp.responseText)) == -1)
			{
				console.log(xmlhttp.responseText);
				numerosBingo.push(parseInt(xmlhttp.responseText));
			}
			else{
				GetNumeroFromServer();
			}
		}
    }
    xmlhttp.open("POST", "server.php", true);
    xmlhttp.send();
}

/**
 * Muestra el número de bombo "numero" en pantalla 
 * @param {[type]} numero [description]
 */
function NumeroBombo(numero){
	document.getElementById("zona_bombo").innerHTML = "<div class='numero_bombo'>" + numero + "</div>";
}

/**
 * Dibuja el botón para cantar Bingo
 */
function DibujaBotónBingo(){
	var boton = document.createElement("input");
	boton.setAttribute("type", "button");
	boton.classList.add("btn");
	boton.classList.add("btn-rojo");
	boton.setAttribute("id", "cantar_bingo");
	boton.setAttribute("value", "Cantar Bingo!");
	boton.addEventListener("click", function(){CantarBingo();}, false);
	document.getElementById("zona_carton").appendChild(boton);
}

/**
 * Abre una ventana emergente con la url
 * pasada como parámetro
 * @param {[type]} url [description]
 */
function AbrirVentana(url){
	var opciones = "width=" + ANCHO + ", height=" + ALTO + ",left=" + eval((window.innerWidth - ANCHO)/2) + " , top=" + eval((window.innerHeight - ALTO)/2) + ", directories=no, menubar=no,status=no,toolbar=no,location=no,scrollbars=no,fullscreen=no";
	return window.open(url, "BINGO", opciones);
}


/**
 * Función Cantar Bingo
 */
function CantarBingo(){
	console.log("Han cantado Bingo!");
	Parar_Ejecucion();
	if(ComprobarBingo(cartones[0].get_numeros())){ //DUDA: Comprobamos marcados o números??
		//MostrarMensaje("Bingo Correcto!"); //Falta mostrar puntuación
		ventana = AbrirVentana("bingo_correcto.html");
	}
	else{
		//MostrarMensaje("Bingo Incorrecto. Seguimos jugando!");
		ventana = AbrirVentana("bingo_incorrecto.html");
	}
}

/**
 * Devuelve el premio del bingo
 */
function Premio(){
	return eval(0.8*(jugadores*precio)/CartonesPremiados());
}

/**
 * Muestra un mensaje mediante alert
 * @param {[type]} msj [description]
 */
function MostrarMensaje(msj){
	alert(msj);
}

/**
 * Dibuja el Carton c en pantalla
 * @param {[type]} c [description]
 */
function DibujaCarton(c)
{
 	console.log("Dibujando carton...");
 	var carton = document.createElement("table");
 	carton.classList.add("shadow"); //Para añadir sombra al cartón
 	carton.setAttribute("id", "carton");
 	carton.setAttribute("border", "1");
	for(var i=0;i<c.length;i++){ //Controla las filas
		var fila = document.createElement("tr");
		
		for(var j=0;j<c[i].length;j++){ //Controla las celdas o columnas
			var celda = document.createElement("td");
			celda.setAttribute("id", i + "_" + j); //Podríamos haberle puesto otro id
			if(c[i][j].valor === -1){
				celda.classList.add('hueco'); //La pseudoclase css .hueco tiene asociada la imagen del bombo
			}
			else{
				celda.innerHTML = c[i][j].valor;
				celda.addEventListener("click", function(){Marcar(this.id, c);}, false); //Establecemos listener de tipo click 	
			}
			fila.appendChild(celda); //Añadimos la celda a la fila		
		}
		carton.appendChild(fila); //Añadimos la fila al carton
	}
	//Por último, agregamos la carton al div correspondiente
	var zonacarton = document.getElementById("zona_carton");
	zonacarton.appendChild(carton);
}

/**
 * Marca o desmarca un número del cartón
 * @param {[type]} id     [description]
 * @param {[type]} carton [description]
 */
function Marcar(id, carton){
	var celda = document.getElementById(id);
 	var posicion = id.split('_');

 	if(carton[posicion[0]][posicion[1]].marcada){
 		carton[posicion[0]][posicion[1]].marcada = false;
 		celda.classList.remove('marcada');
 	}
 	else{
 		carton[posicion[0]][posicion[1]].marcada = true;
 		celda.classList.add('marcada');
 	}
}

/**
 * Comprueba si un Bingo es correcto
 * @param {[type]} numerosCarton [description]
 */
function ComprobarBingo(numerosCarton){
	//DEBUG: console.log(numerosCarton);
	var comprobar = true;
	do{
		comprobar = numerosBingo.indexOf(numerosCarton.shift()) != -1;
	}while(comprobar && numerosCarton.length>0);

	return comprobar;
}

/**
 * Comprueba si el resto de cartones tienen Bingo
 */
function ComprobarRestoBingos(){
	var bingo = false;
	if(numerosBingo.length>=15){ //Si no tenemos 15 números no es necesario comprobar Bingo	
		i = 1; //Empezamos en 1 porque el cartón 0 es el del jugador
		while(!bingo && i<jugadores){
			bingo = ComprobarBingo(cartones[i++].get_numeros());
		}
	}
	return bingo;
}

/**
 * Devuelve el número de cartones premiados
 */
function CartonesPremiados(){
	var premiados = 0;
	for(var i=0;i<cartones.length;i++){
		if(ComprobarBingo(cartones[i].get_numeros())){
			premiados++;
		}
	}
	return premiados;
}