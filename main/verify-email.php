<?php
	session_start();
	include('dbcon.php');

	if(isset($_GET['token']))
	{
		$token = $_GET['token'];
		$verify_query =<<<EOF
						SELECT verify_token, verify_status FROM users WHERE verify_token='$token' LIMIT 1;
						EOF;
		$verify_query_run = $db->query($verify_query);

		if($verify_query_run)
		{
			$row = $verify_query_run->fetchArray(SQLITE3_ASSOC);
			if($row['verify_status'] == 0)
			{
				$clicked_token = $row['verify_token'];
				$update_query =<<<EOF
					UPDATE users
					SET verify_status = 1
					WHERE verify_token = '$clicked_token';
				EOF;
				$update_query_run = $db->exec($update_query);

				if($update_query_run)
				{
					$_SESSION['status'] = "ยืนยันอีเมลสำเร็จ";
					header("location: login.php");
					exit(0);
				}
				else
				{
					$_SESSION['status'] = "Verification Failed";
					$db->lastErrorMsg();
					// header("location: login.php");
					// exit(0);
				}
			}
			else if ($row['verify_status'] == 1)
			{
				$_SESSION['status'] = "Email already Verified. Please Login";
				header("location: login.php");
				exit(0);
			}
		}
		else
		{
			$_SESSION['status'] = "This token does not exists";
			header("location: login.php");
		}

	}
	else
	{
		$_SESSION['status'] = "Not Allowed";
		header("location: login.php");
	}

?>
