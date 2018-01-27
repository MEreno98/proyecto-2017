$(document).ready(function() {

		//Realizamos la llamada ajax
		$.ajax({url: "php/getTermostatoConf.php", type: 'POST'})
		.done(function(data){
			var oResult = JSON.parse(data)
			
			//Comprobamos el resultado
			if (oResult.status) {
				//Dibujamos el termostato
				dibujarTermostato(oResult.values);
			}else{

			}
		})
		.fail(function(){
			console.log("error");
		});

		function dibujarTermostato(oData){
			console.log(oData);

			//Recorremos los datos
			for(var x = 0; x < oData.length; x++){
				//Añadimos la temperatura minima
				$("#" + (oData[x].diaSemana + "_temp")).append(oData[x].conf.temperatura + "ºC");

				//Obtenemos las horas
				var aHoras = oData[x].conf.horas;

				//Recorreos las horas
				for (var y = 0; y < aHoras.length; y++) {
					var vId = oData[x].diaSemana + "_" + aHoras[y];
					
					//Añadimos el icono
					$("#"+ vId).append('<i class="fa fa-fire" aria-hidden="true" style="color:red;"></i>');
				}
			}
		};
});