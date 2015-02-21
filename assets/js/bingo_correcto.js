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