import { isValidDate, isLeapYear } from "./date.js";

class validationResponse {
  #isValid = true;
  message = '';

  constructor(type) {
    if (!type) {
      type = 'input';
    } else if (typeof type !== 'string') {
      type = typeof type;
    }
    this.type = type;
  }

  setToInvalid(message) {
    this.#isValid = false;
    this.message = message || `Must be a valid ${this.type}`;
  }

  isValidResponse() {
    return this.#isValid;
  }
}

export class valuePair {
  constructor(val1, val2) {
    this.val1 = val1;
    this.val2 = val2;
  }
}

function isValidNumber(num) {
  return !isNaN(num);
}

function isValidYear(year) {
  const res = new validationResponse('year');
  const yearNum = year.val2;

  if (!year.val1.trim()) {
    res.setToInvalid('This field is required');
  }
  else if (
    // Checks if the given year is not a valid integer
    !(isValidNumber(yearNum) && Number.isInteger(yearNum)) ||

    // Checks if the given year is not in the correct range
    yearNum < 1000 ||

    // Checks if the given year is in the correct range
    yearNum.toString().length !== 4
  ) {
    res.setToInvalid();
  }

  return res;
}

function isValidMonth(month) {
  const res = new validationResponse('month');
  const monthNum = month.val2;

  // Checks if the given month is an empty value
  if (!month.val1.trim()) {
    res.setToInvalid('This field is required');
  } else if (
    // Checks if the given month is not a valid number
    isNaN(monthNum) || !Number.isInteger(monthNum) ||

    // Checks if the given month is not in the correct range
    !(monthNum > 0 && monthNum <= 12)) {
    res.setToInvalid();
  };

  return res;
}

function isValidDayForMonth(day, month, year) {
  const res = new validationResponse('day');
  const monthsWith30Days = [4, 6, 9, 11];
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

  const dayNum = day.val2;

  // Checks if the given day is an empty value
  if (!day.val1.trim()) {
    res.setToInvalid('This field is required');
  } else if (
    // Checks if the given day is not a valid number
    isNaN(dayNum) || !Number.isInteger(dayNum) ||

    // Checks if the given day is not in the correct range
    dayNum <= 0 || dayNum >= 32 || 

    // Checks if the given day is not appropriate for months with 30 days
    (monthsWith30Days.includes(month) && dayNum > 30) ||

    // Checks if the given day is not appropriate for months with 31 days
    (monthsWith31Days.includes(month) && dayNum > 31) ||

    // Checks if the given day is not appropriate for February which can have 28 or 29 days depending if the given year is a leap year
    (month === 2 && dayNum > (isLeapYear(year) ? 29 : 28))
  ) {
    res.setToInvalid();
  }

  return res;
}

function isPastDate(monthPair, dayPair, yearPair) {
  const today = new Date();
  const currentYear = today.getFullYear();
  const isYearValid = yearPair.val2.isValidResponse();
  const errorMessage = 'Must be in the past';

  // Checks if the provided year is valid
  if (isYearValid) {
    // Checks if the given year is in the future
    if (yearPair.val1 > currentYear) {
      yearPair.val2.setToInvalid(errorMessage);

      // Checks if the given year is the current year
    } else if (yearPair.val1 === currentYear) {
      // Checks if the given month is in the future
      if (monthPair.val2.isValidResponse() && monthPair.val1 > (today.getMonth() + 1)) {
        monthPair.val2.setToInvalid(errorMessage);

        // Checks if the given day is in the future
      } else if (dayPair.val2.isValidResponse() && dayPair.val1 > (today.getDate())) {
        dayPair.val2.setToInvalid(errorMessage);
      }
    }
  }
}

// function isValidFormat(format, value) {
//   return format.test(value);
// }

/**
 * 
 * @param {string} dateStr - A date string following the format "MM/DD/YYYY". 
 */
export function validateDateString(dateStr, isPastRequired) {
  const dateStrComponents = dateStr.split('/');
  const isValid = new validationResponse('dateString');

  const monthNum = Number(dateStrComponents[0]);
  const dayNum = Number(dateStrComponents[1]);
  const yearNum = Number(dateStrComponents[2]);

  const monthPair = new valuePair(dateStrComponents[0], monthNum);
  const dayPair = new valuePair(dateStrComponents[1], dayNum);
  const yearPair = new valuePair(dateStrComponents[2], yearNum);

  const [isMonthValid, isDayValid, isYearValid] = [
    isValidMonth(monthPair), 
    isValidDayForMonth(dayPair, monthNum, yearNum), 
    isValidYear(yearPair)
  ];

  const monthValidationPair = new valuePair(monthNum, isMonthValid);
  const dayValidationPair = new valuePair(dayNum, isDayValid);
  const yearValidationPair = new valuePair(yearNum, isYearValid);

  if (isPastRequired) {
    isPastDate(monthValidationPair, dayValidationPair, yearValidationPair);
  }

  // Checks if the given month, day, and year is valid
  if (!isMonthValid.isValidResponse() ||
      !isDayValid.isValidResponse() ||
      !isYearValid.isValidResponse()
  ) {
    isValid.setToInvalid();
  }

  return { status: isValid.isValidResponse(), isMonthValid, isDayValid, isYearValid };
}

export function displayErrorMessage(element, message) {
  element.classList.add('invalid');
  element.querySelector('.js-error-message').textContent = message;
}

export function hideErrorMessage(element) {
  element.classList.remove('invalid');
}