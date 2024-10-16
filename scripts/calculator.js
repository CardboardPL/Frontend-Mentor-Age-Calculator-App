import { extractFormData, isSubmitButton, isInputElem } from './utils/form.js';
import { formatValue } from './utils/format.js';
import { validateDateString, displayErrorMessage, hideErrorMessage, valuePair } from './utils/validate.js';
import { calculateDateFromDate } from './utils/date.js';
import { countUpElements } from './utils/count.js';

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
      const dataWrapperElem = document.querySelector(`.js-input[name="${data}"]`).closest('.js-fieldset-input-wrapper');
      const dataType = dataWrapperElem.dataset.type;
      const dataTypeValidity = dateStringValidity[`is${dataType}Valid`];

      if (!dataTypeValidity.isValidResponse()) {
        displayErrorMessage(dataWrapperElem, dataTypeValidity.message);
        isValid = false;
      } else {
        hideErrorMessage(dataWrapperElem);
      }
    }

    if (dateStringValidity.status) {
      const age = calculateDateFromDate(dateString);
      const valuePairs = [];
      
      for (const component in age) {
        valuePairs.push(new valuePair(age[component], document.querySelector(`.js-${component}`)));
      }

      countUpElements(...valuePairs);
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