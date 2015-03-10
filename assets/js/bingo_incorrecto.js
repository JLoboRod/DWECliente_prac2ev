/***********************************
 * Autor: Joaquín Lobo Rodríguez   *
 * Fecha creación: 13/01/2015      *
 * Última modificación: 10/03/2015 * 
 * Versión: 1.00                   *
 ***********************************/

console.log("bingo_incorrecto.js cargado...");

document.addEventListener("DOMContentLoaded", SetListeners(), false);

function SetListeners(){
	var boton = document.getElementById('btn_bingo_incorrecto');
	boton.addEventListener("click", function(){Continuar();}, false);
}

function Continuar(){
	window.opener.Iniciar_Ejecucion(); //Reanudamos la ejecución
	window.close();
}