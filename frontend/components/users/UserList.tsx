'use client';

import { useState, useEffect } from 'react';
import { User } from '@/types/user.types';
import { UsersEndpoints } from '@/lib/api/endpoints/users.endpoints';
import { useAuth } from '@/hooks/useAuth';
import { UserCard } from './UserCard';
import { UpdateUserModal } from './UpdateUserModal';

export function UserList() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { user: currentUser } = useAuth();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const response = await UsersEndpoints.getAllUsers();
      setUsers(response.users);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdate = async (userId: string, email?: string, password?: string) => {
    const updateData: any = {};
    if (email) updateData.email = email;
    if (password) updateData.password = password;

    await UsersEndpoints.updateUser(userId, updateData);
    await fetchUsers();
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      await UsersEndpoints.deleteUser(userId);
      await fetchUsers();
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed to delete user');
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading users...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            onEdit={setSelectedUser}
            onDelete={handleDelete}
            currentUserId={currentUser?.id || ''}
          />
        ))}
      </div>

      {selectedUser && (
        <UpdateUserModal
          user={selectedUser}
          onClose={() => setSelectedUser(null)}
          onUpdate={handleUpdate}
        />
      )}
    </>
  );
}