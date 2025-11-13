// UK Postcode validation and service area checking

// Define allowed postcode areas (outward codes)
// These are the first part of UK postcodes (e.g., "SW1", "W1", "E1")
const ALLOWED_POSTCODE_AREAS = [
  // Central London examples - customize these based on actual service areas
  "SW1", "SW2", "SW3", "SW4", "SW5", "SW6", "SW7", "SW8", "SW9", "SW10",
  "SW11", "SW12", "SW13", "SW14", "SW15", "SW16", "SW17", "SW18", "SW19", "SW20",
  "W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10",
  "W11", "W12", "W13", "W14",
  "E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10",
  "SE1", "SE2", "SE3", "SE4", "SE5", "SE6", "SE7", "SE8", "SE9", "SE10",
  "N1", "N2", "N3", "N4", "N5", "N6", "N7", "N8", "N9", "N10",
  "NW1", "NW2", "NW3", "NW4", "NW5", "NW6", "NW7", "NW8", "NW9", "NW10",
];

export interface PostcodeValidationResult {
  isValid: boolean;
  inServiceArea: boolean;
  message?: string;
  formattedPostcode?: string;
}

/**
 * Validates UK postcode format
 * UK postcodes format: AA9A 9AA, A9A 9AA, A9 9AA, A99 9AA, AA9 9AA, AA99 9AA
 */
export function validateUKPostcodeFormat(postcode: string): boolean {
  // Remove all spaces and convert to uppercase
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  
  // UK postcode regex pattern
  const postcodeRegex = /^([A-Z]{1,2})([0-9]{1,2}[A-Z]?)\s?([0-9][A-Z]{2})$/i;
  
  return postcodeRegex.test(cleanPostcode);
}

/**
 * Formats UK postcode to standard format (e.g., "SW1A 1AA")
 */
export function formatPostcode(postcode: string): string {
  // Remove all spaces and convert to uppercase
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  
  // Insert space before last 3 characters
  if (cleanPostcode.length >= 5) {
    const outward = cleanPostcode.slice(0, -3);
    const inward = cleanPostcode.slice(-3);
    return `${outward} ${inward}`;
  }
  
  return cleanPostcode;
}

/**
 * Extracts the outward code (area) from a postcode
 * E.g., "SW1A 1AA" -> "SW1"
 */
export function extractOutwardCode(postcode: string): string {
  const cleanPostcode = postcode.replace(/\s/g, "").toUpperCase();
  
  // Match the area and district (letters followed by first digit(s))
  const match = cleanPostcode.match(/^([A-Z]{1,2})([0-9]{1,2})/);
  
  if (match) {
    return match[1] + match[2];
  }
  
  // Fallback: just return first 2-4 characters
  return cleanPostcode.substring(0, Math.min(4, cleanPostcode.length));
}

/**
 * Check if postcode is in the allowed service area
 */
export function isPostcodeInServiceArea(postcode: string): boolean {
  const outwardCode = extractOutwardCode(postcode);
  
  // Check if the outward code matches any allowed area
  return ALLOWED_POSTCODE_AREAS.some(allowedArea => {
    // Exact match or starts with allowed area
    return outwardCode === allowedArea || outwardCode.startsWith(allowedArea);
  });
}

/**
 * Complete postcode validation including format and service area
 */
export function validatePostcode(postcode: string): PostcodeValidationResult {
  if (!postcode || postcode.trim().length === 0) {
    return {
      isValid: false,
      inServiceArea: false,
      message: "Please enter a postcode",
    };
  }

  const isValidFormat = validateUKPostcodeFormat(postcode);
  
  if (!isValidFormat) {
    return {
      isValid: false,
      inServiceArea: false,
      message: "Please enter a valid UK postcode (e.g., SW1A 1AA)",
    };
  }

  const formattedPostcode = formatPostcode(postcode);
  const inServiceArea = isPostcodeInServiceArea(formattedPostcode);

  if (!inServiceArea) {
    return {
      isValid: true,
      inServiceArea: false,
      message: "Sorry, we don't currently service this area. Our services are available in selected London postcodes.",
      formattedPostcode,
    };
  }

  return {
    isValid: true,
    inServiceArea: true,
    message: "Postcode is in our service area",
    formattedPostcode,
  };
}

/**
 * Get list of allowed postcode areas (for display purposes)
 */
export function getAllowedPostcodeAreas(): string[] {
  return [...ALLOWED_POSTCODE_AREAS];
}
