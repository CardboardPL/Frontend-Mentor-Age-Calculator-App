import { isValidDate, isLeapYear } from "./date.js";

function isValidNumber(num) {
  return !isNaN(num);
}

function isValidYear(year) {
  return year > 0 && isValidNumber(year);
}

function isValidMonth(month) {
  if (typeof month !== 'number') {
    month = Number(month);
  }
  if (isNaN(month)) return false;
  return month > 0 && month <= 12;
}

function isValidDayForMonth(day, month, year) {
  if (day <= 0 || isNaN(day)) return false;

  const monthsWith30Days = [4, 6, 9, 11];
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];

  if (
    monthsWith30Days.includes(month) && day > 30 ||
    (monthsWith31Days.includes(month) && day > 31) ||
    (month === 2 && day > (isLeapYear(year) ? 29 : 28))
  ) return false;

  return true;
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
  let isValid = {
    state: true,
    setToInvalid: function () {
      this.state = false;
    }
  };
  let [isMonthValid, isDayValid, isYearValid] = [true, true, true];

  const month = parseInt(dateStrComponents[0]);
  const day = parseInt(dateStrComponents[1]);
  const year = parseInt(dateStrComponents[2]);

  // Checks if the given month is valid
  if (!isValidMonth(month)) {
    isValid.setToInvalid();
    isMonthValid = false;
  }

  // Checks if the given day is valid
  if (!isValidDayForMonth(day, month, year)) {
    isValid.setToInvalid();
    isDayValid = false;
  }

  // Checks if the given year is valid
  if (!isValidYear(year)) {
    isValid.setToInvalid();
    isYearValid = false;
  }

  return isValid.state ? { status: true } : { status: false, isMonthValid, isDayValid, isYearValid };
}