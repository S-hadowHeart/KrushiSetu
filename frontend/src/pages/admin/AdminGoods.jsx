import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { PackageX } from 'lucide-react';
import { adminApi } from '../../api/admin.api';
import { extractErrorMessage, formatCurrency, formatDate } from '../../utils/format';
import { Spinner } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';

export default function AdminGoods() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'goods'],
    queryFn: adminApi.listGoods,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminApi.deleteGood(id),
    onSuccess: () => {
      toast.success('Listing removed');
      queryClient.invalidateQueries({ queryKey: ['admin', 'goods'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  if (isLoading) return <Spinner className="h-6 w-6 text-field-500" />;
  const items = data?.items || [];
  if (!items.length) return <EmptyState icon={PackageX} title="No listings found" />;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-field-100 text-xs uppercase tracking-wide text-field-400">
          <tr>
            <th className="px-5 py-3">Listing</th>
            <th className="px-5 py-3">Farmer</th>
            <th className="px-5 py-3">Price</th>
            <th className="px-5 py-3">Listed</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-field-100">
          {items.map((g) => (
            <tr key={g.id}>
              <td className="px-5 py-3 font-medium text-field-800">
                <Link to={`/goods/${g.publicId}`} className="hover:underline">
                  {g.name}
                </Link>
              </td>
              <td className="px-5 py-3 text-field-600">{g.farmer?.name}</td>
              <td className="px-5 py-3 text-field-600">
                {formatCurrency(g.priceMin)} – {formatCurrency(g.priceMax)}
              </td>
              <td className="px-5 py-3 text-field-500">{formatDate(g.createdAt)}</td>
              <td className="px-5 py-3 text-right">
                <button
                  className="btn-danger !px-3 !py-1.5"
                  disabled={deleteMutation.isPending}
                  onClick={() => {
                    if (confirm(`Remove "${g.name}"?`)) deleteMutation.mutate(g.id);
                  }}
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
