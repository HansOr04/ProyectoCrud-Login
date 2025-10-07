import { LoginDTO } from "../../models/dto/login.dto";

export class LoginValidator {
    validate(dto: LoginDTO): {valid: boolean; errors: string[]} {
        const errors: string[] = [];
        if(!dto.email){
            errors.push('Email is required');
        }
        if(!dto.password){
            errors.push('Password is required');
        }
        return {
            valid: errors.length === 0,
            errors,
        };
    }
}