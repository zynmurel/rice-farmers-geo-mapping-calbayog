export const formatPhoneNumber = (input: string): string | null => {
  if (!input) return null;

  // Remove spaces, dashes, and plus signs
  let number = input.replace(/[\s-+]/g, "");

  // If it starts with "09", replace with "639"
  if (number.startsWith("09")) {
    number = "63" + number.substring(1);
  }

  // If it already starts with "639", keep it
  if (number.startsWith("639")) {
    return number;
  }

  // If it starts with "63" but missing 9, invalid
  if (number.startsWith("63") && number.length === 11) {
    return number;
  }

  return null; // invalid format
};
