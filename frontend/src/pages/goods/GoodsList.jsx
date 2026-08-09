import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { Search, Plus, MapPin, ShieldCheck } from 'lucide-react';
import { goodsApi } from '../../api/goods.api';
import { formatCurrency } from '../../utils/format';
import { fileUrl } from '../../utils/constants';
import { useAuth } from '../../hooks/useAuth';
import { ROLES } from '../../utils/constants';
import { Input } from '../../components/common/Input';
import { EmptyState } from '../../components/common/EmptyState';
import { Pagination } from '../../components/common/Pagination';
import { Spinner } from '../../components/common/Spinner';

export default function GoodsList() {
  const { user } = useAuth();
  const [q, setQ] = useState('');
  const [location, setLocation] = useState('');
  const [page, setPage] = useState(1);
  const limit = 12;

  const { data, isLoading } = useQuery({
    queryKey: ['goods', { q, location, page, limit }],
    queryFn: () =>
      goodsApi.list({
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
          <h1 className="font-display text-2xl font-semibold text-field-900">Goods marketplace</h1>
          <p className="text-sm text-field-500">Fresh listings straight from the farm.</p>
        </div>
        {user?.role === ROLES.FARMER && (
          <Link to="/goods/new" className="btn-primary">
            <Plus className="h-4 w-4" /> New listing
          </Link>
        )}
      </div>

      <div className="card flex flex-col gap-3 p-4 sm:flex-row">
        <Input
          className="flex-1"
          placeholder="Search by name…"
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
        <EmptyState
          icon={Search}
          title="No goods found"
          description="Try a different search term or check back later."
        />
      )}

      {!isLoading && data?.items?.length > 0 && (
        <>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.items.map((good) => (
              <GoodCard key={good.id} good={good} />
            ))}
          </div>
          <Pagination page={data.page} limit={data.limit} total={data.total} onPageChange={setPage} />
        </>
      )}
    </div>
  );
}

function GoodCard({ good }) {
  const cover = good.images?.[0];
  return (
    <Link to={`/goods/${good.publicId}`} className="card group flex flex-col overflow-hidden transition-shadow hover:shadow-card">
      <div className="aspect-[4/3] w-full overflow-hidden bg-field-50">
        {cover ? (
          <img
            src={fileUrl(cover)}
            alt={good.name}
            crossOrigin="anonymous"
            loading="lazy"
            className="h-full w-full object-cover transition-transform group-hover:scale-105"
          />
        ) : (
          <div className="grid h-full place-items-center text-field-300">
            <span className="font-display text-2xl">🌾</span>
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="font-display text-base font-semibold text-field-900">{good.name}</h3>
        <p className="text-sm font-medium text-field-700">
          {formatCurrency(good.priceMin)} – {formatCurrency(good.priceMax)}
          <span className="ml-1 text-xs font-normal text-field-400">
            / {good.minQty}–{good.maxQty} units
          </span>
        </p>
        {good.locations?.length > 0 && (
          <p className="flex items-center gap-1 text-xs text-field-500">
            <MapPin className="h-3.5 w-3.5" /> {good.locations.join(', ')}
          </p>
        )}
        {good.farmer?.verified && (
          <span className="mt-auto inline-flex items-center gap-1 text-xs font-medium text-field-600">
            <ShieldCheck className="h-3.5 w-3.5" /> Verified farmer
          </span>
        )}
      </div>
    </Link>
  );
}
