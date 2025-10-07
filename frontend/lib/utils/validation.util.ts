export class ValidationUtil {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly MIN_PASSWORD_LENGTH = 6;

  static isValidEmail(email: string): boolean {
    return this.EMAIL_REGEX.test(email);
  }

  static isValidPassword(password: string): boolean {
    return password.length >= this.MIN_PASSWORD_LENGTH;
  }

  static validateRegisterForm(email: string, password: string, confirmPassword: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    } else if (!this.isValidEmail(email)) {
      errors.push('Invalid email format');
    }

    if (!password) {
      errors.push('Password is required');
    } else if (!this.isValidPassword(password)) {
      errors.push('Password must be at least 6 characters');
    }

    if (password !== confirmPassword) {
      errors.push('Passwords do not match');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }

  static validateLoginForm(email: string, password: string): {
    valid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!email) {
      errors.push('Email is required');
    }

    if (!password) {
      errors.push('Password is required');
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}