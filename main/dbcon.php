<?php
	// 1. Connect to Database
	class MyDB extends SQLite3 {
		function __construct() {
		$this->open('database/airline_db.db');
		}
	}

	// 2. Open Database
	$db = new MyDB();
	// if(!$db) {
	// 	echo $db->lastErrorMsg();
	// } else {
	// 	echo "Opened database successfully<br>";
	// }

?>
