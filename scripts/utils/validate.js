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

function isValidNumber(num) {
  return !isNaN(num);
}

function isValidYear(year) {
  const res = new validationResponse('year');

  if (!(year > 0 && isValidNumber(year))) {
    res.setToInvalid();
  }

  return res;
}

function isValidMonth(month) {
  const res = new validationResponse('month');

  if (typeof month !== 'number') {
    month = Number(month);
  }
  if (isNaN(month) || !(month > 0 && month <= 12)) {
    res.setToInvalid();
  };
  return res;
}

function isValidDayForMonth(day, month, year) {
  const res = new validationResponse('day');
  const monthsWith30Days = [4, 6, 9, 11];
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

  if (day <= 0 || isNaN(day) ||
    (monthsWith30Days.includes(month) && day > 30 ||
    (monthsWith31Days.includes(month) && day > 31) ||
    (month === 2 && day > (isLeapYear(year) ? 29 : 28)))
  ) {
    res.setToInvalid();
  }

  return res;
}

function isValidFormat(format, value) {
  return format.test(value);
}

/**
 * 
 * @param {string} dateStr - A date string following the format "MM/DD/YYYY". 
 */
export function validateDateString(dateStr) {
  const dateStrComponents = dateStr.split('/');
  const isValid = new validationResponse('dateString');

  const month = parseInt(dateStrComponents[0]);
  const day = parseInt(dateStrComponents[1]);
  const year = parseInt(dateStrComponents[2]);

  const [isMonthValid, isDayValid, isYearValid] = [
    isValidMonth(month), 
    isValidDayForMonth(day, month, year), 
    isValidYear(year)];

  // Checks if the given month, day, and year is valid
  if (!isMonthValid.isValidResponse() ||
      !isDayValid.isValidResponse() ||
      !isYearValid.isValidResponse()
  ) {
    isValid.setToInvalid();
  }

  return { status: isValid.isValidResponse(), isMonthValid, isDayValid, isYearValid };
}