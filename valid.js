const form = document.getElementById("form");
const email = document.getElementById("email");
const country = document.getElementById("country");
const postal = document.getElementById("postal");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const message = document.getElementById("formMessage");

function showError(input, messageText) {
  const errorSpan = input.nextElementSibling;
  errorSpan.textContent = messageText;
  errorSpan.style.display = "block";
  input.classList.add("invalid");
  input.classList.remove("valid");
}

function showValid(input) {
  const errorSpan = input.nextElementSibling;
  errorSpan.textContent = "";
  errorSpan.style.display = "none";
  input.classList.remove("invalid");
  input.classList.add("valid");
}

function validateEmail() {
  if (email.validity.valueMissing) {
    showError(email, "Email is required");
  } else if (email.validity.typeMismatch) {
    showError(email, "Enter a valid email");
  } else {
    showValid(email);
  }
}

function validateCountry() {
  if (country.validity.valueMissing) {
    showError(country, "Country is required");
  } else {
    showValid(country);
  }
}

function validatePostal() {
  const value = postal.value.trim();
  const regex = /^\d{4,10}$/;

  if (postal.validity.valueMissing) {
    showError(postal, "Postal code is required");
  } else if (!regex.test(value)) {
    showError(postal, "Postal code must be 4–10 digits");
  } else {
    showValid(postal);
  }
}

function validatePassword() {
  if (password.validity.valueMissing) {
    showError(password, "Password is required");
  } else if (password.validity.tooShort) {
    showError(password, "Minimum 6 characters");
  } else {
    showValid(password);
  }
}

function validateConfirmPassword() {
  if (confirmPassword.validity.valueMissing) {
    showError(confirmPassword, "Please confirm your password");
  } else if (confirmPassword.value !== password.value) {
    showError(confirmPassword, "Passwords do not match");
  } else {
    showValid(confirmPassword);
  }
}

// Live validation
email.addEventListener("input", validateEmail);
country.addEventListener("input", validateCountry);
postal.addEventListener("input", validatePostal);
password.addEventListener("input", () => {
  validatePassword();
  validateConfirmPassword();
});
confirmPassword.addEventListener("input", validateConfirmPassword);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  validateEmail();
  validateCountry();
  validatePostal();
  validatePassword();
  validateConfirmPassword();

  if (form.checkValidity() && confirmPassword.value === password.value) {
    message.textContent = "🖐 High five! Form submitted!";
  } else {
    message.textContent = "";
    alert("Please fix the errors before submitting.");
  }
});
