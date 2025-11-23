// function to validate the contact form before submission
function validateForm(event) {
    event.preventDefault(); // stop the form from refreshing the page

    let email = document.getElementById("email");
    let confirmEmail = document.getElementById("confirmEmail");
    let appointmentDate = document.getElementById("appointmentDate");
    let isValid = true;

    // reset previous errors
    email.setCustomValidity("");
    confirmEmail.setCustomValidity("");
    appointmentDate.setCustomValidity("");

    // email validation - ensure it's from Aston and matches
    let emailValidationResult = checkEmails(email.value, confirmEmail.value);

    if (emailValidationResult === "invalid_domain") {
        showError(email, "Please use a valid Aston University email ending with '@aston.ac.uk'.");
        isValid = false;
    } else if (emailValidationResult === "mismatch") {
        showError(confirmEmail, "Emails do not match.");
        isValid = false;
    }

    // date validation
    if (!checkDate(appointmentDate.value)) {
        showError(appointmentDate, "Please select a future date.");
        isValid = false;
    }

    // if fail, do not submit
    if (!isValid) {
        return false;
    }

    // if all pass, show success msg
    showSuccessMessage();
    return false;
}

// function to ensure email is from Aston University and both emails match
function checkEmails(email, confirmEmail) {
    let emailDomain = "@aston.ac.uk";

    // Trim whitespace and convert to lowercase
    email = email.trim().toLowerCase();
    confirmEmail = confirmEmail.trim().toLowerCase();

    // Check if email is from Aston University
    if (!email.endsWith(emailDomain)) {
        return "invalid_domain";
    }

    // Check if both emails match
    if (email !== confirmEmail) {
        return "mismatch";
    }

    return "valid";
}

// function to check if the selected date is in the future
function checkDate(date) {
    let selectedDate = new Date(date + "T00:00:00");
    let today = new Date();
    
    today.setHours(0, 0, 0, 0);

    return selectedDate > today;
}

// function to show error message
function showError(input, message) {
    input.setCustomValidity(message);
    input.reportValidity();
}

// function to show a success message
function showSuccessMessage() {
    let formContainer = document.querySelector(".contact-form"); // select form container
    
    if (formContainer) {
        formContainer.innerHTML = ` 
            <div class="success-message">
                <h2>Thank You!</h2>
                <p>Your appointment request has been submitted successfully.</p>
            </div>
        `;
        formContainer.classList.add("success-container");
    }
}

// attach validation to form on submission
document.addEventListener("DOMContentLoaded", function () {
    let form = document.getElementById("contactForm");
    let email = document.getElementById("email");
    let confirmEmail = document.getElementById("confirmEmail");
    let appointmentDate = document.getElementById("appointmentDate");

    if (form) {
        form.addEventListener("submit", validateForm);
    }

    // disable copy-pasting in confirm email field
    confirmEmail.addEventListener("paste", function (event) {
        event.preventDefault();
        alert("Pasting is not allowed in the Confirm Email field.");
    });

    // real-time email validation to clear error when corrected
    function realTimeEmailValidation() {
        let emailValidationResult = checkEmails(email.value, confirmEmail.value);
        
        if (emailValidationResult === "valid") {
            email.setCustomValidity("");
            confirmEmail.setCustomValidity("");
        }
    }

    email.addEventListener("input", realTimeEmailValidation);
    confirmEmail.addEventListener("input", realTimeEmailValidation);

    // real-time date validation
    appointmentDate.addEventListener("input", function () {
        if (checkDate(appointmentDate.value)) {
            appointmentDate.setCustomValidity("");
        }
    });
});
