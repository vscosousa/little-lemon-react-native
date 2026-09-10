/**
 * Builds display initials from a first and last name.
 *
 * @param firstName - The person's first name.
 * @param lastName - The person's last name.
 * @returns Up to two uppercase initials, e.g. `"MJ"`.
 * @example
 * getInitials("Mary", "Jane"); // "MJ"
 * getInitials("Mary", "");     // "M"
 */
export function getInitials(firstName: string, lastName: string) {
  return `${firstName[0] ?? ""}${lastName[0] ?? ""}`.toUpperCase().trim();
}
