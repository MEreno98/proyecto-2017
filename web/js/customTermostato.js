$(document).ready(function() {

		function getConfiguracion() {
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
		}

		//Obtener configuracion
		getConfiguracion();

		function dibujarTermostato(oData){
			console.log(oData);

			//Vaciamos la tabla
			$(".t-row").empty();

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

			//Guardamos el configuracion
			saveConfiguracion(vTemperatura, vDias, vHoras);	
		});

		function saveConfiguracion(vTemperatura, vDias, vHoras) {
			$.ajax({url:"php/insertarConfiguracionTermometro.php", type:"POST", data:{dato:"hola", confDiasSemana: vDias, confHorasEnc: vHoras, temperaruta: vTemperatura}})
			.done(function(result){
				if(result == "OK"){
					//Mostramos mensaje de success
					$("#alert_container").empty();

					//Añadimos el mensaje success
					$("#alert_container").append(getAlert("success","Configuración del termostato guardada correctamente."));

					//Actualizamos la configuracion
					getConfiguracion();

					//Vaciamos el el formularios
					$("#imp_temp").val("");
					$("#slt_diaSemana").val([]);
					$("#slt_horas").val([]);

				}else{
					//Mostramos mensaje de error
					$("#alert_container").empty();

					//Añadimos el mensaje error
					$("#alert_container").append(getAlert("danger","Error al guardar la configuración del termostato."));
				}
			})
			.fail(function(){
				console.log("error");
			});
		}


		function getAlert(type,message){
			return '<div class="alert alert-' + type + '" role="alert">' + message + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
		}
});