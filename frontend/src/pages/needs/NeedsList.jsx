import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, MapPin, ShieldCheck, Clock } from 'lucide-react';
import { needsApi } from '../../api/needs.api';
import { formatCurrency, formatDate } from '../../utils/format';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { Pagination } from '../../components/common/Pagination';
import { Spinner } from '../../components/common/Spinner';

export default function NeedsList() {
  const { user } = useAuth();
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ['needs', { q, location, page, limit }],
    queryFn: () =>
      needsApi.list({
        q: q || undefined,
        location: location || undefined,
        page,
        limit,
      }),
    placeholderData: (prev) => prev,
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="font-display text-2xl font-semibold text-field-900">Buyer needs</h1>
          <p className="text-sm text-field-500">What buyers, hotels, and NGOs are looking for right now.</p>
        </div>
        {user?.role === ROLES.BUYER && (
          <Link to="/needs/new" className="btn-primary">
            <Plus className="h-4 w-4" /> Post a need
          </Link>
        )}
      </div>

      <div className="card flex flex-col gap-3 p-4 sm:flex-row">
        <Input
          className="flex-1"
          placeholder="Search by title…"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setPage(1);
          }}
        />
        <Input
          className="sm:w-56"
          placeholder="Filter by location…"
          value={location}
          onChange={(e) => {
            setLocation(e.target.value);
            setPage(1);
          }}
        />
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6 text-field-500" />
        </div>
      )}

      {!isLoading && data?.items?.length === 0 && (
        <EmptyState icon={Search} title="No needs posted yet" description="Check back soon or adjust your filters." />
      )}

      {!isLoading && data?.items?.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((need) => (
              <NeedCard key={need.id} need={need} />
            ))}
          </div>
          <Pagination page={data.page} limit={data.limit} total={data.total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

function NeedCard({ need }) {
  return (
    <Link to={`/needs/${need.publicId}`} className="card flex flex-col gap-2 p-5 transition-shadow hover:shadow-card">
      <h3 className="font-display text-base font-semibold text-field-900">{need.title}</h3>
      <p className="text-sm text-field-600">Needs {need.qtyNeeded} units</p>
      {(need.priceMin || need.priceMax) && (
        <p className="text-sm font-medium text-field-700">
          {formatCurrency(need.priceMin)} – {formatCurrency(need.priceMax)}
        </p>
      )}
      {need.locations?.length > 0 && (
        <p className="flex items-center gap-1 text-xs text-field-500">
          <MapPin className="h-3.5 w-3.5" /> {need.locations.join(', ')}
        </p>
      )}
      {need.expiresAt && (
        <p className="flex items-center gap-1 text-xs text-field-400">
          <Clock className="h-3.5 w-3.5" /> Expires {formatDate(need.expiresAt)}
        </p>
      )}
      {need.buyer?.verified && (
        <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-field-600">
          <ShieldCheck className="h-3.5 w-3.5" /> Verified buyer
        </span>
      )}
    </Link>
  );
}
