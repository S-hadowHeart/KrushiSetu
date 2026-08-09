import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'react-router-dom';
import { MailCheck } from 'lucide-react';
import toast from 'react-hot-toast';
import { authApi } from '../../api/auth.api';
import { forgotPasswordSchema } from '../../utils/schemas';
import { extractErrorMessage } from '../../utils/format';
import { Input } from '../../components/common/Input';
import { Spinner } from '../../components/common/Spinner';

export default function ForgotPassword() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(forgotPasswordSchema) });

  async function onSubmit(values) {
    setSubmitting(true);
    try {
      await authApi.forgotPassword(values.email);
      setSent(true);
    } catch (err) {
      toast.error(extractErrorMessage(err));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="mx-auto max-w-md">
      <div className="card p-8">
        <div className="mb-6 flex items-center gap-2">
          <span className="grid h-10 w-10 place-items-center rounded-lg bg-field-700 text-white">
            <MailCheck className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-field-900">Reset your password</h1>
            <p className="text-sm text-field-500">We&apos;ll email you a reset link</p>
          </div>
        </div>

        {sent ? (
          <p className="rounded-lg bg-field-50 p-4 text-sm text-field-700">
            If an account exists for that email, a reset link is on its way. Check your inbox.
          </p>
        ) : (
          <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
            <Input
              id="email"
              type="email"
              label="Email"
              placeholder="you@example.com"
              error={errors.email?.message}
              {...register('email')}
            />
            <button type="submit" className="btn-primary w-full" disabled={submitting}>
              {submitting && <Spinner className="h-4 w-4" />} Send reset link
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-sm text-field-500">
          <Link to="/login" className="font-semibold text-field-700 hover:text-field-900">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
