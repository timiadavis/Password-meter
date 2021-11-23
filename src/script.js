"use strict";
// FORM element
const form = document.querySelector("#form");
// Input elements
const passwordInput = document.querySelector("#password");
const nameInput = document.querySelector("#name");
const ageInput = document.querySelector("#age");
const phoneInput = document.querySelector("#phone");
const progress = document.querySelector("#prog");
window.addEventListener("load", () => {
    [nameInput, ageInput, phoneInput].forEach((input) => {
        var _a;
        input.value = (_a = sessionStorage.getItem(input.id)) !== null && _a !== void 0 ? _a : "";
    });
});
function giveInvalidFeedback(msg) {
    const feedbackTextEl = document.querySelector("#inval");
    feedbackTextEl.innerText = msg;
    passwordInput.classList.add("is-invalid");
}
function giveValidFeedback(msg) {
    if (!msg) {
        passwordInput.classList.remove("is-valid");
    }
    else {
        const feedbackTextEl = document.querySelector("#inval");
        document.querySelector("#val").innerText = msg;
        passwordInput.classList.add("is-valid");
    }
}
function giveStrength(password) {
    // remove all previous validations
    passwordInput.classList.remove("is-invalid");
    // calculate password score
    const passwordMeter = zxcvbn(password);
    console.log(passwordMeter);
    const passwordStrength = passwordMeter.score;
    if (passwordMeter.feedback.suggestions.length) {
        giveValidFeedback(passwordMeter.feedback.suggestions[0]);
    }
    else {
        giveValidFeedback("");
    }
    // show strength percentage on progress bar
    const strengthPercentage = (passwordStrength / 4) * 100;
    progress.style.width = strengthPercentage + "%";
    progress.innerText = strengthPercentage + "%";
    progress.setAttribute("aria-valuenow", strengthPercentage + "");
    // Adjust progress bar color base on score
    if (strengthPercentage >= 75) {
        progress.classList.remove("bg-danger", "bg-warning");
        progress.classList.add("bg-success");
    }
    else if (strengthPercentage >= 50) {
        progress.classList.remove("bg-danger", "bg-success");
        progress.classList.add("bg-warning");
    }
    else {
        progress.classList.remove("bg-warning", "bg-success");
        progress.classList.add("bg-danger");
    }
}
// window
//   .addEventListener("load", () => {
//     [nameInput, phoneInput, ageInput].forEach((input) => {});
//   })
[passwordInput, nameInput, phoneInput, ageInput].forEach((input) => input.addEventListener("input", (es) => {
    const value = passwordInput.value;
    if (input !== passwordInput) {
        sessionStorage.setItem(input.id, input.value);
    }
    // Check if name exists in password
    if (nameInput.value.length &&
        value.toLowerCase().includes(nameInput.value.toLowerCase())) {
        return giveInvalidFeedback("Name cannot be in the password");
    }
    // Check if age exists in password
    if (ageInput.value.length &&
        value.toLowerCase().includes(ageInput.value.toLowerCase())) {
        return giveInvalidFeedback("Age cannot be in the password");
    }
    // check if phone number exists in password
    if (phoneInput.value.length &&
        value.toLowerCase().includes(phoneInput.value.toLowerCase())) {
        return giveInvalidFeedback("Phone number cannot be in the password");
    }
    return giveStrength(value);
}));
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // Validated data
    const data = {
        name: nameInput.value,
        phone: phoneInput.value,
        password: passwordInput.value,
        age: ageInput.value,
    };
    // Add your logic for data after form submit.
    alert("Form submitted!" + JSON.stringify(data));
});
