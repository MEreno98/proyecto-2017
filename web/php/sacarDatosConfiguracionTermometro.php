<?php	
	if(isset($_POST['dato'])){
		include "conexion.php";	
		
		
		
		$sql="SELECT * FROM `configuracion` WHERE `diaSemana`=".$_POST['diaSemana'];
				
		
		$resultado = mysqli_query($conn,$sql);

		$numrows=mysqli_num_rows($resultado);
		
		$tempraturaMax="";
		$horasActi="";
		$contador=0;
		if($numrows>0){
			while($fila = mysqli_fetch_array($resultado)) {	
				if($fila['tipo']=="t"){
					$tempraturaMax=$fila['dato'];					
				}else{					
					$horasActi.=$fila['dato'];
					if(($contador+1)<$numrows){
						$horasActi.="|";
					}
				}
				$contador++;
			}
			
			$someJSONObject = json_encode(array(
				'tempraturaMax' => $tempraturaMax,
				'horasActi' => $horasActi				
			));
			echo $someJSONObject;
		}else{
			echo "Error";
			
		}
		
		
		mysqli_close($conn);
		
		
	}else{
		echo "Error";
	}
?>