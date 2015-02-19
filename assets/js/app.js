console.log("app.js cargado...");

document.addEventListener("DOMContentLoaded", Iniciar(), false);

//GLOBAL
var cartones = []; //Tendremos una lista de cartones
var numerosBingo = []; //Los números que van saliendo

/**
 * Función que establece los listeners a los distintos controles
 */
function setListeners(){
	document.getElementById("jugadores").addEventListener("blur", function(){onBlurJugadores();}, false);
	document.getElementById("precio").addEventListener("blur", function(){onBlurPrecio();}, false);
	document.getElementById("btn_comenzar").addEventListener("click", function(){IniciarJuego();}, false);

	console.log("Listeners asignados...");
}

/**
 * Se ejecuta al cargar el contenido DOM
 */
function Iniciar(){
	setListeners();
}

/**
 * Función que inicia el juego
 */
function IniciarJuego(){
	var input_jugadores = document.getElementById("jugadores");
	var input_precio = document.getElementById("precio");
	var btn_comenzar = document.getElementById("btn_comenzar");


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
	NumeroBombo(12);
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
 * Muestra el número de bombo "numero" en pantalla 
 * @param {[type]} numero [description]
 */
function NumeroBombo(numero){
	document.getElementById("zona_bombo").innerHTML = "<div class='numero_bombo'>" + numero + "</div>";
}

/**
 * Dibuja el botón para cantar Bingo
 * @return {[type]} [description]
 */
function DibujaBotónBingo(){
	var boton = document.createElement("input");
	boton.setAttribute("type", "button");
	boton.classList.add("button");
	boton.setAttribute("id", "cantar_bingo");
	boton.setAttribute("value", "Cantar Bingo!");
	boton.addEventListener("click", function(){CantarBingo();}, false);
	document.getElementById("zona_carton").appendChild(boton);
}

/**
 * Función Cantar Bingo
 */
function CantarBingo(){
	console.log("Han cantado Bingo!");
}

/**
 * Dibuja el Carton c en pantalla
 * @param {[type]} c [description]
 */
function DibujaCarton(c)
{
 	console.log("Dibujando carton...");
 	var carton = document.createElement("table");
 	carton.setAttribute("class", "carton");
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