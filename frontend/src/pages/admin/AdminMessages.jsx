import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { MessagesSquare } from 'lucide-react';
import { adminApi } from '../../api/admin.api';
import { formatDate } from '../../utils/format';
import { Spinner } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';
import { Pagination } from '../../components/common/Pagination';

export default function AdminMessages() {
  const [page, setPage] = useState(1);
  const limit = 25;

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'messages', page],
    queryFn: () => adminApi.listMessages({ page, limit }),
    placeholderData: (prev) => prev,
  });

  if (isLoading) return <Spinner className="h-6 w-6 text-field-500" />;
  const items = data?.items || [];
  if (!items.length) return <EmptyState icon={MessagesSquare} title="No messages yet" />;

  return (
    <div className="space-y-4">
      <div className="card divide-y divide-field-100">
        {items.map((m) => (
          <div key={m.id} className="flex flex-col gap-1 p-4 text-sm">
            <div className="flex items-center justify-between text-xs text-field-400">
              <span>
                <span className="font-medium text-field-700">{m.sender?.name}</span> →{' '}
                <span className="font-medium text-field-700">{m.receiver?.name}</span>
              </span>
              <span>{formatDate(m.createdAt)}</span>
            </div>
            <p className="text-field-800">{m.body}</p>
          </div>
        ))}
      </div>
      <Pagination page={data.page} limit={data.limit} total={data.total} onPageChange={setPage} />
    </div>
  );
}
