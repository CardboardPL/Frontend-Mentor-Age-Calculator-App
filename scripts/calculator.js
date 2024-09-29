import { extractFormData, isSubmitButton, isInputElem } from './utils/form.js';
import { formatValue } from './utils/format.js';
import { validateDateString } from './utils/validate.js';

document.addEventListener('click', (e) => {
  const clickedElem = e.target;

  if (isSubmitButton(clickedElem)) {
    const form = clickedElem.closest('.js-form');
    const formData = extractFormData(form);

    const day = formData.dayOfBirth;
    const month = formData.monthOfBirth;
    const year = formData.yearOfBirth;
    
    for (const data in formData) {
      const currentData = formData[data];
      const dataWrapperElem = document.querySelector(`.js-input[name="${data}"]`).closest('.js-fieldset-input-wrapper');

      if (currentData.trim() === '') {
        dataWrapperElem.classList.add('invalid');
      } else {
        dataWrapperElem.classList.remove('invalid');
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