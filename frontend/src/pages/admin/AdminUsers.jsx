import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UserX } from 'lucide-react';
import { adminApi } from '../../api/admin.api';
import { extractErrorMessage, formatDate } from '../../utils/format';
import { Badge } from '../../components/common/Badge';
import { Spinner } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';

export default function AdminUsers() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: adminApi.listUsers,
  });

  const suspendMutation = useMutation({
    mutationFn: (id) => adminApi.suspendUser(id),
    onSuccess: () => {
      toast.success('User suspended');
      queryClient.invalidateQueries({ queryKey: ['admin', 'users'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  if (isLoading) return <Spinner className="h-6 w-6 text-field-500" />;
  const users = data?.users || [];
  if (!users.length) return <EmptyState icon={UserX} title="No users found" />;

  return (
    <div className="card overflow-x-auto">
      <table className="w-full text-left text-sm">
        <thead className="border-b border-field-100 text-xs uppercase tracking-wide text-field-400">
          <tr>
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Role</th>
            <th className="px-5 py-3">Verified</th>
            <th className="px-5 py-3">Joined</th>
            <th className="px-5 py-3" />
          </tr>
        </thead>
        <tbody className="divide-y divide-field-100">
          {users.map((u) => (
            <tr key={u.id}>
              <td className="px-5 py-3 font-medium text-field-800">{u.name}</td>
              <td className="px-5 py-3 text-field-600">{u.email}</td>
              <td className="px-5 py-3">
                <Badge tone="neutral">{u.role}</Badge>
              </td>
              <td className="px-5 py-3">
                {u.verified ? <Badge tone="success">Verified</Badge> : <Badge tone="warning">Unverified</Badge>}
              </td>
              <td className="px-5 py-3 text-field-500">{formatDate(u.createdAt)}</td>
              <td className="px-5 py-3 text-right">
                <button
                  className="btn-danger !px-3 !py-1.5"
                  disabled={suspendMutation.isPending}
                  onClick={() => {
                    if (confirm(`Suspend ${u.name}?`)) suspendMutation.mutate(u.id);
                  }}
                >
                  Suspend
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
