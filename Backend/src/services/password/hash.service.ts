import bycrypt from 'bcryptjs';
export class HashService {
    private static readonly SALT_ROUNDS = 10;

    async hash(password: string): Promise<string> {
        const salt = await bycrypt.genSalt(HashService.SALT_ROUNDS);
        return bycrypt.hash(password, salt);
    }
}