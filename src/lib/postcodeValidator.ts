// UK Postcode validation and service area checking

// Define allowed postcode areas (outward codes)
// Nottingham and Leicestershire service areas
const ALLOWED_POSTCODE_AREAS = [
  "NG2", "NG4", "NG11", "NG12", "NG13", "NG14", "NG23", "NG24", "NG25", 
  "NG31", "NG32", "LE13", "LE14",
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
      message: "Sorry, we don't currently service this area. We cover: NG2, NG4, NG11, NG12, NG13, NG14, NG23, NG24, NG25, NG31, NG32, LE13, LE14",
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
