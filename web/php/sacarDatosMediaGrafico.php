<?php	
	if(isset($_POST['dato'])){
		include "conexion.php";
		
			
		
		//$numrows=mysqli_num_rows($resultado);
		
		$algundato=false;
			
		$arrayTemperaturaMedia=null;				
		
		for($i=1;$i<=12;$i++){
		
			$mes=$i."";
			if($i<10){
				$mes="0".$i;
			}
			$sql="SELECT  CAST(AVG(`temperatura`) AS DECIMAL(10,2))  as media  FROM `mediciones` WHERE `fecha` like '%-$mes-%'";			
			
			$resultado = mysqli_query($conn,$sql);
			
			while($fila = mysqli_fetch_array($resultado)) {		
				if($fila["media"] != null){
					$arrayTemperaturaMedia[]=$fila["media"];				
					$algundato=true;
				}else{
					$arrayTemperaturaMedia[]=0;
				}
			}
		}
			
		if($algundato){
			
			
			
			$someJSONObject = json_encode(array(
                'chart' => array(
                    'caption'=> 'Temperatura Media por Mes',                    
                    "yAxisName"=> "Temperatura Media",            
					"numDivLines"=> "5",
					"showValues"=> "0",
					"rotateLabels"=> "1",
					"slantLabels"=> "1",
					"plotSpacePercent"=> "40",
					"paletteColors"=> "#81BB76",
					"columnHoverAlpha"=> "80",
					"canvasBaseDepth"=> "5",
					"showBorder"=> "0",
					"showYAxisLine"=> "0",
					"canvasBorderAlpha"=> "100",
					"yAxisValuesPadding"=> "10",
					"showLimits"=> "0",
					"divlineColor"=> "#994d00",
					"divLineIsDashed"=> "1",
					"divLineDashLen"=> "5",
					"theme"=>"hulk-light"
                ),                
                'data' => array(
                    array("label"=>"Enero","value"=>$arrayTemperaturaMedia[0]),
                    array("label"=>"Febrero","value"=>$arrayTemperaturaMedia[1]),
                    array("label"=>"Marzo","value"=>$arrayTemperaturaMedia[2]),
                    array("label"=>"Abril","value"=>$arrayTemperaturaMedia[3]),
                    array("label"=>"Mayo","value"=>$arrayTemperaturaMedia[4]),
                    array("label"=>"Junio","value"=>$arrayTemperaturaMedia[5]),
                    array("label"=>"Julio","value"=>$arrayTemperaturaMedia[6]),
                    array("label"=>"Agosto","value"=>$arrayTemperaturaMedia[7]),
                    array("label"=>"Septiembre","value"=>$arrayTemperaturaMedia[8]),
                    array("label"=>"Octubre","value"=>$arrayTemperaturaMedia[9]),
                    array("label"=>"Noviembre","value"=>$arrayTemperaturaMedia[10]),
                    array("label"=>"Diciembre","value"=>$arrayTemperaturaMedia[11])
                )
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