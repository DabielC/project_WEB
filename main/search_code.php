<?php
	session_start();
	if ($_SERVER['REQUEST_METHOD'] === 'POST') {

		$response = 'success'; // or 'error message'

		echo $response;
	}

?>
