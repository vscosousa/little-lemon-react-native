/**
 * Checks whether a value contains only letters, spaces, apostrophes, and hyphens.
 * @param value - The raw input to validate.
 * @returns Whether the value is a valid name.
 * @example
 * isValidName("Mary-Jane O'Neil"); // true
 * isValidName("Mary Jane 2");      // false
 */
export function isValidName(value: string) {
  return /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(value.trim());
}

/**
 * Checks whether a value is a syntactically valid email address.
 * @param value - The raw input to validate.
 * @returns Whether the value is a valid email address.
 * @example
 * isValidEmail("mary@example.com"); // true
 * isValidEmail("mary@example");     // false
 */
export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
