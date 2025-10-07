import { apiClient } from '../client';
import { User, UpdateUserRequest } from '@/types/user.types';

export class UsersEndpoints {
  static async getAllUsers(): Promise<{ success: boolean; users: User[] }> {
    return apiClient.get<{ success: boolean; users: User[] }>('/users');
  }

  static async getUser(id: string): Promise<{ success: boolean; user: User }> {
    return apiClient.get<{ success: boolean; user: User }>(`/users/${id}`);
  }

  static async updateUser(
    id: string,
    data: UpdateUserRequest
  ): Promise<{ success: boolean; user: User }> {
    return apiClient.put<{ success: boolean; user: User }>(`/users/${id}`, data);
  }

  static async deleteUser(id: string): Promise<{ success: boolean; message: string }> {
    return apiClient.delete<{ success: boolean; message: string }>(`/users/${id}`);
  }
}