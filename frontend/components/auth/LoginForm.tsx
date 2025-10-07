'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { AuthEndpoints } from '@/lib/api/endpoints/auth.endpoints';
import { useAuth } from '@/hooks/useAuth';
import { ValidationUtil } from '@/lib/utils/validation.util';
import { Input } from '@/components/common/Input';
import { Button } from '@/components/common/Button';
import { ErrorMessage } from '@/components/common/ErrorMessage';
import { ROUTES } from '@/constants/routes';
import Link from 'next/link';

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = ValidationUtil.validateLoginForm(email, password);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthEndpoints.login(email, password);
      console.log('Login response:', response); // DEBUG
      console.log('Token:', response.token); // DEBUG
      console.log('User:', response.user); // DEBUG
      
      login(response.token, response.user);
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      console.error('Login error:', err); // DEBUG
      setError(err instanceof Error ? err.message : 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <ErrorMessage message={error} />

      <Input
        label="Email"
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />

      <Button type="submit" isLoading={isLoading}>
        Login
      </Button>

      <p className="text-center text-gray-600">
        Don't have an account?{' '}
        <Link href={ROUTES.REGISTER} className="text-blue-600 hover:text-blue-700 font-semibold">
          Register
        </Link>
      </p>
    </form>
  );
}