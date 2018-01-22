<?php	
	if(isset($_POST['dato'])){
		include "conexion.php";
		
		
		//$fecha="2018-01-18";
		
		
		//echo $_POST['fecha'];
		//$sql="SELECT * FROM mediciones WHERE fecha like '".$fecha."%' LIMIT 0,20";
		$sql="SELECT * FROM mediciones Order by fecha desc LIMIT 0,1";
		//echo $sql;
		$resultado = mysqli_query($conn,$sql);	
		
		$numrows=mysqli_num_rows($resultado);
		
		if($numrows!=0){
		
			$humedad="";
			$temperatura="";					
			
			
			while($fila = mysqli_fetch_array($resultado)) {			
				$humedad= $fila["humedad"];			
				$temperatura= $fila["temperatura"];
			}
			
			//print_r($contador);
			
			$someJSONObject = json_encode(array(
					'humedad' => $humedad,
					'temperatura' => $temperatura
			),true);
			
			echo $someJSONObject;
		}else{
			echo "Error";
		}
		
		mysqli_close($conn);
		
		
	}else{
		echo "Error";
	}
?>