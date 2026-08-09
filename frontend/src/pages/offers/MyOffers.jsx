import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { Inbox, Send, Check, X, MessagesSquare, Repeat } from 'lucide-react';
import { offersApi } from '../../api/offers.api';
import { extractErrorMessage, formatCurrency, formatDate } from '../../utils/format';
import { Badge, statusTone } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { Spinner } from '../../components/common/Spinner';
import { Input } from '../../components/common/Input';
import { TextArea } from '../../components/common/TextArea';
import { OFFER_STATUS } from '../../utils/constants';

export default function MyOffers() {
  const [tab, setTab] = useState('received'); // 'received' | 'sent'
  const queryClient = useQueryClient();

  const receivedQuery = useQuery({
    queryKey: ['offers', 'me'],
    queryFn: offersApi.listMine,
  });
  const sentQuery = useQuery({
    queryKey: ['offers', 'sent'],
    queryFn: offersApi.listSent,
  });

  const respondMutation = useMutation({
    mutationFn: ({ id, status }) => offersApi.respond(id, status),
    onSuccess: () => {
      toast.success('Offer updated');
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const counterMutation = useMutation({
    mutationFn: ({ id, payload }) => offersApi.counter(id, payload),
    onSuccess: () => {
      toast.success('Counter-offer sent');
      queryClient.invalidateQueries({ queryKey: ['offers'] });
    },
    onError: (err) => toast.error(extractErrorMessage(err)),
  });

  const activeQuery = tab === 'received' ? receivedQuery : sentQuery;
  const offers = activeQuery.data?.offers || [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-semibold text-field-900">Offers</h1>
        <p className="text-sm text-field-500">Track every offer you've sent or received, and negotiate terms.</p>
      </div>

      <div className="flex gap-1 border-b border-field-100 pb-3">
        <button
          onClick={() => setTab('received')}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            tab === 'received' ? 'bg-field-700 text-white' : 'text-field-700 hover:bg-field-100'
          }`}
        >
          <Inbox className="mr-1.5 inline h-4 w-4" /> Received
        </button>
        <button
          onClick={() => setTab('sent')}
          className={`rounded-lg px-3 py-2 text-sm font-medium ${
            tab === 'sent' ? 'bg-field-700 text-white' : 'text-field-700 hover:bg-field-100'
          }`}
        >
          <Send className="mr-1.5 inline h-4 w-4" /> Sent
        </button>
      </div>

      {activeQuery.isLoading && (
        <div className="flex justify-center py-16">
          <Spinner className="h-6 w-6 text-field-500" />
        </div>
      )}

      {!activeQuery.isLoading && offers.length === 0 && (
        <EmptyState
          icon={tab === 'received' ? Inbox : Send}
          title={tab === 'received' ? 'No offers received yet' : "You haven't sent any offers yet"}
          description={
            tab === 'received'
              ? 'Offers made on your listings and needs will show up here.'
              : 'Offers you make on goods or needs will show up here so you can track their status.'
          }
        />
      )}

      {!activeQuery.isLoading && offers.length > 0 && (
        <div className="space-y-3">
          {offers.map((offer) => (
            <OfferRow
              key={offer.id}
              offer={offer}
              perspective={tab}
              onRespond={(status) => respondMutation.mutate({ id: offer.id, status })}
              onCounter={(payload) => counterMutation.mutate({ id: offer.id, payload })}
              responding={respondMutation.isPending}
              countering={counterMutation.isPending}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function OfferRow({ offer, perspective, onRespond, onCounter, responding, countering }) {
  const [showCounter, setShowCounter] = useState(false);
  const [qty, setQty] = useState(offer.qty ?? '');
  const [price, setPrice] = useState(offer.price ?? '');
  const [message, setMessage] = useState('');

  const counterparty = perspective === 'received' ? offer.fromUser : offer.toUser;
  const canRespond = perspective === 'received' && offer.status === OFFER_STATUS.PENDING;
  const canCounter = offer.status === OFFER_STATUS.PENDING || offer.status === 'COUNTERED';
  const listingLabel = offer.good ? `Goods: ${offer.good.name}` : offer.need ? `Need: ${offer.need.title}` : null;

  function submitCounter() {
    onCounter({ qty: Number(qty), price: Number(price), message: message || undefined });
    setShowCounter(false);
    setMessage('');
  }

  return (
    <div className="card p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <p className="font-display text-base font-semibold text-field-900">
              {formatCurrency(offer.price)} for {offer.qty} units
            </p>
            <Badge tone={statusTone(offer.status)}>{offer.status}</Badge>
          </div>
          {listingLabel && <p className="text-xs text-field-400">{listingLabel}</p>}
          {counterparty && (
            <p className="text-xs text-field-400">
              {perspective === 'received' ? 'From' : 'To'} {counterparty.name} · {formatDate(offer.createdAt)}
            </p>
          )}
          {offer.message && <p className="mt-1 text-sm text-field-600">&ldquo;{offer.message}&rdquo;</p>}
        </div>

        <div className="flex shrink-0 flex-wrap gap-2">
          {counterparty && (
            <Link to={`/messages/${counterparty.id}`} className="btn-secondary !px-3 !py-2">
              <MessagesSquare className="h-4 w-4" /> Message
            </Link>
          )}
          {canRespond && (
            <>
              <button className="btn-primary !px-3 !py-2" disabled={responding} onClick={() => onRespond(OFFER_STATUS.ACCEPTED)}>
                <Check className="h-4 w-4" /> Accept
              </button>
              <button className="btn-secondary !px-3 !py-2" disabled={responding} onClick={() => onRespond(OFFER_STATUS.REJECTED)}>
                <X className="h-4 w-4" /> Decline
              </button>
            </>
          )}
          {canCounter && (
            <button className="btn-secondary !px-3 !py-2" onClick={() => setShowCounter((s) => !s)}>
              <Repeat className="h-4 w-4" /> Counter
            </button>
          )}
        </div>
      </div>

      {showCounter && (
        <div className="mt-4 space-y-3 rounded-lg border border-field-100 bg-field-50/60 p-4">
          <div className="grid grid-cols-2 gap-3">
            <Input type="number" step="any" label="New quantity" value={qty} onChange={(e) => setQty(e.target.value)} />
            <Input type="number" step="any" label="New price / unit" value={price} onChange={(e) => setPrice(e.target.value)} />
          </div>
          <TextArea
            label="Message (optional)"
            placeholder="Here's my counter-proposal…"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <button className="btn-primary w-full" onClick={submitCounter} disabled={countering || !qty || !price}>
            {countering && <Spinner className="h-4 w-4" />} Send counter-offer
          </button>
        </div>
      )}
    </div>
  );
}
