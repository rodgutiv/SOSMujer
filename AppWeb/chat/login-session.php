<?php
include('conexion.php');
$conn = '';
    
    	$conn = new Conexion('datosServer.php');
	    $conn = $conn->conectar();
		  
        $encontrado = false;
		$tels = '';
        $sql = "SELECT * FROM users WHERE telefono = ".$_POST['tel'];
        
        $result = $conn->query($sql);
            if ($result->num_rows > 0) {
                while($row = $result->fetch_assoc()) {
                    if (hash_equals($row["pass"], crypt($_POST['pass'], $row["pass"])) && strcmp($row["telefono"], $_POST['tel']) == 0)
                    {
						$tels = $row["telefono"].'@'.$row["telefonof"];
                        $encontrado = true;
                        break;
                    }
                }
            }
            
            $conn->close();
            if($encontrado)
            {
                echo $tels;
            }else echo -1;
 ?>
