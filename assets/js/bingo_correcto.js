/***********************************
 * Autor: Joaquín Lobo Rodríguez   *
 * Fecha creación: 13/01/2015      *
 * Última modificación: 10/03/2015 * 
 * Versión: 1.00                   *
 ***********************************/

console.log("bingo_correcto.js cargado...");

document.addEventListener("DOMContentLoaded", Iniciar(), false);

function Iniciar(){
	SetPremio(window.opener.Premio());
	SetListeners();
}

function SetPremio(premio){
	console.log(document.getElementById("premio"));
	document.getElementById("premio").innerHTML += premio + " €";
}

function SetListeners(){
	var boton = document.getElementById('btn_bingo_correcto');
	boton.addEventListener("click", function(){Terminar();}, false);
}

function Terminar(){
	window.opener.Resetear();
	window.close();
}