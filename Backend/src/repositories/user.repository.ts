import { supabase } from '../config/database.config';
import { User, UserWithoutPassword } from '../models/user.model';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .single();

    if (error) {
      console.error('Error finding user by email:', error);
      return null;
    }
    return data;
  }

  async findById(id: string): Promise<User | null> {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      console.error('Error finding user by id:', error);
      return null;
    }
    return data;
  }

  async findAll(): Promise<UserWithoutPassword[]> {
    const { data, error } = await supabase
      .from('users')
      .select('id, email, created_at, updated_at')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error finding all users:', error);
      return [];
    }
    return data;
  }

  async create(email: string, passwordHash: string): Promise<User> {
    const { data, error } = await supabase
      .from('users')
      .insert([{ email, password_hash: passwordHash }])
      .select()
      .single();

    if (error) {
      console.error('Error creating user:', error);
      throw new Error(`Error creating user: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned after creating user');
    }

    return data;
  }

  async update(id: string, email?: string, passwordHash?: string): Promise<User> {
    const updateData: any = {
      updated_at: new Date().toISOString(),
    };

    if (email !== undefined) {
      updateData.email = email;
    }

    if (passwordHash !== undefined) {
      updateData.password_hash = passwordHash;
    }

    const { data, error } = await supabase
      .from('users')
      .update(updateData)
      .eq('id', id)
      .select()
      .single();

    if (error) {
      console.error('Error updating user:', error);
      throw new Error(`Error updating user: ${error.message}`);
    }

    if (!data) {
      throw new Error('No data returned after updating user');
    }

    return data;
  }

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Error deleting user:', error);
      throw new Error(`Error deleting user: ${error.message}`);
    }
  }

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}