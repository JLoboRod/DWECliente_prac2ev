console.log("app.js cargado...");

document.addEventListener("DOMContentLoaded", Iniciar(), false);

function Iniciar(){
	var carton = new Carton();
	carton.generar();
	DibujaCarton(carton.get_carton());
}

/**
 * Crea el tablero en zonadibujo
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
	var zonacarton = document.getElementById("carton");
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