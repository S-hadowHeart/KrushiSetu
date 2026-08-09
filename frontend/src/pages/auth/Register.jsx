import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { UserPlus, MailCheck } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { authApi } from '../../api/auth.api';
import { registerSchema } from '../../utils/schemas';
import { extractErrorMessage } from '../../utils/format';
import { Input } from '../../components/common/Input';
import { Select } from '../../components/common/Select';
import { Spinner } from '../../components/common/Spinner';

const ROLE_OPTIONS = [
  { value: 'FARMER', label: 'Farmer — I sell produce' },
  { value: 'BUYER', label: 'Buyer — I need produce' },
];

export default function Register() {
  const { register: registerUser } = useAuth();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState(null);
  const [resending, setResending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(registerSchema), defaultValues: { role: 'FARMER' } });

  async function onSubmit(values) {
    setSubmitting(true);
    try {
      await registerUser(values);
      setRegisteredEmail(values.email);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  async function handleResend() {
    setResending(true);
    try {
      await authApi.resendVerification(registeredEmail);
      toast.success('Verification email sent — check your inbox.');
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setResending(false);
    }
  }

  if (registeredEmail) {
    return (
      <div className="mx-auto max-w-md">
        <div className="card flex flex-col items-center gap-3 p-8 text-center">
          <span className="grid h-12 w-12 place-items-center rounded-full bg-field-50 text-field-600">
            <MailCheck className="h-6 w-6" />
          </span>
          <h1 className="font-display text-xl font-semibold text-field-900">Check your email</h1>
          <p className="text-sm text-field-500">
            We sent a verification link to <span className="font-medium text-field-800">{registeredEmail}</span>.
            You need to verify before you can log in.
          </p>
          <p className="text-xs text-field-400">
            Running the API locally without SMTP configured? The verification link is printed to the backend&apos;s
            console output — copy it from there.
          </p>
          <button className="btn-secondary w-full" onClick={handleResend} disabled={resending}>
            {resending && <Spinner className="h-4 w-4" />} Resend verification email
          </button>
          <button className="btn-primary w-full" onClick={() => navigate('/login')}>
            I&apos;ve verified — go to login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-700 text-white">
            <UserPlus className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-field-900">Create an account</h1>
            <p className="text-sm text-field-500">Join the KrushiSetu marketplace</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id="name"
            label="Full name"
            placeholder="Asha Patil"
            error={errors.name?.message}
            {...register('name')}
          />
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
            autoComplete="new-password"
            placeholder="••••••••"
            hint="At least 8 characters, with uppercase, lowercase, a number, and a symbol."
            error={errors.password?.message}
            {...register('password')}
          />
          <Select
            id="role"
            label="I am a"
            options={ROLE_OPTIONS}
            error={errors.role?.message}
            {...register('role')}
          />
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting && <Spinner className="h-4 w-4" />} Create account
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-field-500">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-field-700 hover:text-field-900">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );
}
