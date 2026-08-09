import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LogIn } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../api/auth.api';
import { loginSchema } from '../../utils/schemas';
import { extractErrorMessage } from '../../utils/format';
import { Input } from '../../components/common/Input';
import { Spinner } from '../../components/common/Spinner';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [needsVerification, setNeedsVerification] = useState(null); // holds the email if unverified
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm({ resolver: zodResolver(loginSchema) });

  async function onSubmit(values) {
    setSubmitting(true);
    setNeedsVerification(null);
    try {
      await login(values.email, values.password);
      toast.success('Welcome back!');
      const redirectTo = location.state?.from?.pathname || '/dashboard';
      navigate(redirectTo, { replace: true });
    } catch (err) {
      const message = extractErrorMessage(err);
      if (err?.response?.status === 403 && /verif/i.test(message)) {
        setNeedsVerification(values.email);
      } else {
        toast.error(message);
      }
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    const email = needsVerification || getValues('email');
    if (!email) return;
    setResending(true);
    try {
      await authApi.resendVerification(email);
      toast.success('Verification email sent — check your inbox.');
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setResending(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-700 text-white">
            <LogIn className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-field-900">Log in</h1>
            <p className="text-sm text-field-500">Welcome back to KrushiSetu</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id="email"
            type="email"
            label="Email"
            autoComplete="email"
            placeholder="you@example.com"
            error={errors.email?.message}
            {...register('email')}
          />
          <Input
            id="password"
            type="password"
            label="Password"
            autoComplete="current-password"
            placeholder="••••••••"
            error={errors.password?.message}
            {...register('password')}
          />
          <div className="flex justify-end">
            <Link to="/forgot-password" className="text-sm font-medium text-field-600 hover:text-field-800">
              Forgot password?
            </Link>
          </div>
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting && <Spinner className="h-4 w-4" />} Log in
          </button>
        </form>

        {needsVerification && (
          <div className="mt-4 space-y-2 rounded-lg bg-mustard-50 p-4 text-sm text-mustard-700">
            <p>Your email isn&apos;t verified yet, so you can&apos;t log in.</p>
            <button className="btn-secondary w-full" onClick={handleResend} disabled={resending}>
              {resending && <Spinner className="h-4 w-4" />} Resend verification email
            </button>
          </div>
        )}

        <p className="mt-6 text-center text-sm text-field-500">
          Don&apos;t have an account?{' '}
          <Link to="/register" className="font-semibold text-field-700 hover:text-field-900">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
