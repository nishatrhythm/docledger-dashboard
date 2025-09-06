// Validation utilities for Bangladeshi mobile numbers and other form fields

export interface ValidationResult {
  isValid: boolean;
  error: string | null;
}

export const validateBangladeshiMobile = (mobile: string, t: (key: string) => string): ValidationResult => {
  if (!mobile) {
    return { isValid: false, error: t('validation.phoneRequired') };
  }

  // Remove any spaces or special characters
  const cleanMobile = mobile.replace(/\s+/g, '').replace(/[^0-9]/g, '');
  
  // Check if it's exactly 11 digits
  if (cleanMobile.length !== 11) {
    return { isValid: false, error: t('validation.phoneLength') };
  }
  
  // Check if it starts with 01
  if (!cleanMobile.startsWith('01')) {
    return { isValid: false, error: t('validation.phoneStart') };
  }
  
  // Check if third digit is between 3-9 (valid Bangladeshi operators)
  const thirdDigit = parseInt(cleanMobile[2]);
  if (thirdDigit < 3 || thirdDigit > 9) {
    return { isValid: false, error: t('validation.phoneOperator') };
  }
  
  return { isValid: true, error: null };
};

export const validatePassword = (password: string, t: (key: string) => string): ValidationResult => {
  if (!password) {
    return { isValid: false, error: t('validation.passwordRequired') };
  }
  
  if (password.length < 6) {
    return { isValid: false, error: t('validation.passwordLength') };
  }
  
  return { isValid: true, error: null };
};

export const formatMobileNumber = (mobile: string): string => {
  // Remove any non-digit characters
  const cleanMobile = mobile.replace(/[^0-9]/g, '');
  
  // Limit to 11 digits
  if (cleanMobile.length > 11) {
    return cleanMobile.slice(0, 11);
  }
  
  return cleanMobile;
};

export const formatMobileDisplay = (mobile: string): string => {
  const clean = formatMobileNumber(mobile);
  if (clean.length === 11) {
    // Format as 01XXX-XXXXXX
    return `${clean.slice(0, 5)}-${clean.slice(5)}`;
  }
  return clean;
};
