<?php
	session_start();

	unset($_SESSION['authenticated']);
	unset($_SESSION['role']);
	$_SESSION['status'] = "ออกจากระบบสำเร็จ";
	header("location: login.php");

?>
