/**
 * Form validation utilities
 */

export const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10,15}$/;
    return phoneRegex.test(phone.replace(/\D/g, ''));
};

export const validateOTP = (otp: string): boolean => {
    return /^[0-9]{6}$/.test(otp);
};

export const validatePassword = (password: string): {
    valid: boolean;
    errors: string[];
} => {
    const errors: string[] = [];

    if (password.length < 8) {
        errors.push('At least 8 characters');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('One uppercase letter');
    }
    if (!/[0-9]/.test(password)) {
        errors.push('One number');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};

export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length <= 3) return cleaned;
    if (cleaned.length <= 6) return `${cleaned.slice(0, 3)} ${cleaned.slice(3)}`;
    return `${cleaned.slice(0, 3)} ${cleaned.slice(3, 6)} ${cleaned.slice(6, 10)}`;
};
