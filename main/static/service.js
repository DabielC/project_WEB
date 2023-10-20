
        //insurance
        let selectedPlanName = '';
        let selectedPlanPrice = 0;
        var insurance = [];
        function selectPlan(planName, planPrice) {
            selectedPlanName = planName;
            selectedPlanPrice = planPrice;

            // Update the selected plan display
            document.getElementById('selectedPlan').innerText = `${selectedPlanName} - ${selectedPlanPrice} THB`;

            // Update the total price display
            updateTotalPrice();
            insurance = [planName, planPrice];
            // console.log(insurance);
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
            insurance = [];
            // console.log(insurance);
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



		//food
        const selectedDishesSummary = document.getElementById('selectedDishesSummary');
        const totalPriceSummaryElement = document.getElementById('totalPriceSummary');
        const caution = document.getElementById('caution');
        let totalSummaryPrice = 0;
        var food = [];

        function addToOrder(foodName, foodPrice, Id) {
            const listItem = document.createElement('li');
            listItem.innerText = `${foodName} - ${foodPrice} THB (คุณ : ${Id})`;
            selectedDishesSummary.appendChild(listItem);

            totalSummaryPrice += foodPrice;
            updateTotalSummaryPrice();
            food.push([foodName, foodPrice, Id]);
            // console.table(food);
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

            if(food != [])
            {
                food.pop();
            }
            // console.table(food);
        }

        const add1 = document.getElementById('f1');
            add1.addEventListener('click', function () {
                const Id = document.getElementById('users').value;
                if(Id == "")
                {
                    caution.classList.remove('hidden');
                }
                else
                {
                    caution.classList.add('hidden');
                    addToOrder('ซี่โครงราดซอส', 399, Id);
                }
        });

        const add2 = document.getElementById('f2');
            add2.addEventListener('click', function () {
                const Id = document.getElementById('users').value;
                if(Id == "")
                {
                    caution.classList.remove('hidden');
                }
                else
                {
                    caution.classList.add('hidden');
                    addToOrder('ข้าวต้มทรงเครื่อง', 299, Id);
                }
        });
        const add3 = document.getElementById('f3');
            add3.addEventListener('click', function () {
                const Id = document.getElementById('users').value;
                if(Id == "")
                {
                    caution.classList.remove('hidden');
                }
                else
                {
                    caution.classList.add('hidden');
                    addToOrder('มัสมั่นเนื้อ', 499, Id);
                }

        });
        const add4 = document.getElementById('f4');
            add4.addEventListener('click', function () {
                const Id = document.getElementById('users').value;
                if(Id == "")
                {
                    caution.classList.remove('hidden');
                }
                else
                {
                    caution.classList.add('hidden');
                    addToOrder('ขนมครกทรงเครื่อง', 259, Id);
                }

        });
        const add5 = document.getElementById('f5');
            add5.addEventListener('click', function () {
                const Id = document.getElementById('users').value;
                if(Id == "")
                {
                    caution.classList.remove('hidden');
                }
                else
                {
                    caution.classList.add('hidden');
                    addToOrder('ออมเล็ตราดซอส', 299, Id);
                }

        });
        const add6 = document.getElementById('f6');
            add6.addEventListener('click', function () {
                const Id = document.getElementById('users').value;
                if(Id == "")
                {
                    caution.classList.remove('hidden');
                }
                else
                {
                    caution.classList.add('hidden');
                    addToOrder('สเต็กซี่โครงราดซอส', 399, Id);
                }

        });




        //car
        const caution1 = document.getElementById('caution1');
        const caution2 = document.getElementById('caution2');
        const caution3 = document.getElementById('caution3');
        var car_rent = [];
        document.addEventListener("DOMContentLoaded", function () {
                const dropOffInput = document.getElementById('dropOffDate');
                const pickUpInput = document.getElementById('pickUpDate');
                dropOffInput.addEventListener("change", function () {
                    const dropOffDate = new Date(dropOffInput.value);
                    const pickUpDate = new Date(pickUpInput.value);
                    const duration = (dropOffDate - pickUpDate) / (1000 * 60 * 60 * 24);

                    if (dropOffDate < pickUpDate) {
                        dropOffInput.valueAsDate = pickUpDate;
                    }
                    if(duration > 30)
                    {
                        removeCar();
                        caution2.classList.remove('hidden');
                    }
                });
            });

        function calculatePrice() {
            const pickUpDate = new Date(document.getElementById('pickUpDate').value);
            const pickUp = document.getElementById('pickUpDate').value;
            const dropOffDate = new Date(document.getElementById('dropOffDate').value);
            const dropOff = document.getElementById('dropOffDate').value;
            const pickUpTime = document.getElementById('pickUpTime').value;
            const dropOffTime = document.getElementById('dropOffTime').value;
            const duration = (dropOffDate - pickUpDate) / (1000 * 60 * 60 * 24);

			if(pickUpDate == "Invalid Date" || dropOffDate == "Invalid Date")
            {
                caution1.classList.remove('hidden');
            }
            else if(pickUpTime == "" || dropOffTime == ""){
                caution3.classList.remove('hidden');
            }
            else
            {
                caution3.classList.add('hidden');
                if(duration <= 30){
                        caution2.classList.add('hidden');
                        let pricePerDay = (500 - (duration - 1)*5);
                        if(duration == 0)
                        {
                            pricePerDay = 0;
                    }


                    const totalPrice = duration * pricePerDay;
                    updateSummary(duration, pricePerDay, totalPrice, pickUp, dropOff, pickUpTime, dropOffTime);
                }
            }
        }

        function updateSummary(duration, pricePerDay, totalPrice, pickUpDate, dropOffDate, pickUpTime, dropOffTime) {
            const summaryList = document.getElementById('carRentalDishesSummary');
			summaryList.innerHTML = '';


            const listItemDuration = document.createElement('li');
            listItemDuration.innerText = `ระยะเวลาเช่า: ${duration} วัน`;
            summaryList.appendChild(listItemDuration);

            const listItemPricePerDay = document.createElement('li');
            listItemPricePerDay.innerText = `ราคาต่อวัน: ${pricePerDay} บาท`;
            summaryList.appendChild(listItemPricePerDay);

            const totalPriceSummaryElement = document.getElementById('carRentalTotalPriceSummary');
            totalPriceSummaryElement.innerText = `ราคาทั้งหมด: ${totalPrice} บาท`;

            car_rent = {duration:duration, pricePerDay:pricePerDay, totalPrice:totalPrice, pickUpDate:pickUpDate, dropOffDate:dropOffDate, pickUpTime:pickUpTime, dropOffTime:dropOffTime};
            console.log(car_rent);
        }

        function removeCar() {
			// ทำงานเมื่อปุ่มลบอาหารถูกคลิก
			var carRentalDishesSummary = document.getElementById("carRentalDishesSummary");

			// ลบทุก child node ของ ul
			carRentalDishesSummary.innerHTML = '';

			// รีเซ็ตราคารวม
			const totalPriceSummaryElement = document.getElementById('carRentalTotalPriceSummary');
            totalPriceSummaryElement.innerText = `ราคาทั้งหมด: 0 บาท`;

            car_rent = [];
            console.log(car_rent);
		}



        // send data
        $(document).ready(function() {
            $('#confirm').click(function() {

                var data = JSON.stringify({ insurance: insurance, food: [food, totalSummaryPrice], car_rent: car_rent });
                window.location.href = "seats.php?data=" + data;

            });
        });


