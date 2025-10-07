import { UpdateUserDto } from '../../models/dto/update-user.dto';

export class UpdateUserValidator {
  private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  private static readonly MIN_PASSWORD_LENGTH = 6;

  validate(dto: UpdateUserDto): { valid: boolean; errors: string[] } {
    const errors: string[] = [];

    if (dto.email !== undefined) {
      if (!dto.email) {
        errors.push('Email cannot be empty');
      } else if (!UpdateUserValidator.EMAIL_REGEX.test(dto.email)) {
        errors.push('Invalid email format');
      }
    }

    if (dto.password !== undefined) {
      if (!dto.password) {
        errors.push('Password cannot be empty');
      } else if (dto.password.length < UpdateUserValidator.MIN_PASSWORD_LENGTH) {
        errors.push(`Password must be at least ${UpdateUserValidator.MIN_PASSWORD_LENGTH} characters`);
      }
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  }
}