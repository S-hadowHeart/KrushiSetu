import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { FileX } from 'lucide-react';
import { adminApi } from '../../api/admin.api';
import { extractErrorMessage, formatDate } from '../../utils/format';
import { Spinner } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';

export default function AdminNeeds() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'needs'],
    queryFn: adminApi.listNeeds,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => adminApi.deleteNeed(id),
    onSuccess: () => {
      toast.success('Need removed');
      queryClient.invalidateQueries({ queryKey: ['admin', 'needs'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  if (isLoading) return <Spinner className="h-6 w-6 text-field-500" />;
  const items = data?.items || [];
  if (!items.length) return <EmptyState icon={FileX} title="No needs posted" />;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-field-100 text-xs uppercase tracking-wide text-field-400">
          <tr>
            <th className="px-5 py-3">Need</th>
            <th className="px-5 py-3">Buyer</th>
            <th className="px-5 py-3">Qty needed</th>
            <th className="px-5 py-3">Posted</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-field-100">
          {items.map((n) => (
            <tr key={n.id}>
              <td className="px-5 py-3 font-medium text-field-800">
                <Link to={`/needs/${n.publicId}`} className="hover:underline">
                  {n.title}
                </Link>
              </td>
              <td className="px-5 py-3 text-field-600">{n.buyer?.name}</td>
              <td className="px-5 py-3 text-field-600">{n.qtyNeeded}</td>
              <td className="px-5 py-3 text-field-500">{formatDate(n.createdAt)}</td>
              <td className="px-5 py-3 text-right">
                <button
                  className="btn-danger !px-3 !py-1.5"
                  disabled={deleteMutation.isPending}
                  onClick={() => {
                    if (confirm(`Remove "${n.title}"?`)) deleteMutation.mutate(n.id);
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
