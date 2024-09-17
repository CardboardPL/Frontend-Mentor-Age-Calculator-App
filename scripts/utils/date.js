function calculateDateFromDate(date) {
  const startDate = new Date(date);
  if (!isValidDate(startDate)) {
    console.error(`Invalid date provided: ${date}`);
    return null;
  }

  const today = new Date();

  let years = today.getFullYear() - startDate.getFullYear();
  let months = today.getMonth() - startDate.getMonth();
  let days = today.getDate() - startDate.getDate();

  if (days < 0) {
    months--;
    const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
    days += lastMonth.getDate();
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days }
}

function isValidDate(date) {
  return !isNaN(date.getTime());
}

function calculateDays(d1, d2) {
  const startDate = new Date(d1);
  const endDate = new Date(d2);

  const isStartDateValid = isValidDate(startDate);

  if (!isStartDateValid || !isValidDate(endDate)) {
    console.error(`Invalid date encountered: ${isStartDateValid ? d2 : d1}`);
    return null;
  }

  if (startDate > endDate) {
    console.error(`D1: ${d1} must be less than D2: ${d2}`);
    return null;
  }

  const time = Math.abs(endDate - startDate);
  return Math.floor(time / (1000 * 60 * 60 * 24 ));
}

function isLeapYear(year) {
  if (typeof year !== 'number' || isNaN(year)) {
    console.error(`Invalid year encountered: ${year}. Please provide a valid numerical year.`);
    return false;
  }
  if (year % 4 !== 0 || (year % 100 === 0 && year % 400 !== 0)) return false;
  return true;
}