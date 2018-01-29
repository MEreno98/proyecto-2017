<?php	
	if(isset($_POST['dato'])){
		include "conexion.php";
		
			
		$sql="SELECT * FROM mediciones order by fecha desc LIMIT 1000";
		$resultado = mysqli_query($conn,$sql);	
		
		$numrows=mysqli_num_rows($resultado);
		if($numrows>0){
		
			$datos="";					
			
			while($fila = mysqli_fetch_array($resultado)) {			
				$datos.="<tr>";
					$datos.="<td>";
						$datos.=$fila['id'];					
					$datos.="</td>";
					$datos.="<td>";
						$datos.=explode(" ",$fila['fecha'])[0];
					$datos.="</td>";
					$datos.="<td>";
						$datos.=explode(" ",$fila['fecha'])[1];
					$datos.="</td>";
					$datos.="<td>";
						$datos.=$fila['temperatura']." ºC";
					$datos.="</td>";
					$datos.="<td>";
						$datos.=$fila['humedad']." %";
					$datos.="</td>";
				
				$datos.="</tr>";
				
			}
			
			//print_r($contador);
			
			


            echo $datos;
		}else{
			echo "Error";
		}
		
		mysqli_close($conn);
		
		
	}else{
		echo "Error";
	}
?>