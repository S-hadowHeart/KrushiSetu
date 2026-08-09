import { useQuery } from '@tanstack/react-query';
import { ShieldCheck, ShieldAlert, Mail, Calendar } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import { ratingsApi } from '../api/ratings.api';
import { formatDate } from '../utils/format';
import { Badge } from '../components/common/Badge';
import { RatingStars } from '../components/common/RatingStars';
import { Spinner } from '../components/common/Spinner';

export default function Profile() {
  const { user } = useAuth();

  const { data: ratingData, isLoading } = useQuery({
    queryKey: ['ratings', 'user', user?.id],
    queryFn: () => ratingsApi.listForTarget(user.id),
    enabled: !!user?.id,
  });

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="card p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="font-display text-2xl font-semibold text-field-900">{user?.name}</h1>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-field-500">
              <Mail className="h-4 w-4" /> {user?.email}
            </p>
          </div>
          {user?.verified ? (
            <Badge tone="success">
              <ShieldCheck className="mr-1 inline h-3.5 w-3.5" /> Verified
            </Badge>
          ) : (
            <Badge tone="warning">
              <ShieldAlert className="mr-1 inline h-3.5 w-3.5" /> Unverified
            </Badge>
          )}
        </div>

        <dl className="mt-6 grid grid-cols-2 gap-4 border-t border-field-100 pt-6 text-sm">
          <div>
            <dt className="text-field-400">Role</dt>
            <dd className="font-medium text-field-800">{user?.role}</dd>
          </div>
          <div>
            <dt className="text-field-400">Member since</dt>
            <dd className="flex items-center gap-1 font-medium text-field-800">
              <Calendar className="h-3.5 w-3.5" /> {formatDate(user?.createdAt)}
            </dd>
          </div>
        </dl>
      </div>

      <div className="card p-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-lg font-semibold text-field-900">Your reputation</h2>
          {ratingData && (
            <div className="flex items-center gap-2">
              <RatingStars value={ratingData.avg} />
              <span className="text-sm text-field-500">
                {ratingData.avg?.toFixed(1)} ({ratingData.items.length} review
                {ratingData.items.length === 1 ? '' : 's'})
              </span>
            </div>
          )}
        </div>

        {isLoading && <Spinner />}
        {ratingData && ratingData.items.length === 0 && (
          <p className="text-sm text-field-500">No ratings yet. They&apos;ll show up here after your first trade.</p>
        )}
        <ul className="space-y-3">
          {ratingData?.items.map((r) => (
            <li key={r.id} className="rounded-lg border border-field-100 p-3">
              <div className="flex items-center justify-between">
                <RatingStars value={r.score} size={14} />
                <span className="text-xs text-field-400">{formatDate(r.createdAt)}</span>
              </div>
              {r.comment && <p className="mt-1.5 text-sm text-field-700">{r.comment}</p>}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
