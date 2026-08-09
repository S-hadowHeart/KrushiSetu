import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ShieldQuestion, Check, X } from 'lucide-react';
import { verificationApi } from '../../api/verification.api';
import { extractErrorMessage, formatDate } from '../../utils/format';
import { fileUrl } from '../../utils/constants';
import { Spinner } from '../../components/common/Spinner';
import { EmptyState } from '../../components/common/EmptyState';

export default function AdminVerifications() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ['admin', 'verifications'],
    queryFn: verificationApi.listPending,
  });

  const reviewMutation = useMutation({
    mutationFn: ({ id, status }) => verificationApi.review(id, status),
    onSuccess: () => {
      toast.success('Verification reviewed');
      queryClient.invalidateQueries({ queryKey: ['admin', 'verifications'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  if (isLoading) return <Spinner className="h-6 w-6 text-field-500" />;
  const items = data?.items || [];
  if (!items.length) {
    return <EmptyState icon={ShieldQuestion} title="Nothing pending" description="All verification requests are reviewed." />;
  }

  return (
    <div className="card divide-y divide-field-100">
      {items.map((v) => (
        <div key={v.id} className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium text-field-800">
              User #{v.userId} · {v.idType} · {v.idNumber}
            </p>
            <p className="text-xs text-field-400">Submitted {formatDate(v.createdAt)}</p>
            {v.attachments?.length > 0 && (
              <div className="mt-2 flex gap-2">
                {v.attachments.map((a) => (
                  <a
                    key={a}
                    href={fileUrl(a)}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-medium text-field-600 underline"
                  >
                    Attachment
                  </a>
                ))}
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <button
              className="btn-primary !px-3 !py-2"
              disabled={reviewMutation.isPending}
              onClick={() => reviewMutation.mutate({ id: v.id, status: 'APPROVED' })}
            >
              <Check className="h-4 w-4" /> Approve
            </button>
            <button
              className="btn-secondary !px-3 !py-2"
              disabled={reviewMutation.isPending}
              onClick={() => reviewMutation.mutate({ id: v.id, status: 'REJECTED' })}
            >
              <X className="h-4 w-4" /> Reject
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
