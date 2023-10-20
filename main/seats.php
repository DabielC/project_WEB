<?php
	session_start();
	$service_data = json_decode($_GET['data']);
	$_SESSION['booking']['service'] = $service_data;
	print_r($_SESSION['booking']);
?>
