/** A function that checks if the given element is a DOM element
 * @param {any} elem - The element or value that we are checking the validity of.
 * @returns {boolean} - Returns a boolean value indicating if the provided element is a DOM element.
 */
function isDOMElement(elem) {
  return elem instanceof HTMLElement;
}

/** Checks if a certain element has a specific class.
 * @param {HTMLElement} elem - The element to check.
 * @param {string} cls - The class to look for.
 * @returns {boolean} Returns a boolean value indicating if the element passed has the class that we are looking for.
 */ 
export function checkIfElementHasClass(elem, cls) {
  if (!isDOMElement(elem)) return false;
  return elem.classList.contains(cls);
}