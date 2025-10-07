import bcrypt from 'bcryptjs';

export class CompareService {
    async compare(password: string, hash: string): Promise<boolean> {
        return bcrypt.compare(password, hash);
    }
}
