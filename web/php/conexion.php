<?php	
	
	$servername = "localhost";
	$username = "root";
	$password = "root";
	//$password = "";
	$datebase="arduino";
	// Create connection
	$conn = mysqli_connect($servername, $username, $password,$datebase);

	// Check connection
	if(mysqli_connect_errno($conn)) {
		echo "Error";
		die("Connection failed: " . mysqli_connect_error());
	} 	
		
		
?>