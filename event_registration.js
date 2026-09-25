/*
		Your Name: Jazmine Brown
		Last Modified Date: 09/21/2026
		File: event_registration.js
		File Description: DMWT Alumni Event Registration form website. Has a 10 minute timer countdown, calculates ticket totals with validation, and validates/submits the contact information form.
*/

// Set the minimum and maximum number of tickets able to be purchased
var minTickets = 1;
var maxTickets = 3;
// Set variables for the ticket cost
var costPerTicket = 5.00;
var ticketSurcharge = 0.50;

/*** YOUR CODE STARTS BELOW HERE ***/

//--------------------------------------------------
// FUNCTIONS
//--------------------------------------------------

// Helper function
// shows/clears error message and changes input 
// background color for error state.
// fieldId = the id of the input to be styled
// messageId = the id of the span that has the error messgae
// messageText = the text that displays for the error
// hasError = true if this filed has invalid data
function setFieldStatus(fieldId, messageId, messageText, hasError) {
	var fieldElement = document.getElementById(fieldId);

	if (hasError) {
		fieldElement.style.backgroundColor = "#ffcccc";
	} else {
		fieldElement.style.backgroundColor = "";
	}

	if (messageId !== "") {
		var messageElement = document.getElementById(messageId);
		messageElement.textContent = hasError ? messageText : "";
	}
}

// Calc Total
function calculateTotal() {
	var ticketInput = document.getElementById("numTickets").value;
	var ticketCount = Number(ticketInput);
	var isInvalid = isNaN(ticketInput) || ticketInput.trim() === "" || ticketCount < minTickets || ticketCount > maxTickets;

	if (isInvalid) {
		// Flag ticket field and show error msg
		setFieldStatus("numTickets", "msgTickets", "Please enter a number between " + minTickets + " and " + maxTickets + ".", true);

		// Hide contact info section until ticket count is valid.
		document.getElementById("contactInformation").style.display = 'none';

		// Reset total displayed
	} else {
		// Clear previous errors
		setFieldStatus("numTickets", "msgTickets", "", false);
		document.getElementById("contactInformation").style.display = "block";

		var total = ticketCount * (costPerTicket + ticketSurcharge);

		document.getElementById("totalCost").value = "$" + total.toFixed(2);
	}
}

// Complete Purchase
// make sure name and email fields are filled, styles any invalid fields,
// and if everyything is good, prompts the pop up and stops timer.

function completePurchase() {
	var nameValue = document.getElementById("name").value.trim();
	var emailValue = document.getElementById("email").value.trim();
	var hasErrors = false;

	// Flag name field as invalid if left empty and show error msg
	if (nameValue === "") {
		setFieldStatus("name", "msgname", "Please enter your name.", true);
		hasErrors = true;
	} else {
		// Clear prev error on name field
		setFieldStatus("name", "msgname", "", false);
	}

	// Same for email field
	if (emailValue === "") {
		setFieldStatus("email", "msgemail", "Please enter your e-mail address.", true);
		hasErrors = true;
	} else {
		setFieldStatus("email", "msgemail", "", false);
	}

	// Only continue with purchase if no errors exist.
	if (!hasErrors) {
		alert("Thank you for your purchase, " + nameValue + "!")
		clearInterval(Countdown);
	}
}

//--------------------------------------------------
// Countdown Timer from 10:00 to 00:00
// seconds < 10 will display as 09, 08, 07, 06, etc.
//--------------------------------------------------
//set initial time
let totalSeconds = 10 * 60;

// Declare outside event listener so they're available
var timerSpan;
var Countdown;

// The script tag is inside the head so I get a consule error since the 
// #timer for the countdown doesn't exist yet. Since I can't change the HTML
// I'm adding DOMContentLoaded so that it waits until the page is loaded bf
// grabbing the element.
document.addEventListener("DOMContentLoaded", function (){
	//target html timer
	timerSpan = document.getElementById('timer');

	Countdown = setInterval(() => {
		let minutes = Math.floor(totalSeconds / 60);
		let seconds = totalSeconds % 60;
		let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;

		// If statement for leading zero for single digits
		let formattedSeconds;
		if (seconds < 10) {
			formattedSeconds = "0" + seconds;
		} else {
			formattedSeconds = seconds;
		}

		// Update timer w/ formatted display
		timerSpan.textContent = `${formattedMinutes}:${formattedSeconds}`;

		if (totalSeconds <= 0) {
			clearInterval(Countdown);
			timerSpan.textContent = "Your session has expired. Please restart the checkout process.";
		} else {
			totalSeconds--;
		}
	}, 1000);
});