        let selectedPlanName = '';
        let selectedPlanPrice = 0;

        function selectPlan(planName, planPrice) {
            selectedPlanName = planName;
            selectedPlanPrice = planPrice;

            // Update the selected plan display
            document.getElementById('selectedPlan').innerText = `${selectedPlanName} - ${selectedPlanPrice} THB`;

            // Update the total price display
            updateTotalPrice();
        }

        function updateTotalPrice() {
            const totalPriceElement = document.getElementById('totalPrice');
            const totalPrice = selectedPlanPrice;
            totalPriceElement.innerText = `ราคาทั้งหมด: ${totalPrice} THB`;
        }


        function showAdditionalDetails() {
            // Toggle the visibility of additional details
            const additionalDetails = document.getElementById('additionalDetails');
            additionalDetails.classList.toggle('hidden');
        }
        function clearSelectedPlan() {
            // Clear the selected plan and total price
            selectedPlanName = '';
            selectedPlanPrice = 0;

            // Update the selected plan and total price display
            document.getElementById('selectedPlan').innerText = '';
            document.getElementById('totalPrice').innerText = 'ราคาทั้งหมด: 0 THB';
        }


		//food
        const selectedDishesSummary = document.getElementById('selectedDishesSummary');
        const totalPriceSummaryElement = document.getElementById('totalPriceSummary');
        let totalSummaryPrice = 0;

        function addToOrder(itemName, itemPrice) {
            const listItem = document.createElement('li');
            listItem.innerText = `${itemName} - ${itemPrice} THB`;
            selectedDishesSummary.appendChild(listItem);

            totalSummaryPrice += itemPrice;
            updateTotalSummaryPrice();
        }

        function updateTotalSummaryPrice() {
            totalPriceSummaryElement.innerText = `ราคารวมทั้งหมด: ${totalSummaryPrice} THB`;
        }

        function removeFood() {
            // ทำงานเมื่อปุ่มลบอาหารถูกคลิก
            var selectedDishes = selectedDishesSummary.getElementsByTagName("li");

            // ตรวจสอบว่ามีรายการอาหารที่เลือกหรือไม่
            if (selectedDishes.length > 0) {
                var lastSelectedDishText = selectedDishes[selectedDishes.length - 1].innerText;
                var lastSelectedDishPrice = parseInt(lastSelectedDishText.match(/\d+/)[0]);  // ดึงราคาจากข้อความ
                totalSummaryPrice -= lastSelectedDishPrice;
                selectedDishesSummary.removeChild(selectedDishes[selectedDishes.length - 1]);
                updateTotalSummaryPrice();
            } else {
                totalSummaryPrice = 0;  // ไม่มีรายการอาหารที่เลือก
                updateTotalSummaryPrice();
            }
        }



		//car
        function removeCar() {
			// ทำงานเมื่อปุ่มลบอาหารถูกคลิก
			var carRentalDishesSummary = document.getElementById("carRentalDishesSummary");

			// ลบทุก child node ของ ul
			carRentalDishesSummary.innerHTML = '';

			// รีเซ็ตราคารวม
			const totalPriceSummaryElement = document.getElementById('carRentalTotalPriceSummary');
            totalPriceSummaryElement.innerText = `ราคาทั้งหมด: 0 บาท`;
		}


		document.addEventListener("DOMContentLoaded", function () {
			const dropOffInput = document.getElementById('dropOffDate');
			const pickUpInput = document.getElementById('pickUpDate');

			dropOffInput.addEventListener("change", function () {
				const dropOffDate = new Date(dropOffInput.value);
				const pickUpDate = new Date(pickUpInput.value);

				// Check if drop-off date is earlier than pick-up date
				if (dropOffDate < pickUpDate) {
					// Set drop-off date to pick-up date
					dropOffInput.valueAsDate = pickUpDate;
				}
			});
		});



        function calculatePrice() {
            const pickUpDate = new Date(document.getElementById('pickUpDate').value);
            const dropOffDate = new Date(document.getElementById('dropOffDate').value);

			console.log(pickUpTime, dropOffTime);

			pickUpDate.setHours(0, 0, 0, 0);
			dropOffDate.setHours(0, 0, 0, 0);

            // Check if dropOffDate is before pickUpDate
            if (dropOffDate < pickUpDate) {
                alert('กรุณาเลือกวันใหม่');
                return;
            }

            const duration = (dropOffDate - pickUpDate) / (1000 * 60 * 60 * 24);
			let pricePerDay = (500 - (duration - 1)*5);
			if(duration == 0)
			{
				pricePerDay = 0;
			}


            const totalPrice = duration * pricePerDay;
            updateSummary(duration, pricePerDay, totalPrice);
        }

        function updateSummary(duration, pricePerDay, totalPrice) {
			const pickUpTime = document.getElementById('pickUpTime').value;
            const dropOffTime = document.getElementById('dropOffTime').value;
            const summaryList = document.getElementById('carRentalDishesSummary');
			summaryList.innerHTML = '';


            const listItemDuration = document.createElement('li');
            listItemDuration.innerText = `ระยะเวลาเช่า: ${duration} วัน`;
            summaryList.appendChild(listItemDuration);

            const listItemPricePerDay = document.createElement('li');
            listItemPricePerDay.innerText = `ราคาต่อวัน: ${pricePerDay} บาท`;
            summaryList.appendChild(listItemPricePerDay);

            const listItemTotalPrice = document.createElement('li');
            listItemTotalPrice.innerText = `ราคารวม: ${totalPrice} บาท`;
            summaryList.appendChild(listItemTotalPrice);

            const totalPriceSummaryElement = document.getElementById('carRentalTotalPriceSummary');
            totalPriceSummaryElement.innerText = `ราคาทั้งหมด: ${totalPrice} บาท`;
        }

        function showAdditionalDetails() {
            const additionalDetails = document.getElementById('additionalDetails');
            additionalDetails.classList.toggle('hidden');
        }

        function toggleAdditionalDetails() {
            const additionalDetails = document.getElementById('additionalDetails');
            additionalDetails.classList.toggle('hidden');
        }


		//carousel
        tailwind.config = {
			theme: {
				extend: {
					fontFamily: {
						cabinetGrotesk: "'Cabinet Grotesk', san-serif",
					}
				}
			}
		}
		const slidesContainer = document.querySelector(".slides-container");
		const slideWidth = slidesContainer.querySelector(".slide").clientWidth;
		const prevButton = document.querySelector(".prev");
		const nextButton = document.querySelector(".next");

		nextButton.addEventListener("click", () => {
			slidesContainer.scrollLeft += slideWidth;
		});

		prevButton.addEventListener("click", () => {
			slidesContainer.scrollLeft -= slideWidth;
		});
