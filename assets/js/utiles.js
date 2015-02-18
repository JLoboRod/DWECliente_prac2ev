console.log("útiles cargado...");

/**
 * Función que crea n valores aleatorios "no repetidos" 
 * "ordenados" de menor a mayor entre los valores ini y 
 * fin incluyendo los extremos
 * @param int ini 
 * @param int fin 
 * @param int n
 * @return  int or array[int] según n
 */
function Alea(ini, fin, n)
{
	var numeros = [];
	var i = 0;
	if(!n || n<=0)
	{
		//console.log("No hay n o es menor que cero");
		return Math.floor(Math.random()*(fin-ini+1)) + ini;
	}
	else
	{
		while(numeros.length < n)
		{
			var alea = Math.floor(Math.random()*(fin-ini+1)) + ini;
			if(numeros.indexOf(alea) == -1)
			{
				numeros.push(alea);
				//console.log(alea);
			}
		}
		return numeros.sort(function(a,b){return a-b;});
	}
}