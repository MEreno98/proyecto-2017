<?php	
	if(isset($_POST['dato'])){
		include "conexion.php";	
		
		
		
		$sql="INSERT INTO `configuracion`(`diaSemana`, `dato`, `tipo`) VALUES";
		
		for($i=0;$i<count($_POST['confDiasSemana']);$i++){
			$sqlConfiguracionSemana="DELETE FROM `configuracion` WHERE `diaSemana`= ".$_POST['confDiasSemana'][$i];
			$resultadoBorrado = mysqli_query($conn,$sqlConfiguracionSemana);
			
			$sql.="(".$_POST['confDiasSemana'][$i].",".$_POST['temperaruta'].",'t'),";			
			for($j=0;$j<count($_POST['confHorasEnc']);$j++){
				$sql.="(".$_POST['confDiasSemana'][$i].",".$_POST['confHorasEnc'][$j].",'h')";
				if(($j)!=(count($_POST['confHorasEnc'])-1) || ($i)!=(count($_POST['confDiasSemana'])-1)){
					$sql.=",";										
				}
			}
			
		}
				
		$resultado = mysqli_query($conn,$sql);	
		
		mysqli_close($conn);

		echo "OK";
		
	}else{
		echo "Error";
	}
?>
