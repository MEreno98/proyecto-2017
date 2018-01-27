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

		$("#btn_saveConf").click(function(){
			var vTemperatura = $("#imp_temp").val();
			var vDias = $("#slt_diaSemana").val();
			var vHoras = $("#slt_horas").val();

			//Comprbamos si todos los datos estan rellenos
			if(vTemperatura.trim() === "" || vDias.length === 0 || vHoras.length === 0){
				//Vaciamos el contenedor
				$("#alert_container").empty();

				//Añadadimos el alert
				$("#alert_container").append(getAlert("danger","Por favor, rellene todos los datos obligatorios."));
				return;
			}else{
				//Vaciamos el contenedor
				$("#alert_container").empty();
			}

			
		});


		function getAlert(type,message){
			return '<div class="alert alert-' + type + '" role="alert">' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
		}

});