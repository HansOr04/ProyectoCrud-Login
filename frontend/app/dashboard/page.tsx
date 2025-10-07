'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Header } from '@/components/layout/Header';
import Link from 'next/link';

export default function DashboardPage() {
  const { user, isLoading, isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push(ROUTES.LOGIN);
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid gap-6">
          {/* Card de información del usuario */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-2xl font-bold mb-4">Welcome to your Dashboard!</h2>
            <div className="space-y-4">
              <div>
                <p className="text-gray-600">
                  <span className="font-semibold">User ID:</span> {user?.id}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Email:</span> {user?.email}
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">Created:</span>{' '}
                  {new Date(user?.created_at || '').toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>

          {/* Card de acciones rápidas */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h3 className="text-xl font-bold mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link
                href={ROUTES.USERS}
                className="bg-blue-600 text-white p-6 rounded-lg hover:bg-blue-700 transition text-center font-semibold shadow-lg hover:shadow-xl"
              >
                👥 Manage Users
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}