'use client';

import { User } from '@/types/user.types';
import { Button } from '../common/Button';

interface UserCardProps {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
  currentUserId: string;
}

export function UserCard({ user, onEdit, onDelete, currentUserId }: UserCardProps) {
  const isCurrentUser = user.id === currentUserId;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <div className="mb-4">
        <h3 className="text-xl font-bold text-gray-800">{user.email}</h3>
        <p className="text-sm text-gray-500 mt-1">
          ID: {user.id}
        </p>
        <p className="text-sm text-gray-500">
          Created: {new Date(user.created_at).toLocaleDateString()}
        </p>
        {isCurrentUser && (
          <span className="inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded-full">
            You
          </span>
        )}
      </div>

      <div className="flex gap-2">
        <Button
          variant="secondary"
          onClick={() => onEdit(user)}
          className="flex-1"
        >
          Edit
        </Button>
        <Button
          variant="danger"
          onClick={() => onDelete(user.id)}
          className="flex-1"
          disabled={isCurrentUser}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}