<?php 
echo 1;
/*
$host = "localhost";
$user = "root";
$pass = "";

$dbName = "hackton";
$tablaUsuarios = "users";
$tablaAlertas = "alertas";

$telefonoUsuario = $_POST['telefonousuario'];

$con = mysql_connect($host,$user,$pass);
$dbs = mysql_select_db($dbName,$con);

$result = mysql_query("SELECT u.nombre, u.domicilio, u.telefonof, a.* FROM users AS u INNER JOIN alertas AS a ON u.telefono = a.telefono WHERE u.telefono = ".$telefonoUsuario." AND DATE(a.fecha_hora) = CURDATE()  ORDER BY a.fecha_hora DESC");

	if (!$result)
	{
		echo 'error en la consulta' . mysql_error();
		exit();
	}
	
	$fila = mysql_fetch_row($result);

	//Son 6 Campos del registro...
	$cadenaDatos = $fila[0].'@'.$fila[1].'@'.$fila[2].'@'.$fila[4].'@'.$fila[5].'@'.$fila[6];

	echo $cadenaDatos;
*/
?>