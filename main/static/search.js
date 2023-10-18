function extractPrice(text) {
    // Use a regular expression to find a number with optional decimal point
    const regex = /(\d+(\.\d{1,2})?)\s*THB/i;
    const match = text.match(regex);

    if (match) {
        // Extracted price is in match[1]
        return parseFloat(match[1]);
    } else {
        // Return 0 if no price is found
        return 0;
    }
}


$(document).ready(function () {

    $('.price-button').click(function () {

        var price_return = parseFloat($(this).data('price-return'));
        var price_outbound = parseFloat($(this).data('price-outbound'));
        var direction = $(this).data('direction');
        var index = $(this).data('index');
        var origin = $('#' + direction + '-origin-' + index).text();
        var dest = $('#' + direction + '-dest-' + index).text();
        var departureTime = $('#' + direction + '-departure-time-' + index).text();
        var arriveTime = $('#' + direction + '-arrival-time-' + index).text();
        var newSummary = '';

        if (direction === 'outbound') {
            newSummary = 'ขาไป: ' + origin + ' ถึง ' + dest + ' ' + price_outbound + ' THB<br>&nbsp;เวลา: ' + departureTime + ' ถึง ' + arriveTime;
            $('#go').html(newSummary);
        } else if (direction === 'return') {
            newSummary = 'ขากลับ: ' + origin + ' ถึง ' + dest + ' ' + price_return + ' THB<br>&nbsp;เวลา: ' + departureTime + ' ถึง ' + arriveTime;
            $('#back').html(newSummary);
        }

		if(isNaN(price_outbound))
		{
			price_outbound = 0;
		}

		if(isNaN(price_return))
		{
			price_return = 0;
		}
        $('#total-price').text('รวมทั้งสิ้น: ' + (extractPrice($('#back').text()) + extractPrice($('#go').text())) + ' THB');
    });
});
