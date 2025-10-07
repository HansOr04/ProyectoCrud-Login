import jwt from 'jsonwebtoken';
import { JwtConfig } from '../../config/jwt.config';

export interface JwtPayload {
  userId: string;
  email: string;
}

export class TokenService {
  generate(payload: JwtPayload): string {
    const token = jwt.sign(
      payload,
      JwtConfig.SECRET,
      { expiresIn: JwtConfig.EXPIRES_IN }
    );
    return token;
  }

  verify(token: string): JwtPayload | null {
    try {
      const decoded = jwt.verify(token, JwtConfig.SECRET) as JwtPayload;
      return decoded;
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error('Token verification failed:', error.message);
      }
      return null;
    }
  }
}