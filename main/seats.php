<?php
	session_start();
	$page_title = "จัดการที่นั่งและสัมภาระ";
	include('includes/head.php');
	include("includes/navbar.php");
	include("dbcon.php");
	$service_data = json_decode($_GET['data']);
	$_SESSION['booking']['service'] = $service_data;
	print_r($_SESSION['booking']);

	$sql_out = "SELECT seat_no FROM passenger
			WHERE flight_id = '" . $_SESSION['booking']['booking']['out']['out_id'] . "'";
	$ret_out = $db->query($sql_out);
	$seat_out_table = [];
	while($row = $ret_out->fetchArray(SQLITE3_ASSOC))
	{
		array_push($seat_out_table, $row);
	}


?>
<link rel="stylesheet" href="static/seat.css">

<div class="flex flex-col items-center justify-center bg-white text-gray-800">
	<div class="border p-4 rounded-md shadow-md m-5">
			<h1 class="text-3xl font-semibold mb-6 text-left text-color-primary">กระเป๋าเดินทาง</h1>
			<div class="p-4 space-y-4 h-40 overflow-x-hidden overflow-y-scroll w-auto m-5">

				<?php for($i = 0; $i<$_SESSION['booking']['booking']['pas_num']; $i++){?>
				<div class=" justify-between items-center sm:flex">
					<div class="flex-1 text-center mx-2">
						<h3 class="text-black text-md font-semibold m-4 text-center">คุณ : <?php echo $_SESSION['booking']['passenger'][$i]['firstname']?></h3>
					</div>
					<div class="flex-1 text-center mx-2">
						<h3 class="text-black text-sm font-semibold mb-4">เพิ่มน้ำหนักสัมภาระขาไป</h3>
						<input id="go_lug_<?php echo $i;?>" name="go_lug_<?php echo $i;?>" type="number"
						class="w-full h-10 rounded-md focus:outline-none hover:bg-gray-200 px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6"
						value=0
						data-index=<?php echo $i;?>
						>
					</div>
					<div class="flex-1 text-center mx-2">
						<h3 class="text-black text-sm font-semibold mb-4">เพิ่มน้ำหนักสัมภาระขากลับ</h3>
						<input id="back_lug_<?php echo $i;?>" name="back_lug_<?php echo $i;?>" type="number"
						class="w-full h-10 rounded-md focus:outline-none hover:bg-gray-200 px-3 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-950 sm:text-sm sm:leading-6"
						value=0
						data-index=<?php echo $i;?>
						>
					</div>
				</div>
				<?php } ?>
			</div>
			<div class="text-left text-lg text-red-600 font-semibold">
					ผู้โดยสารสามารถซื้อกระเป๋าสัมภาระล่วงหน้าได้ไม่เกิน 45 กิโลกรัม
			</div>
		</div>
</div>

	<div class="flex flex-col items-center justify-center bg-white text-gray-800">
	<div class="border p-4 rounded-md shadow-md m-5 text-center">
	<h1 class="text-3xl font-semibold mb-6 text-left text-color-primary">ที่นั่ง</h1>
		<ul class="showcase">
			<li>
				<div class="seat"></div>
				<small>ที่ว่าง</small>
			</li>
			<li>
				<div class="seat selected"></div>
				<small>ที่นั่งที่เลือก</small>
			</li>
			<li>
				<div class="seat sold"></div>
				<small>ไม่ว่าง</small>
			</li>
		</ul>

		<div class="container_seat">
			<div class="row">
				<div class="seat_name"></div>
				<div class="seat_name">A</div>
				<div class="seat_name">B</div>
				<div class="seat_name">C</div>
				<div class="seat_name">D</div>
				<div class="seat_name">E</div>
				<div class="seat_name">F</div>
			</div>
			<div class="scroll">
				<?php
				for($i = 1; $i < 21; $i++){
					?>
				<div class="row">
					<div class="seat_number"><?php echo $i;?></div>
					<?php
					$seatLetters = ['A', 'B', 'C', 'D', 'E', 'F'];
					foreach ($seatLetters as $letter) {
						$check = FALSE;
						$seatId = $letter . $i;
						foreach($seat_out_table as $row)
						{
							if($seatId == $row['seat_no'])
							{
								$check = TRUE;
								echo "<button class='seat sold' id='$seatId' value='$seatId'></button>";
							}
						}

						if($check != TRUE)
						{
							echo "<button class='seat' id='$seatId' value='$seatId'></button>";
						}

					}
					?>
				</div>
				<?php }?>
			</div>
		</div>

		<p id="text"></p>
	</div>
	</div>

    <script>
		const container = document.querySelector(".container_seat");
		const seats = document.querySelectorAll(".row .seat:not(.sold)");
		const count = document.getElementById("text");
		let seat_no = [];

		// Update total and count
		const passengerContainer = document.getElementById("text");

		// Update total and count
		function updateSelectedCount(seat_no) {
			const selectedSeats = document.querySelectorAll(".row .seat.selected");
			const selectedSeatsCount = selectedSeats.length;

			const passengerData = <?php echo json_encode($_SESSION['booking']['passenger']); ?>;

			passengerContainer.innerHTML = "";

			selectedSeats.forEach((seat, index) => {
				const passengerIndex = index % passengerData.length;
				const passengerFirstname = passengerData[passengerIndex]['firstname'];
				const seatNumber = seat_no[index];


				// Create a new p element
				const passengerElement = document.createElement("p");
				passengerElement.id = index + 1;
				passengerElement.dataset.seat = seatNumber;
				passengerElement.innerText = `คุณ : ${passengerFirstname} ${seatNumber}`;
				passengerContainer.appendChild(passengerElement);
			});


			return selectedSeatsCount;
		}


		container.addEventListener("click", (e) => {
		if (e.target.classList.contains("seat")
		&& !e.target.classList.contains("selected")
		&& !e.target.classList.contains("sold")
		&& updateSelectedCount(seat_no) < <?php echo $_SESSION['booking']['booking']['pas_num']?>)
		{
			e.target.classList.toggle("selected");
			seat_no.push(e.target.value);

			updateSelectedCount(seat_no);
		}
		else if(e.target.classList.contains("selected") && !e.target.classList.contains("sold"))
		{
			e.target.classList.toggle("selected");
			seat_no.splice(seat_no.indexOf(e.target.value), 1);
			updateSelectedCount(seat_no);
		}
		});

		//prevent minus
		$(document).ready(function() {
			<?php for($i = 0; $i<$_SESSION['booking']['booking']['pas_num']; $i++){?>
			var go_lug_<?php echo $i;?> = $("#go_lug_<?php echo $i;?>");
			var back_lug_<?php echo $i;?> = $("#back_lug_<?php echo $i;?>");
			go_lug_<?php echo $i;?>.on("input", function() {
				let currentValue = parseInt(go_lug_<?php echo $i;?>.val());
				if (currentValue < 1 || isNaN(currentValue)) {
					go_lug_<?php echo $i;?>.val(0);
				}
				if(currentValue > 45){
					go_lug_<?php echo $i;?>.val(45);
				}
			});
			back_lug_<?php echo $i;?>.on("input", function() {
				let currentValue = parseInt(back_lug_<?php echo $i;?>.val());
				if (currentValue < 1 || isNaN(currentValue)) {
					back_lug_<?php echo $i;?>.val(0);
				}
				if(currentValue > 45){
					back_lug_<?php echo $i;?>.val(45);
				}
			});
			<?php }?>
		});

		

	</script>
<?php include("includes/footer.php")?>
