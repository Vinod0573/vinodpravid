export function emailValidation(value: any): {
    isValid: boolean;
    errors: {
        message: string;
    };
};
export function passwordValidation(value: any): {
    isValid: boolean;
    errors: {
        message: string;
    };
};
export function nameValidation(value: any): {
    isValid: boolean;
    errors: {
        message: string;
    };
};
export function webValidation(value: any): boolean;
export function phoneNumberValidation(digit: any): {
    isValid: boolean;
    errors: {
        message: string | null;
    };
};
export function userNameValidation(value: any): {
    isValid: boolean;
    errors: {
        message: string;
    };
};
