import { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ArrowLeft, Send, ShieldCheck } from 'lucide-react';
import { messagesApi } from '../../api/messages.api';
import { useAuth } from '../../hooks/useAuth';
import { extractErrorMessage } from '../../utils/format';
import { Spinner } from '../../components/common/Spinner';

export default function Thread() {
  const { userId } = useParams();
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [draft, setDraft] = useState('');
  const bottomRef = useRef(null);

  const { data, isLoading } = useQuery({
    queryKey: ['messages', 'thread', userId],
    queryFn: () => messagesApi.getThread(userId),
    refetchInterval: 5_000, // simple polling in place of a websocket connection
  });

  const sendMutation = useMutation({
    mutationFn: (body) => messagesApi.send({ toUserId: Number(userId), body }),
    onSuccess: () => {
      setDraft('');
      queryClient.invalidateQueries({ queryKey: ['messages', 'thread', userId] });
      queryClient.invalidateQueries({ queryKey: ['messages', 'conversations'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  useEffect(() => {
    messagesApi.markThreadRead(userId).then(() => {
      queryClient.invalidateQueries({ queryKey: ['messages', 'conversations'] });
    });
  }, [userId, queryClient]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [data?.messages?.length]);

  function handleSubmit(e) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    sendMutation.mutate(body);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Spinner className="h-6 w-6 text-field-500" />
      </div>
    );
  }

  const partner = data?.partner;
  const messages = data?.messages || [];

  return (
    <div className="mx-auto flex h-[70vh] max-w-2xl flex-col">
      <div className="flex items-center gap-3 border-b border-field-100 pb-4">
        <Link to="/messages" className="text-field-500 hover:text-field-800">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <div>
          <p className="flex items-center gap-1.5 font-display text-lg font-semibold text-field-900">
            {partner?.name}
            {partner?.verified && <ShieldCheck className="h-4 w-4 text-field-600" />}
          </p>
          <p className="text-xs text-field-400">{partner?.role}</p>
        </div>
      </div>

      <div className="flex-1 space-y-3 overflow-y-auto py-4">
        {messages.length === 0 && (
          <p className="py-10 text-center text-sm text-field-400">Say hello to start the conversation.</p>
        )}
        {messages.map((m) => {
          const mine = m.senderId === user.id;
          return (
            <div key={m.id} className={`flex ${mine ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-2 text-sm ${
                  mine ? 'bg-field-700 text-white' : 'bg-field-50 text-field-800'
                }`}
              >
                <p>{m.body}</p>
                <p className={`mt-1 text-[10px] ${mine ? 'text-field-200' : 'text-field-400'}`}>
                  {new Date(m.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={bottomRef} />
      </div>

      <form onSubmit={handleSubmit} className="flex gap-2 border-t border-field-100 pt-4">
        <input
          className="field-input flex-1"
          placeholder="Type a message…"
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
        />
        <button type="submit" className="btn-primary !px-4" disabled={sendMutation.isPending || !draft.trim()}>
          <Send className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}
