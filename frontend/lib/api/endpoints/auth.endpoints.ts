import { apiClient } from '../client';
import { AuthResponse } from '@/types/auth.types';
import { User } from '@/types/user.types';

export class AuthEndpoints {
  static async register(email: string, password: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/register', { email, password });
  }

  static async login(email: string, password: string): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', { email, password });
  }

  static async getCurrentUser(): Promise<{ success: boolean; user: User }> {
    return apiClient.get<{ success: boolean; user: User }>('/auth/me');
  }
}