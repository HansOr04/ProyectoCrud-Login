import { RegisterDto } from "../../models/dto/register.dto";

export class RegisterValidator {
    // expresiones normalmente usadas para validar correos y contraseñas
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    private static readonly MIN_PASSWORD_LENGTH = 8;
    validate(dto: RegisterDto): {valid: boolean; errors: string[]} {
        const errors: string[] = [];
        if(!dto.email){
            errors.push('Email is required');
        }else if(!RegisterValidator.EMAIL_REGEX.test(dto.email)){
            errors.push('Invalid email format');
        }

        if(!dto.password){
            errors.push('Password is required');
        }else if(dto.password.length < RegisterValidator.MIN_PASSWORD_LENGTH){
            errors.push(`Password must be at least ${RegisterValidator.MIN_PASSWORD_LENGTH} characters long`);
        }

        return {
            valid: errors.length === 0,
            errors,
        };
    }

}