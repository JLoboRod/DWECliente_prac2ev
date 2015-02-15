console.log("carton.js cargado...");

var Carton = function(){

	var _c = [[],[],[]];

	this.generar = function(){
		//Creamos las columnas y vamos insertándolas en el cartón
		for (var j = 0; j < 9; j++) {
			var columna = (j==8)? Alea(10*j, 10*(j+1), 3):Alea(10*j, 10*(j+1)-1, 3);
			columna.sort(function(a,b){return a-b;}); //Ordenamos los valores de menor a mayor
			for(var i = 0; i < 3; i++)
			{
				_c[i][j] = {
					'valor': columna[i],
					'marcada' : false
				}
			}
		};

		//Fijamos 4 huecos libres aleatorios por fila
		for (var i = 0; i < 3; i++) {
			var huecos = Alea(0,8,4);
			while(huecos.length>0)
			{
				_c[i][huecos.shift()].valor = -1;
			}	
		};
	}

	this.get_carton = function(){ return _c;};
	this.get_marcados = function(){
		var result = [];
		for (var i = 0; i < _c.length; i++) {
			for (var j = 0; j < _c[i].length; j++) {
				if(_c[i][j].marcada){
					result.push(_c[i][j].valor);
				}
			};
		};
		return result.sort(function(a,b){return a-b;}); //Con esto devolvemos el resultado ordenado
	}

	return this; 
};