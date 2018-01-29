		var ultimaTemperatura="";
			var ultimaHumedad="";
			var diaSemana=-1;
			function datosACargar(){				
				ponerFechaActual();
				cargarGraficos(null);
				introducirDatosTabla();
				sacarUltimaTemperaturaHumedad();				
				setInterval(sacarUltimaTemperaturaHumedad, 3000);
				//actulizarDatosTermostato();
			}
			
			function sacarUltimaTemperaturaHumedad(){
				var date = new Date();				
				if(diaSemana != date.getDay()){
					diaSemana = date.getDay();
					var diaSem = diaSemana;
					if(diaSemana==0){
						diaSem=7;
					}					
					$("#diaSemana").html(diaSem);
				}
			
			
				$.ajax(
					{url: "php/sacarUltimaTemp.php", type: 'POST',data: { dato: "hola"} , success: function(result){
						var resultado=result;
						if(resultado!= "Error"){
							var json = JSON.parse(resultado);

							if(json.temperatura){
								//Vaciamos los divs
								$("#card-temperatura-act").empty();

								//Añadimos los nuevos valores
								$("#card-temperatura-act").html("Temperatura actua: "+json.temperatura + "ºC");
							}

							//Comprobamos que la humedad este vacia
							if(json.humedad){
								//Vaciamos los divs
								$("#card-humedad-act").empty();

								//Añadimos los nuevos valores
								$("#card-humedad-act").append("Humedad actual: "+json.humedad + "%");
							}
							/*console.log(JSON.parse(resultado));
							var json = JSON.parse(resultado);							
							if(ultimaTemperatura != json.temperatura){								
								ultimaTemperatura=json.temperatura;								
								//$("#tempHumHor h6").html(json.temperatura+" º C");
								setActualValues(json.temperatura);
							}
							if(ultimaHumedad!=json.humedad){
								ultimaHumedad=json.humedad;
								//$("#tempHumHor span").html(json.humedad+"%");
								setActualValues(null, json.humedad);
							}*/	
							
						}else{
							console.log("a");
						}	
					}}
				);
				
			}

		
			function ponerFechaActual(){
				var date = new Date();

				var day = date.getDate();
				var month = date.getMonth() + 1;
				var year = date.getFullYear();

				if (month < 10) month = "0" + month;
				if (day < 10) day = "0" + day;

				var today = year + "-" + month + "-" + day;       
				$("#calendario").attr("value", today);
				$("#calendario").attr("max", today);
			
				
			}
		
			function  cargarGraficos(fechaActual){				
				var fechaString="";
				var fecha= new Date();	
				fechaString= fecha.getFullYear()+"-"+(((fecha.getMonth()+1)>=10)? (fecha.getMonth()+1) : '0' + (fecha.getMonth()+1))+"-"+(((fecha.getDate())>=10)? (fecha.getDate()) : '0' + (fecha.getDate()));
				if(fechaActual != null){
					fechaString = fechaActual;
					
				}				
				
				$.ajax(
					{url: "php/sacarDatosGrafico.php", type: 'POST',data: { fecha: fechaString} , success: function(result){
						var resultado=result;
						if(resultado!= "Error"){						
							console.log(JSON.parse(resultado));						
							graficos(resultado);
						}else{							
							$("#chart-container").html("<span>No se ha encontrado <b>níngun resultado </b> para la  fecha <b>"+fechaString+"</b>.</span>");
						}	
					}}
				);
				
				$.ajax(
					{url: "php/sacarDatosMediaGrafico.php", type: 'POST',data: { dato: "hola"} , success: function(result){
						var resultado=result;
						if(resultado!= "Error"){						
							console.log(JSON.parse(resultado));						
							grafico1(resultado);
						}else{							
							$("#chart-container1").html("<span>No se ha encontrado <b>níngun resultado </b>.</span>");
						}	
					}}
				);
			}
			function graficos(result){
				try{		
				  var avgBallChart = new FusionCharts({
					  type: 'zoomlinedy',
					  renderAt: 'chart-container',
					width: '100%',
					height: '400',
					dataFormat: 'json'					
				  });
				  avgBallChart.render();
				avgBallChart.setChartData(result, "json");
				}catch(ex){
					console.error(ex);
				}
			}
			
			function grafico1(result){	
				try{
				  var avgBallChart = new FusionCharts({
					  type: 'column3d',
					  renderAt: 'chart-container1',
					width: '100%',
					height: '400',
					dataFormat: 'json'					
				  });
				  avgBallChart.render();
				avgBallChart.setChartData(result, "json");
				} catch(ex){
					console.error(ex);
				}
			}
			
			function actualizarGrafico(){				
				cargarGraficos($("#calendario").val());				
			}
			
			function mostrarOcultarProgTermos(){				
				if($("#programarTermostato").is(':checked')){
					$("#configurarTermostato").show();
				}else{
					$("#configurarTermostato").hide();
				}
			}
			
			function validarConfiguracionTermostato(){
				var confDiasSemana=getSelectValues();				
				var confHorasEnc=getCheckBoxValues();
				var	temperaruta=$('#temperatura').val();
				
				var error = false;
				var mensaje="";
				if(confDiasSemana.length==0){					
					error=true;
					mensaje="Seleccione como mininimo un día de la semana.";					
				}else if($('#temperatura').val()=="" || isNaN($('#temperatura').val())){					
					error=true;
					mensaje="Introduzca la temperatura máxima de encendido.";					
				}else if(confHorasEnc.length==0){
					error=true;
					mensaje="Seleccione como mininimo una hora de encendico.";
				}
				
				if(error){
					alert(mensaje);
					return false;									
				}else{
					var r = confirm("Si existe configuración para algun día de la semana seleccionado. Se borra dicha configuración. ¿Acepta dicha opreación?");
					if (r == true) {
						$.ajax(
							{url: "php/insertarConfiguracionTermometro.php", type: 'POST', data: { dato: "hola",confDiasSemana: confDiasSemana,confHorasEnc:confHorasEnc , temperaruta: temperaruta} , success: function(result){
								if(result == "OK"){
									location.reload();
								}else{
									alert("Error al guardar la configuración.");
								}
							}}
						);	
					}
				}
				
				
			}
			
			function getSelectValues() {
				  var result = [];				  
				  
				  $('#confDiasSemana :selected').each(function(i, selectedElement) {
					 result[i] = $(selectedElement).val();					 
					 
					});
					
				  
				  return result;
			}
			
			function getCheckBoxValues() {				
				var result = [];				  
				  
				$('.horas:checked').each(function(i, selectedElement) {
					result[i] = $(selectedElement).val();
				});
					
				  
				return result;
			}
			
			function contains(dato) {
				return dato == this;
			}
			
			function actulizarDatosTermostato(){				
				var date = new Date();
				diaSemana = date.getDay();					
				if(diaSemana==0){
					diaSemana=7;
				}	
				
				$.ajax(
					{url: "php/sacarDatosConfiguracionTermometro.php", type: 'POST',data: { dato: "hola",diaSemana: diaSemana } , success: function(result){
						var resultado=result;
						if(resultado!= "Error"){	
							var json =JSON.parse(resultado);
							$("#temperarutaMax").html(json.tempraturaMax+" ºC");
							
							var horasActivadasArray = json.horasActi.split("|");							
							$("#programadasHoras .valorHoras").each(function( index ) {
								if(horasActivadasArray.some(contains,index)){
									$(this).css("background-color","red");
								}else{
									$(this).css("background-color","");
								}
							
								console.log( index + ": " + $( this ).text() );
							});							
							
							
							//alert(horasActivadasArray);
						}	
					}}
				);
			}
			
			function introducirDatosTabla(){
				$.ajax(
					{url: "php/sacarDatosTabla.php", type: 'POST',data: { dato: "hola" } , success: function(result){
						var resultado=result;
						if(resultado!= "Error"){	
							
							$("#datosTabla").html(resultado);
							
							$('#dataTable').DataTable({
									"language": {
										"url": "//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/Spanish.json"
									}
								} 
							  );
							
							//alert(horasActivadasArray);
						}	
					}}
				);
			}