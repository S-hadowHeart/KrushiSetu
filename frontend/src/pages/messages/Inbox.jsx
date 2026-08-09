import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { MessageCircle, ShieldCheck } from 'lucide-react';
import { messagesApi } from '../../api/messages.api';
import { formatDate } from '../../utils/format';
import { EmptyState } from '../../components/common/EmptyState';
import { Spinner } from '../../components/common/Spinner';
import { Badge } from '../../components/common/Badge';

export default function Inbox() {
  const { data, isLoading } = useQuery({
    queryKey: ['messages', 'conversations'],
    queryFn: messagesApi.listConversations,
    refetchInterval: 15_000,
  });

  const conversations = data?.conversations || [];

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-field-900">Messages</h1>
        <p className="text-sm text-field-500">Chat directly with farmers and buyers about offers and listings.</p>
      </div>

      {isLoading && (
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6 text-field-500" />
        </div>
      )}

      {!isLoading && conversations.length === 0 && (
        <EmptyState
          icon={MessageCircle}
          title="No conversations yet"
          description="Message someone from a goods listing, a need, or an offer to start a conversation."
        />
      )}

      {!isLoading && conversations.length > 0 && (
        <div className="card divide-y divide-field-100">
          {conversations.map(({ partner, lastMessage, unreadCount }) => (
            <Link
              key={partner.id}
              to={`/messages/${partner.id}`}
              className="flex items-center justify-between gap-3 p-4 hover:bg-field-50"
            >
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="truncate font-medium text-field-900">{partner.name}</p>
                  {partner.verified && <ShieldCheck className="h-3.5 w-3.5 shrink-0 text-field-600" />}
                </div>
                <p className="truncate text-sm text-field-500">{lastMessage.body}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-1">
                <span className="text-xs text-field-400">{formatDate(lastMessage.createdAt)}</span>
                {unreadCount > 0 && <Badge tone="warning">{unreadCount} new</Badge>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
