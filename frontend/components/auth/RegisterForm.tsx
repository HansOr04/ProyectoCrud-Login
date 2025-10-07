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

export function RegisterForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const validation = ValidationUtil.validateRegisterForm(email, password, confirmPassword);
    if (!validation.valid) {
      setError(validation.errors.join(', '));
      return;
    }

    setIsLoading(true);

    try {
      const response = await AuthEndpoints.register(email, password);
      login(response.token, response.user);
      router.push(ROUTES.DASHBOARD);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Registration failed');
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

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />

      <Button type="submit" isLoading={isLoading}>
        Create Account
      </Button>

      <p className="text-center text-gray-600">
        Already have an account?{' '}
        <Link href={ROUTES.LOGIN} className="text-blue-600 hover:text-blue-700 font-semibold">
          Login
        </Link>
      </p>
    </form>
  );
}