import { isValidDate, isLeapYear } from "./date.js";

function isValidMonth(month) {
  return month > 0 && month <= 12;
}

function isValidDayForMonth(day, month, year) {
  if (day <= 0) return false;

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
  if (!isValidFormat(/^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/, dateStr)) {
    console.error(`Provided date string is in an invalid format. Please follow the format "MM/DD/YYYY"
      Provided Date String: ${dateStr}`);
    return { status: false };
  }

  if (!isValidDate(new Date(dateStr))) {
    const dateStrComponents = dateStr.split('/');
    let [isMonthValid, isDayValid, isYearValid] = [true, true, true];

    const month = parseInt(dateStrComponents[0]);
    const day = parseInt(dateStrComponents[1]);
    const year = parseInt(dateStrComponents[2]);

    // Checks if the given month is valid
    if (isValidMonth(month)) {
      isMonthValid = false;
    }

    // Checks if the given day is valid
    if (!isValidDayForMonth(day, month, year)) {
      isDayValid = false;
    }

    // Checks if the given year is valid
    if (year <= 0) {
      isYearValid = false;
    }

    return { status: false, isMonthValid, isDayValid, isYearValid };
  }
  return { status: true };
}