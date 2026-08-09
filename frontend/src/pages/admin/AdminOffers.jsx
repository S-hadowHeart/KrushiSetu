import { useQuery } from '@tanstack/react-query';
import { HandCoins } from 'lucide-react';
import { adminApi } from '../../api/admin.api';
import { formatCurrency, formatDate } from '../../utils/format';
import { Badge, statusTone } from '../../components/common/Badge';
import { Spinner } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';

export default function AdminOffers() {
  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'offers'],
    queryFn: adminApi.listOffers,
  });

  if (isLoading) return <Spinner className="h-6 w-6 text-field-500" />;
  const offers = data?.offers || [];
  if (!offers.length) return <EmptyState icon={HandCoins} title="No offers yet" />;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-field-100 text-xs uppercase tracking-wide text-field-400">
          <tr>
            <th className="px-5 py-3">From</th>
            <th className="px-5 py-3">To</th>
            <th className="px-5 py-3">Listing</th>
            <th className="px-5 py-3">Terms</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-field-100">
          {offers.map((o) => (
            <tr key={o.id}>
              <td className="px-5 py-3 text-field-800">{o.fromUser?.name}</td>
              <td className="px-5 py-3 text-field-800">{o.toUser?.name}</td>
              <td className="px-5 py-3 text-field-600">{o.good?.name || o.need?.title || '—'}</td>
              <td className="px-5 py-3 text-field-600">
                {o.qty} units @ {formatCurrency(o.price)}
              </td>
              <td className="px-5 py-3">
                <Badge tone={statusTone(o.status)}>{o.status}</Badge>
              </td>
              <td className="px-5 py-3 text-field-500">{formatDate(o.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
