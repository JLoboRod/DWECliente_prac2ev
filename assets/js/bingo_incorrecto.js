console.log("bingo_incorrecto.js cargado...");

document.addEventListener("DOMContentLoaded", SetListeners(), false);

function SetListeners(){
	var boton = document.getElementById('btn_bingo_incorrecto');
	boton.addEventListener("click", function(){Continuar();}, false);
}

function Continuar(){
	window.opener.Iniciar_Ejecucion();
	window.close();
}