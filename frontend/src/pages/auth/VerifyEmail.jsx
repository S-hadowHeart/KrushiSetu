import { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { CheckCircle2, XCircle } from 'lucide-react';
import { authApi } from '../../api/auth.api';
import { extractErrorMessage } from '../../utils/format';
import { Spinner } from '../../components/common/Spinner';

export default function VerifyEmail() {
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');
  const [state, setState] = useState('loading'); // loading | success | error
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) {
      setState('error');
      setMessage('No verification token provided.');
      return;
    }
    let cancelled = false;
    authApi
      .verifyEmail(token)
      .then((res) => {
        if (cancelled) return;
        setState('success');
        setMessage(res.message || 'Email verified');
      })
      .catch((err) => {
        if (cancelled) return;
        setState('error');
        setMessage(extractErrorMessage(err));
      });
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="mx-auto max-w-md">
      <div className="card flex flex-col items-center gap-3 p-10 text-center">
        {state === 'loading' && (
          <>
            <Spinner className="h-8 w-8 text-field-600" />
            <p className="text-sm text-field-500">Verifying your email…</p>
          </>
        )}
        {state === 'success' && (
          <>
            <CheckCircle2 className="h-10 w-10 text-field-600" />
            <h1 className="font-display text-lg font-semibold text-field-900">{message}</h1>
            <Link to="/login" className="btn-primary mt-2">
              Continue to login
            </Link>
          </>
        )}
        {state === 'error' && (
          <>
            <XCircle className="h-10 w-10 text-rose-500" />
            <h1 className="font-display text-lg font-semibold text-field-900">Verification failed</h1>
            <p className="text-sm text-field-500">{message}</p>
            <Link to="/login" className="btn-secondary mt-2">
              Back to login
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
