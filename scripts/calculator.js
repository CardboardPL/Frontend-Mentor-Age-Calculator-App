import { extractFormData, isSubmitButton, isInputElem } from './utils/form.js';
import { formatValue } from './utils/format.js';
import { validateDateString } from './utils/validate.js';
import { calculateDateFromDate } from './utils/date.js';

document.addEventListener('click', (e) => {
  const clickedElem = e.target;

  if (isSubmitButton(clickedElem)) {
    const form = clickedElem.closest('.js-form');
    const formData = extractFormData(form);

    const day = formData.dayOfBirth;
    const month = formData.monthOfBirth;
    const year = formData.yearOfBirth;
    const dateString = `${month}/${day}/${year}`;
    let isValid = true;

    const dateStringValidity = validateDateString(dateString, true);

    for (const data in formData) {
      const currentData = formData[data];
      const dataWrapperElem = document.querySelector(`.js-input[name="${data}"]`).closest('.js-fieldset-input-wrapper');
      const dataType = dataWrapperElem.dataset.type;
      const dataTypeValidity = dateStringValidity[`is${dataType}Valid`];

      if (currentData.trim() === '' || !dataTypeValidity.isValidResponse()) {
        dataWrapperElem.classList.add('invalid');
        isValid = false;
      } else {
        dataWrapperElem.classList.remove('invalid');
      }

      dataWrapperElem.querySelector('.js-error-message').textContent = dataTypeValidity.message;
    }

    if (dateStringValidity.status) {
      const age = calculateDateFromDate(dateString);
      
      for (const component in age) {
        document.querySelector(`.js-${component}`).textContent = age[component];
      }
    }
  }
});

document.addEventListener('input', (e) => {
  const currentElem = e.target;

  if (isInputElem(currentElem)) {
    const formatParams = currentElem.dataset.format;
    formatValue(currentElem, formatParams);
  }
});