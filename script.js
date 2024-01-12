// Get today's date
const today = new Date();

const outputDay = document.getElementById("render-output-day");
const outputMonth = document.getElementById("render-output-month");
const outputYear = document.getElementById("render-output-year");

// This function renders error messages after validating an input field.
const renderError = function (status, element, elem2, elem3) {
  const msgError = element.nextElementSibling; // The next element of the same parent
  const fieldName = element.name;

  switch (status) {
    case "empty":
      msgError.textContent = `${fieldName} cannot be empty`;
      element.style.borderColor = "hsl(0, 100%, 67%)";
      break;
    case "invalid":
      msgError.textContent = `Must be a valid ${fieldName.toLowerCase()}`;
      element.style.borderColor = "hsl(0, 100%, 67%)";
      break;
    case "futureDate":
      msgError.textContent = "Cannot be in the future";
      console.log(msgError.textContent);
      element.style.borderColor = "hsl(0, 100%, 67%)";
      elem2.style.borderColor = "hsl(0, 100%, 67%)";
      elem3.style.borderColor = "hsl(0, 100%, 67%)";
      break;
    case "invalidDate":
      msgError.textContent = "Must be a valid date";
      console.log(msgError.textContent);
      element.style.borderColor = "hsl(0, 100%, 67%)";
      elem2.style.borderColor = "hsl(0, 100%, 67%)";
      elem3.style.borderColor = "hsl(0, 100%, 67%)";
      break;
    default:
      msgError.textContent = "";
      element.style.borderColor = null;
  }
};
const validateYear = (inputYear) => {
  // Checking if the input field is empty
  if (inputYear.value === "") {
    renderError("empty", inputYear);
    return false;
  }

  // For the year we have to make a concession and only accept values
  // over 3 digits because of how the date constructor parses the string (line 135)
  if (inputYear.value < 100) {
    renderError("invalid", inputYear);
    return false;
  }

  // If the value is valid, then clear any error message and return true
  renderError("", inputYear);
  return true;
};

const validateMonth = (inputMonth) => {
  // Checking if the input field is empty
  if (inputMonth.value === "") {
    renderError("empty", inputMonth);
    return false;
  }

  // Checking if the value given is not a valid month
  if (inputMonth.value > 12 || inputMonth.value < 1) {
    renderError("invalid", inputMonth);
    return false;
  }

  // If the value is valid, then clear any error message and return true
  renderError("", inputMonth);
  return true;
};

const validateDay = (inputDay) => {
  // Checking if the input field is empty
  if (inputDay.value === "") {
    renderError("empty", inputDay);
    return false;
  }

  // Checking if the value given is not a valid day
  if (inputDay.value > 31 || inputDay.value < 1) {
    renderError("invalid", inputDay);
    return false;
  }

  // If the value is valid, then clear any error message and return true
  renderError("", inputDay);
  return true;
};

const validateDate = (inputDay, inputMonth, inputYear, birth) => {
  // Getting the day input value and the last day of the month based on input year and month
  const lastDayOfMonth = new Date(
    +inputYear.value,
    +inputMonth.value,
    0
  ).getDate();

  if (inputDay.value > lastDayOfMonth) {
    renderError("invalidDate", inputDay, inputMonth, inputYear);
    return false;
  }

  console.log(birth);
  console.log(today);
  if (birth > today) {
    renderError("futureDate", inputDay, inputMonth, inputYear);
    return false;
  }
  // If input value is valid, then clear any error message and return true
  renderError("", inputDay);
  return true;
};

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const inputDay = document.getElementById("day");
  const inputMonth = document.getElementById("month");
  const inputYear = document.getElementById("year");
  console.log(inputYear.value);

  // Check if the submitted values are valid
  // If any validation function returns false the process ends
  const vDay = validateDay(inputDay);
  const vMonth = validateMonth(inputMonth);
  const vYear = validateYear(inputYear);
  if (!vDay || !vMonth || !vYear) return;

  // If input values are valid, create a new Date object based on the input values
  const birth = new Date( // This is a simple way of creating a Date, for a more robust way see docs
    `${inputYear.value}-${inputMonth.value}-${inputDay.value}`
  );

  if (!validateDate(inputDay, inputMonth, inputYear, birth)) return;

  const EPOCH = new Date(0);
  const EPOCH_YEAR = EPOCH.getUTCFullYear();
  const EPOCH_MONTH = EPOCH.getUTCMonth();
  const EPOCH_DAY = EPOCH.getUTCDate();
  const diff = new Date(Date.now() - birth.getTime());
  const days = Math.abs(diff.getUTCDate() - EPOCH_DAY);
  const months = Math.abs(diff.getUTCMonth() - EPOCH_MONTH);
  const years = Math.abs(diff.getUTCFullYear() - EPOCH_YEAR);
  // Calculate the difference in years, months, and days between today's date and the birthdate entered by the user

  // Scaling down and hiding the output elements
  [
    outputYear.parentElement,
    outputMonth.parentElement,
    outputDay.parentElement,
  ].forEach((output) => {
    output.style.transform = "scale(.8)";
    output.style.opacity = "0";
  });

  // Updating the output elements with the calculated years, months and days,
  // then scaling up and showing them after a delay of 300ms
  setTimeout(() => {
    outputYear.textContent = years;
    outputMonth.textContent = months;
    outputDay.textContent = days;

    [
      outputYear.parentElement,
      outputMonth.parentElement,
      outputDay.parentElement,
    ].forEach((output) => {
      output.style.transform = "scale(1)";
      output.style.opacity = "1";
    });
  }, 300);

  // Clearing the input fields after calculating the age
  inputDay.value = "";
  inputMonth.value = "";
  inputYear.value = "";
});
