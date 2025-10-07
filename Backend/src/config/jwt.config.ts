export class JwtConfig {
  public static readonly SECRET: string = process.env.JWT_SECRET || 'default-secret-change-me';
  public static readonly EXPIRES_IN: number = 60 * 60 * 24 * 7; // 7 días en segundos

  public static validate(): void {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is required in environment variables');
    }

    if (this.SECRET === 'default-secret-change-me') {
      console.warn('⚠️  WARNING: Using default JWT secret. Please set JWT_SECRET in .env');
    }
  }
}