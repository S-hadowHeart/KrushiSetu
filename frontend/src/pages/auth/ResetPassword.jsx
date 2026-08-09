import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { KeyRound } from 'lucide-react';
import { authApi } from '../../api/auth.api';
import { resetPasswordSchema } from '../../utils/schemas';
import { extractErrorMessage } from '../../utils/format';
import { Input } from '../../components/common/Input';
import { Spinner } from '../../components/common/Spinner';

// The backend deliberately puts the reset token in a URL *fragment*
// (#token=...) rather than a query string, so it's never sent to the server
// or logged in access/referrer logs. We read it client-side only.
function useHashToken() {
  const [token, setToken] = useState('');
  useEffect(() => {
    const hash = window.location.hash || '';
    const match = hash.match(/token=([^&]+)/);
    if (match) setToken(decodeURIComponent(match[1]));
  }, []);
  return token;
}

export default function ResetPassword() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const tokenFromUrl = useHashToken();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { token: '', password: '', confirmPassword: '' },
  });

  useEffect(() => {
    if (tokenFromUrl) reset((prev) => ({ ...prev, token: tokenFromUrl }));
  }, [tokenFromUrl, reset]);

  async function onSubmit(values) {
    setSubmitting(true);
    try {
      await authApi.resetPassword({ token: values.token, password: values.password });
      toast.success('Password reset. Please log in.');
      navigate('/login');
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
            <KeyRound className="h-5 w-5" />
          </span>
          <div>
            <h1 className="font-display text-xl font-semibold text-field-900">Set a new password</h1>
            <p className="text-sm text-field-500">Paste the token from your email if it isn&apos;t filled in</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          <Input
            id="token"
            label="Reset token"
            error={errors.token?.message}
            {...register('token')}
          />
          <Input
            id="password"
            type="password"
            label="New password"
            hint="At least 8 characters, with uppercase, lowercase, a number, and a symbol."
            error={errors.password?.message}
            {...register('password')}
          />
          <Input
            id="confirmPassword"
            type="password"
            label="Confirm new password"
            error={errors.confirmPassword?.message}
            {...register('confirmPassword')}
          />
          <button type="submit" className="btn-primary w-full" disabled={submitting}>
            {submitting && <Spinner className="h-4 w-4" />} Reset password
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-field-500">
          <Link to="/login" className="font-semibold text-field-700 hover:text-field-900">
            Back to login
          </Link>
        </p>
      </div>
    </div>
  );
}
