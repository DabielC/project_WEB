
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

        function showSummary() {
            // Reset the summary before showing
            selectedDishesSummary.innerHTML = '';
            totalSummaryPrice = 0;

            // Add each selected dish to the summary
            // Modify this to match your actual dish names and prices
            addToOrder('ซี่โครงราดซอส', 399);
            // Add more addToOrder calls for each dish
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

        function calculatePrice() {
            const pickUpDate = new Date(document.getElementById('pickUpDate').value);
            const dropOffDate = new Date(document.getElementById('dropOffDate').value);

            // Check if dropOffDate is before pickUpDate
            if (dropOffDate < pickUpDate) {
                alert('กรุณาเลือกวันใหม่');
                return;
            }

            const duration = (dropOffDate - pickUpDate) / (1000 * 60 * 60 * 24); // Calculate duration in days

            let pricePerDay = 0;

            if (duration === 1) {
                pricePerDay = 500;
            } else if (duration <= 3) {
                pricePerDay = 475;
            } else if (duration <= 7) {
                pricePerDay = 450;
            } else if (duration <= 15) {
				pricePerDay = 400;
        } else {
            alert('ไม่อนุญาตให้เช่ามากกว่า 30 วัน');
                return;
	         }

            const totalPrice = duration * pricePerDay;
            updateSummary(duration, pricePerDay, totalPrice);
        }

        function updateSummary(duration, pricePerDay, totalPrice) {
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
