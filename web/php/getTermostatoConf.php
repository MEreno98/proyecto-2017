<?php	
	include "conexion.php";

	/*Comprobar conexion*/
	if (mysqli_connect_errno()) {
    	printf("Falló la conexión: %s\n", mysqli_connect_error());
    	exit();
	}

	$consulta = "SELECT * FROM configuracion ORDER BY diaSemana ASC";
	$configuracion = array();
	$xConf = 0;
	$xTemp = 0;


	/* Consultas de selección que devuelven un conjunto de resultados */
	if ($resultado = mysqli_query($conn, $consulta)) {
    	$numrows = mysqli_num_rows($resultado);

    	//Recorremos el resultado
   		while ($row = mysqli_fetch_array($resultado)) {
   			//comparamos si el array esta vacio
   			if(count($configuracion) == 0){
   				//Guardamos el dia de la semana
   				$configuracion[$xConf]["diaSemana"] = $row["diaSemana"];
   				
   				//Comparamos el tipo
   				if($row["tipo"] == "t"){
   					//Añadimos la configuracion
   					$configuracion[$xConf]["conf"]  = array('temperatura' => $row["dato"], "horas" => array());
   				}else if($row["tipo"] == "h"){
   					//Añadimos la configuracion
   					$configuracion[$xConf]["conf"] = array('temperatura' => "", "horas" => array($xTemp => $row["dato"]));

   					//Aumentamos contador
   					$xTemp++;
   				}

   			}else{
   				//Comparamos el dia de la semana
   				if($configuracion[$xConf]["diaSemana"] == $row["diaSemana"]){

   					//Comparamos el tipo
   					if($row["tipo"] == "t"){
   						//Añadimos la temperatura
   						$configuracion[$xConf]["conf"]["temperatura"] = $row["dato"];
   					}else if($row["tipo"] == "h"){
   						//Añadimos la hora
   						$configuracion[$xConf]["conf"]["horas"][$xTemp] = $row["dato"];

   						//Aumentamos contador
   						$xTemp++;
   					}
   				}else{
					//Aumentamos contador
					$xConf++;

   					//Guardamos el dia de la semana
   					$configuracion[$xConf]["diaSemana"] = $row["diaSemana"];
   					$xTemp = 0;
   					
   					//Comparamos el tipo
   					if($row["tipo"] == "t"){
   						//Añadimos la configuracion
   						$configuracion[$xConf]["conf"]  = array('temperatura' => $row["dato"], "horas" => array());
   					}else if($row["tipo"] == "h"){
   						//Añadimos la configuracion
   						$configuracion[$xConf]["conf"] = array('temperatura' => "", "horas" => array($xTemp => $row["dato"]));

   						//Aumentamos contador
   						$xTemp++;
   					}
   				}
   			}
   		}
    	
	}

	//Cerramos conexiom
	mysqli_close($conn);

	//Comprbamos si el array esta vacio
	if(count($configuracion) != 0){
		//Convertimos el array confifguracion a json
		$jsonRetun = json_encode(array('status' => true, 'values'  => $configuracion));

	}else{
		//Creamos un json como respuesta
		$jsonRetun = json_encode(array('status' => false));
	}

	//Devolvemos el json
	echo $jsonRetun;
?>