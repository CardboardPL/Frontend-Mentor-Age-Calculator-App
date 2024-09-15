import { checkIfElementHasClass } from './DOM.js';

/** A function that extracts the formData from the provided form
 * @param {HTMLElement} form - The form that we are extracting data from.
 * @returns {object|null} - Returns an object with the extracted data or "null" if the provided form is of invalid format or type.
*/
export function extractFormData(form) {
  const isValidFormElem = isFormElement(form);
  if (!isValidFormElem) {
    console.error(`Invalid form passed in: Missing required "js-form" class | Element:`, form);
    return null;
  }
  return Object.fromEntries(new FormData(form).entries());
}

/** Checks if a certain element is a form element.
 * @param {HTMLElement} elem - The element to check.
 * @returns {boolean} Returns a boolean value indicating if the passed element is a form element.
 */
function isFormElement(elem) {
  const formClass = 'js-form';
  return checkIfElementHasClass(elem, formClass);
}

/** Checks if a certain element or one of its ancestors is a submit button.
 * @param {HTMLElement} elem - The element to check.
 * @returns {boolean} Returns a boolean value indicating if the passed element is a submit button.
 */
export function isSubmitButton(elem) {
  const buttonClass = 'js-submit-button';
  return checkIfElementHasClass(elem, buttonClass) || Boolean(elem.closest(`.${buttonClass}`));
}

/** Checks if a certain element is an input tag.
 * @param {HTMLElement} elem - The element to check.
 * @returns {boolean} Returns a boolean value indicating if the passed element is an input tag.
 */
export function isInputElem(elem) {
  const inputElemClass = 'js-input';
  return checkIfElementHasClass(elem, inputElemClass) && elem.tagName === 'INPUT';
}