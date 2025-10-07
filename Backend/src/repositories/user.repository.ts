import { supabase } from '../config/database.config';
import { User } from '../models/user.model';

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

  async existsByEmail(email: string): Promise<boolean> {
    const user = await this.findByEmail(email);
    return user !== null;
  }
}