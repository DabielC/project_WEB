function validateEmail(email) {
	const regex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
	return regex.test(email);
}
function isThaiName(name) {
    const thaiNameRegex = /^[A-Za-z ]+$/;
	if (name != '')
	{
		return !(thaiNameRegex.test(name));
	}
}
function isEnglishName(name) {
    const englishNameRegex = /^[A-Za-z ]+$/;
	return englishNameRegex.test(name);
}
function isphone(number) {
    const numberRegex = /^(0(6|8|9))\d{8}$/;
    return numberRegex.test(number);
}


//validate form on input change
function validateForm() {
	const firstname = document.getElementById('firstname').value;
	const lastname = document.getElementById('lastname').value;
	const firstname_eng = document.getElementById('firstname_eng').value;
	const lastname_eng = document.getElementById('lastname_eng').value;
	const email = document.getElementById('email').value;
	const phone = document.getElementById('phone').value;
	const DOB = document.getElementById('DOB').value;


	//DOB
	const DOBInput = document.getElementById('DOB');
	const DOB_error = document.getElementById('DOB-error');
	if(DOB != ''){
		DOBInput.classList.remove('error');
        DOBInput.classList.add('valid');
		DOB_error.innerHTML = '';
	}
	else{
		DOBInput.classList.add('error');
        DOBInput.classList.remove('valid');
		DOB_error.innerHTML = 'กรุณาใส่วันเกิด';
	}


	//iseng validate
	const firstname_engInput = document.getElementById('firstname_eng');
    const lastname_engInput = document.getElementById('lastname_eng');
	const firstname_eng_error = document.getElementById('firstname_eng-error');
    const lastname_eng_error = document.getElementById('lastname_eng-error');
	if (isEnglishName(firstname_eng)) {
        firstname_engInput.classList.remove('error');
        firstname_engInput.classList.add('valid');
		firstname_eng_error.innerHTML = '';
    } else {
        firstname_engInput.classList.remove('valid');
        firstname_engInput.classList.add('error');
		firstname_eng_error.innerHTML = 'กรุณากรอกภาษาอังกฤษ';
    }
	if (isEnglishName(lastname_eng)) {
        lastname_engInput.classList.remove('error');
        lastname_engInput.classList.add('valid');
		lastname_eng_error.innerHTML = '';
    } else {
        lastname_engInput.classList.remove('valid');
        lastname_engInput.classList.add('error');
		lastname_eng_error.innerHTML = 'กรุณากรอกภาษาอังกฤษ';
    }

	//isthai validate
	const firstnameInput = document.getElementById('firstname');
    const lastnameInput = document.getElementById('lastname');
	const firstname_error = document.getElementById('firstname-error');
    const lastname_error = document.getElementById('lastname-error');
	if (isThaiName(firstname)) {
        firstnameInput.classList.remove('error');
        firstnameInput.classList.add('valid');
		firstname_error.innerHTML = '';
    } else {
        firstnameInput.classList.remove('valid');
        firstnameInput.classList.add('error');
		firstname_error.innerHTML = 'กรุณากรอกภาษาไทย';
    }
	if (isThaiName(lastname)) {
        lastnameInput.classList.remove('error');
        lastnameInput.classList.add('valid');
		lastname_error.innerHTML = '';
    } else {
        lastnameInput.classList.remove('valid');
        lastnameInput.classList.add('error');
		lastname_error.innerHTML = 'กรุณากรอกภาษาไทย';
    }

	// Validate Email
	const emailInput = document.getElementById('email');
	const email_error = document.getElementById('email-error');
	if (validateEmail(email)) {
		emailInput.classList.remove('error');
		emailInput.classList.add('valid');
		email_error.innerHTML = '';
	} else {
		emailInput.classList.remove('valid');
		emailInput.classList.add('error');
		email_error.innerHTML = 'รูปแบบอีเมลไม่ถูกต้อง';
	}

	//phone validate
	const phoneInput = document.getElementById('phone');
	const phone_error = document.getElementById('phone-error');
	if(isphone(phone)){
		phoneInput.classList.remove('error');
		phoneInput.classList.add('valid');
		phone_error.innerHTML = '';
	}
	else
	{
		phoneInput.classList.add('error');
		phoneInput.classList.remove('valid');
		phone_error.innerHTML = 'รูปแบบเบอร์โทรศัพท์ไม่ถูกต้อง';
	}

	//check prefix
	const prefixInput = document.getElementById('prefix');
	if(prefixInput.value != ''){
		prefixInput.classList.remove('error');
		prefixInput.classList.add('valid');
	}
	else
	{
		prefixInput.classList.add('error');
		prefixInput.classList.remove('valid');
	}

	//check nation
	const nationality = document.getElementById('nationality');
	if(nationality.value != ''){
		nationality.classList.remove('error');
		nationality.classList.add('valid');
	}
	else
	{
		nationality.classList.add('error');
		nationality.classList.remove('valid');
	}
}


document.getElementById('firstname').addEventListener('input', validateForm);
document.getElementById('lastname').addEventListener('input', validateForm);
document.getElementById('firstname_eng').addEventListener('input', validateForm);
document.getElementById('lastname_eng').addEventListener('input', validateForm);
document.getElementById('email').addEventListener('input', validateForm);
document.getElementById('phone').addEventListener('input', validateForm);
document.getElementById('DOB').addEventListener('input', validateForm);
document.getElementById('prefix').addEventListener('input', validateForm);
document.getElementById('nationality').addEventListener('input', validateForm);

$(document).ready(function() {
    $('#passenger_form').submit(function(event) {

        // Check if any required fields are empty
        var formValid = true;
        $(this).find('input[required]').each(function() {
            if ($.trim($(this).val()) === '') {
                formValid = false;
                $(this).addClass('error');
            }
        });

		$(this).find('select[required]').each(function() {
			if ($(this).val() === null || $(this).val() === '') {
			  formValid = false;
			  $(this).addClass('error'); // You can style the empty selects as needed
			}
		  });


        if (!formValid) {
            event.preventDefault();
        }
		else
		{
			// Serialize form data
			var formData = $(this).serialize();

			// Send data to the server using AJAX
			$.ajax({
				type: 'POST',
				url: $(this).attr('action'),
				data: formData,
				error: function(jqXHR, textStatus, errorThrown) {
					console.log('AJAX Error:', textStatus, errorThrown);
				}
			});
		}

    });
});
